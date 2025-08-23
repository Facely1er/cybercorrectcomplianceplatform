const fs = require('fs');
const path = require('path');

// Patterns to fix build errors
const patterns = [
  // Fix getInstance method signatures like "static getInstance(, ClassName {"
  {
    pattern: /static getInstance\(\s*,\s*(\w+)\s*\{/g,
    replacement: 'static getInstance(): $1 {',
    description: 'Fix getInstance method signature'
  },
  
  // Fix function signatures with malformed return types
  {
    pattern: /(\w+)\([^)]*\):\s*(\w+[^=]*)\s*:/g,
    replacement: '$1($2):',
    description: 'Fix function signature return types'
  },
  
  // Fix object literal with undefined keys
  {
    pattern: /\{\s*([^,}]+),\s*undefined,\s*([^,}]+),\s*undefined\s*\}/g,
    replacement: '{ $1: null, $2: null }',
    description: 'Fix object literal with undefined keys'
  },
  
  // Fix setState calls with malformed syntax
  {
    pattern: /setState\(\s*\{\s*([^,]+),\s*(\w+),\s*undefined,\s*(\w+),\s*undefined\s*\}\s*\)/g,
    replacement: 'setState({ $1, $2: null, $3: null })',
    description: 'Fix setState with undefined values'
  },
  
  // Fix duplicate object properties
  {
    pattern: /(\w+):\s*([^,}]+),\s*\1:\s*([^,}]+)/g,
    replacement: '$1: $2',
    description: 'Fix duplicate object properties'
  },
  
  // Fix malformed function parameters with colons
  {
    pattern: /(\w+\([^)]*)\):\s*([^)]+)\s*\):\s*([^{]+)\s*\{/g,
    replacement: '$1): $3 {',
    description: 'Fix malformed function parameters'
  }
];

function fixFile(filePath) {
  if (!fs.existsSync(filePath) || !filePath.match(/\.(ts|tsx|js|jsx)$/)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  patterns.forEach(({ pattern, replacement, description }) => {
    const before = content;
    content = content.replace(pattern, replacement);
    if (content !== before) {
      console.log(`${filePath}: ${description}`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
}

function findFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findFiles(fullPath, files);
    } else if (fullPath.match(/\.(ts|tsx|js|jsx)$/)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log('🔧 FIXING BUILD ERRORS: Starting systematic fix...');

const files = findFiles('./src');
let totalFixed = 0;

files.forEach(file => {
  if (fixFile(file)) {
    totalFixed++;
  }
});

console.log(`\n✅ BUILD ERROR FIX COMPLETE: Fixed ${totalFixed} files`);
console.log('🚀 Ready for build test!');