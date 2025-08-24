#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, 'src');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...listFiles(full));
    else if (/\.(tsx|ts|jsx|js)$/.test(entry)) out.push(full);
  }
  return out;
}

function collectImportedSymbols(source, excludeModule) {
  const importRegex = /import\s+([^;]+?)\s+from\s+['"]([^'"]+)['"];?/g;
  const symbols = new Set();
  let m;
  while ((m = importRegex.exec(source))) {
    const clause = m[1];
    const mod = m[2];
    if (mod === excludeModule) continue;
    // default import
    const defaultMatch = clause.match(/^([A-Za-z_$][\w$]*)\s*(,|$)/);
    if (defaultMatch) symbols.add(defaultMatch[1]);
    // named imports
    const namedMatch = clause.match(/\{([^}]+)\}/);
    if (namedMatch) {
      namedMatch[1].split(',').forEach((seg) => {
        const name = seg.split(' as ')[0].trim();
        if (name) symbols.add(name);
      });
    }
    // namespace import
    const nsMatch = clause.match(/\*\s+as\s+([A-Za-z_$][\w$]*)/);
    if (nsMatch) symbols.add(nsMatch[1]);
  }
  return symbols;
}

function collectLocalComponentSymbols(source) {
  const symbols = new Set();
  const declRegexes = [
    /export\s+function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g,
    /function\s+([A-Z][A-Za-z0-9_]*)\s*\(/g,
    /export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(/g,
    /const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(/g,
    /class\s+([A-Z][A-Za-z0-9_]*)\s+/g
  ];
  for (const re of declRegexes) {
    let m;
    while ((m = re.exec(source))) symbols.add(m[1]);
  }
  return symbols;
}

function fixLucideImports(filePath) {
  let src = readFile(filePath);
  if (!src || !src.includes("from 'lucide-react'")) return false;

  const before = src;
  // Replace any lucide-react import with namespace import
  src = src.replace(/import\s+[^;]+\s+from\s+['"]lucide-react['"];?/g, "import * as Icons from 'lucide-react';");

  const importedElsewhere = collectImportedSymbols(src, 'lucide-react');
  const localComponents = collectLocalComponentSymbols(src);

  // Find JSX component tags
  const tagRegex = /<([A-Z][A-Za-z0-9_]*)\b/g;
  const toPrefix = new Set();
  let m;
  while ((m = tagRegex.exec(src))) {
    const name = m[1];
    if (importedElsewhere.has(name)) continue;
    if (localComponents.has(name)) continue;
    if (name === 'React' || name === 'Fragment') continue;
    // Common framework components to skip
    if (['Link', 'Route', 'Routes', 'Suspense', 'StrictMode', 'ThemeProvider', 'BrowserRouter', 'ErrorBoundary', 'Breadcrumbs'].includes(name)) continue;
    toPrefix.add(name);
  }

  // Prefix start and end tags
  for (const name of toPrefix) {
    const startTag = new RegExp(`<(\/?)${name}(\b|>)`, 'g');
    src = src.replace(startTag, (_, slash, boundary) => `<${slash}Icons.${name}${boundary}`);
  }

  if (src !== before) {
    writeFile(filePath, src);
    console.log(`Fixed lucide imports in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  return false;
}

function main() {
  const files = listFiles(ROOT);
  let count = 0;
  for (const f of files) {
    try {
      if (fixLucideImports(f)) count++;
    } catch (e) {
      console.warn(`Skipping ${f}: ${e.message}`);
    }
  }
  console.log(`\nCompleted. Updated ${count} files.`);
}

main();