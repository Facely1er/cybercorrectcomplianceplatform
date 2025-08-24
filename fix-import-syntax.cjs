const fs = require('fs');
const path = require('path');

function fixImportSyntax(content) {
  // Fix import statements with colons instead of commas
  return content.replace(/import\s*\{([^}]+)\}\s*from/g, (match, imports) => {
    // Replace colons with commas, but be careful not to break type imports
    const fixedImports = imports
      .split(/[,:]\s*/)
      .filter(imp => imp.trim())
      .join(', ');
    return `import { ${fixedImports} } from`;
  });
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixImportSyntax(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      console.log(`Fixed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDir(filePath);
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      processFile(filePath);
    }
  }
}

// Process the src directory
console.log('Fixing import syntax errors...');
walkDir(path.join(__dirname, 'src'));
console.log('Done!');