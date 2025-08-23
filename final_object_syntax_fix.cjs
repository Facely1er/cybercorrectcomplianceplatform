const fs = require('fs');
const path = require('path');

function fixObjectSyntax(content) {
  // Fix object properties where colons are used instead of commas
  // Pattern: property: value: property: value
  content = content.replace(/(\w+):\s*([^,}:]+):\s*(\w+):\s*([^,}:]+):/g, '$1: $2, $3: $4,');
  
  // Fix object properties with trailing colons
  content = content.replace(/(\w+):\s*([^,}:]+):\s*(\w+):/g, '$1: $2, $3:');
  
  // Fix specific patterns like "icon: Target: description:"
  content = content.replace(/icon:\s*(\w+):\s*description:/g, 'icon: $1, description:');
  
  // Fix "href: '/path': icon:" patterns
  content = content.replace(/href:\s*'([^']+)':\s*icon:/g, "href: '$1', icon:");
  
  // Fix "label: 'text': href:" patterns  
  content = content.replace(/label:\s*'([^']+)':\s*href:/g, "label: '$1', href:");
  
  // Fix general pattern "property: value: property:"
  content = content.replace(/(\w+):\s*([^,}:]+):\s*(\w+):/g, '$1: $2, $3:');
  
  // Fix React prop destructuring with colons instead of commas
  content = content.replace(/\{\s*(\w+):\s*(\w+):\s*(\w+),/g, '{ $1, $2: $3,');
  
  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixObjectSyntax(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed object syntax: ${filePath}`);
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

console.log('🔧 FINAL OBJECT SYNTAX FIX: Starting...');
const fixedCount = processDirectory('./src');
console.log(`✅ Complete! Fixed ${fixedCount} files with object syntax errors.`);

if (fixedCount > 0) {
  console.log('🎯 Build should now pass!');
} else {
  console.log('ℹ️  No additional object syntax errors found.');
}