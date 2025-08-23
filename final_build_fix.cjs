const fs = require('fs');
const path = require('path');

function fixAllSyntaxIssues(content) {
  // Fix all ternary operators with comma instead of colon
  content = content.replace(/\?\s*([^:,)]+)\s*,\s*([^}:,)]+)/g, '? $1 : $2');
  
  // Fix specific patterns found in errors
  content = content.replace(/'dark'\s*,\s*'light'/g, "'dark' : 'light'");
  content = content.replace(/'bg-primary-teal[^']*'\s*,\s*'text-gray[^']*'/g, (match) => {
    return match.replace(/'\s*,\s*'/, "' : '");
  });
  
  // Fix function parameters
  content = content.replace(/(\w+),\s*(\w+)\s*\)\s*=>/g, '$1: $2) =>');
  content = content.replace(/setTheme\s*=\s*\(newTheme,\s*Theme\)/g, 'setTheme = (newTheme: Theme)');
  
  // Fix className template literals
  content = content.replace(/className=\{\s*`([^`]*),\s*([^`]*)`\s*\}/g, 'className={`$1 : $2`}');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,}:]+)\s*,\s*([^,}:]+)\s*:/g, '$1: $2, $3:');
  
  // Fix React lazy load syntax
  content = content.replace(/\{\s*default,\s*m\.(\w+)\s*\}/g, '{ default: m.$1 }');
  
  // Fix console statements
  content = content.replace(/console\.(log|error|warn)\('([^']+)'\s*:\s*/g, "console.$1('$2', ");
  
  // Fix CSS class syntax issues
  content = content.replace(/dark,\s*bg-/g, 'dark:bg-');
  content = content.replace(/dark,\s*hover:/g, 'dark:hover:');
  content = content.replace(/focus,\s*ring-/g, 'focus:ring-');
  content = content.replace(/hover,\s*text-/g, 'hover:text-');
  
  return content;
}

function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return false;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixAllSyntaxIssues(content);
    
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

console.log('🚀 FINAL BUILD FIX: Resolving all syntax errors...');
const fixedCount = processDirectory('./src');
console.log(`✅ Final fix complete! Fixed ${fixedCount} files.`);

// Test the build
const { execSync } = require('child_process');
try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('🎉 SUCCESS! Build completed successfully!');
  console.log('✅ Landing page and all checks should now work!');
} catch (error) {
  console.log('⚠️ Build still has issues. Committing progress...');
}