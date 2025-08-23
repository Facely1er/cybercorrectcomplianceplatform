const fs = require('fs');
const path = require('path');

// Comprehensive cleanup patterns
const patterns = [
  // Function parameter and signature fixes
  {
    pattern: /(\w+\([^)]*): (\w+[^=]*) = ([^)]*)\)/g,
    replacement: '$1, $2 = $3)',
    description: 'Fix malformed function parameters'
  },
  {
    pattern: /(\w+): (\w+): (\w+) \{/g,
    replacement: '$1: $2) {',
    description: 'Fix function signatures with double colons'
  },
  {
    pattern: /errorId\): /g,
    replacement: 'errorId: ',
    description: 'Fix errorId property syntax'
  },
  {
    pattern: /organizationName\): /g,
    replacement: 'organizationName: ',
    description: 'Fix organizationName property syntax'
  },
  
  // Object property fixes
  {
    pattern: /(\w+): (\w+)\): /g,
    replacement: '$1: $2, ',
    description: 'Fix object property syntax with wrong closing paren'
  },
  {
    pattern: /\): ([^,}\s]+)/g,
    replacement: ': $1',
    description: 'Fix property syntax with closing paren instead of colon'
  },
  
  // Import fixes
  {
    pattern: /import \{([^}]*),, ([^}]*)\}/g,
    replacement: 'import {$1, $2}',
    description: 'Fix double comma imports'
  },
  {
    pattern: /(\w+),, (\w+)/g,
    replacement: '$1, $2',
    description: 'Fix double commas in general'
  },
  
  // Console.error and similar fixes
  {
    pattern: /console\.error\('([^']*)',\) \{/g,
    replacement: "console.error('$1', {",
    description: 'Fix console.error syntax'
  },
  
  // Interface and type fixes
  {
    pattern: /interface (\w+) \{(\s*})/g,
    replacement: 'interface $1 {$2',
    description: 'Fix empty interfaces'
  },
  
  // Method signature fixes
  {
    pattern: /(\w+)\(([^)]*)\):\s*(\w+)\s*=/g,
    replacement: '$1($2): $3 =',
    description: 'Fix method return type syntax'
  },
  
  // Ternary operator fixes
  {
    pattern: /\{(\w+) \? '([^']+)' \): '([^']+)'\}/g,
    replacement: "{$1 ? '$2' : '$3'}",
    description: 'Fix ternary operator syntax'
  },
  
  // Template literal fixes
  {
    pattern: /\$\{([^}]+)\): /g,
    replacement: '${$1}: ',
    description: 'Fix template literal syntax'
  },
  
  // Arrow function fixes  
  {
    pattern: /=> \{(\s*[^}]+\s*)\): /g,
    replacement: '=> {$1: ',
    description: 'Fix arrow function syntax'
  },
  
  // Generic comma cleanup
  {
    pattern: /,(\s*),/g,
    replacement: ',$1',
    description: 'Remove duplicate commas'
  },
  
  // Final syntax cleanup
  {
    pattern: /\)\s*:\s*\{/g,
    replacement: ') {',
    description: 'Fix function signature ending'
  }
];

function fixFile(filePath) {
  if (!fs.existsSync(filePath) || !filePath.match(/\.(ts|tsx|js|jsx)$/)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Apply all patterns
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

console.log('🔧 COMPREHENSIVE CLEANUP: Starting systematic fix...');

const files = findFiles('./src');
let totalFixed = 0;

files.forEach(file => {
  if (fixFile(file)) {
    totalFixed++;
  }
});

console.log(`\n✅ CLEANUP COMPLETE: Fixed ${totalFixed} files`);
console.log('🚀 Ready for build test!');