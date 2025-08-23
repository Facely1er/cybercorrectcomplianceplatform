const fs = require('fs');
const path = require('path');

function fixAllSyntaxErrors(content) {
  // Fix getInstance method signatures
  content = content.replace(/static getInstance\(\s*,\s*(\w+)\s*\{/g, 'static getInstance(): $1 {');
  
  // Fix function parameters with missing types
  content = content.replace(/(\w+)\s*,\s*(\w+),\s*(\w+)\s*:/g, '$1: $2, $3:');
  
  // Fix function signatures with malformed return types
  content = content.replace(/(\w+)\([^)]*\)\s*,\s*Promise<([^>]+)>\s*\{/g, '$1): Promise<$2> {');
  
  // Fix function signatures with missing return type
  content = content.replace(/(\w+)\(\s*:\s*(void|string|number|boolean)\s*\{/g, '$1(): $2 {');
  
  // Fix object properties with malformed syntax
  content = content.replace(/(\w+),\s*(\w+),\s*(\w+)\s*:/g, '$1: $2, $3:');
  
  // Fix template literals with malformed syntax
  content = content.replace(/\$\{([^}]+)\s*\n\s*\}/g, '${$1}');
  
  // Fix object literal syntax with duplicate properties
  content = content.replace(/(\w+):\s*([^,}]+),\s*\1:\s*([^,}]+)/g, '$1: $2');
  
  // Fix function calls with malformed object syntax
  content = content.replace(/\{\s*([^,}]+),\s*([^,}]+),\s*([^,}]+),\s*([^,}]+)\s*\}/g, '{ $1: $2, $3: $4 }');
  
  // Fix setState with undefined values
  content = content.replace(/setState\(\s*\{\s*([^,}]+),\s*(\w+),\s*undefined,\s*(\w+),\s*undefined\s*\}\s*\)/g, 'setState({ $1, $2: null, $3: null })');
  
  // Fix object destructuring in React lazy loads
  content = content.replace(/\{\s*default\s*,\s*m\.(\w+)\s*\}/g, '{ default: m.$1 }');
  
  // Fix ternary operators with comma instead of colon
  content = content.replace(/\?\s*(\w+)\s*,\s*(\w+)\s*\)/g, '? $1 : $2)');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixAllSyntaxErrors(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  let fixedCount = 0;
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      fixedCount += processDirectory(fullPath);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      if (processFile(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

console.log('🔧 COMPREHENSIVE SYNTAX FIX: Starting...');
const fixedCount = processDirectory('./src');
console.log(`✅ Complete! Fixed ${fixedCount} files with syntax errors.`);

if (fixedCount > 0) {
  console.log('🎯 Build should now pass!');
} else {
  console.log('ℹ️  No additional syntax errors found.');
}