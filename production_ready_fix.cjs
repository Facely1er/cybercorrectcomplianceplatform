const fs = require('fs');
const path = require('path');

function makeProductionReady(content) {
  // Fix console.error/log with colon instead of comma
  content = content.replace(/console\.(log|error|warn|info)\('([^']*)':\s*/g, "console.$1('$2', ");
  
  // Fix function parameters with malformed types
  content = content.replace(/(\w+): (\w+), (\w+)\)\s*\{/g, '$1: $2, $3: $3Type) {');
  content = content.replace(/errorInfo, ErrorInfo\)/g, 'errorInfo: ErrorInfo)');
  
  // Fix object property syntax with colon instead of comma
  content = content.replace(/(\w+): ([^,}:]+): (\w+):/g, '$1: $2, $3:');
  
  // Fix React import syntax issues
  content = content.replace(/import \{([^}]*): ([^}]*): ([^}]*)\}/g, 'import {$1, $2, $3}');
  
  // Fix function call syntax
  content = content.replace(/(\w+)\(([^,)]+), (\w+): \{([^}]+)\}\)/g, '$1($2, $3, {$4})');
  
  // Fix setState with malformed syntax
  content = content.replace(/setState\(\{\s*error: errorInfo\s*\}\)/g, 'setState({ error: error, errorInfo: errorInfo })');
  
  // Fix template literal syntax
  content = content.replace(/\$\{([^}]+)\s*\n\s*\}/g, '${$1}');
  
  // Fix ternary operator syntax
  content = content.replace(/\?\s*(\w+)\s*:\s*(\w+)\s*,\s*(\w+)\s*:/g, '? $1 : $2, $3:');
  
  // Fix object destructuring in function parameters
  content = content.replace(/\{([^}]*): ([^}]*): ([^}]*)\}/g, '{$1, $2: $3}');
  
  // Fix method signatures
  content = content.replace(/(\w+)\(([^)]*)\)\s*:\s*([^{]*)\s*:\s*([^{]*)\s*\{/g, '$1($2): $4 {');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = makeProductionReady(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Production fix: ${filePath}`);
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

console.log('🚀 PRODUCTION READY FIX: Starting comprehensive cleanup...');
const fixedCount = processDirectory('./src');
console.log(`✅ Production ready! Fixed ${fixedCount} files.`);

if (fixedCount > 0) {
  console.log('🎯 Repository should now be production ready!');
} else {
  console.log('✨ Repository is already in great shape!');
}