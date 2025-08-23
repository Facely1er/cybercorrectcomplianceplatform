#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing remaining syntax errors...');

// Get all TypeScript and TSX files
function getAllTsFiles(dir, files = []) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      getAllTsFiles(fullPath, files);
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fix specific syntax error patterns
function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix type): pattern
    content = content.replace(/type\):/g, 'type:');
    
    // Fix extra): pattern
    content = content.replace(/extra\):/g, 'extra:');
    
    // Fix vital): pattern
    content = content.replace(/vital\):/g, 'vital:');
    
    // Fix other malformed object patterns
    content = content.replace(/(\w+)\):\s*/g, '$1: ');
    
    // Fix broken template literals and object syntax
    content = content.replace(/\$\{([^}]+)\s+\}/g, '${$1}');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed syntax errors in: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }
    
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
  }
  
  return false;
}

// Main execution
const srcDir = path.join(__dirname, 'src');
const tsFiles = getAllTsFiles(srcDir);

console.log(`📁 Found ${tsFiles.length} TypeScript files`);

let totalFixed = 0;

// Fix syntax errors
console.log('\n🧹 Fixing syntax errors...');
for (const file of tsFiles) {
  if (fixSyntaxErrors(file)) {
    totalFixed++;
  }
}

console.log(`\n🎉 Fixed syntax errors in ${totalFixed} files!`);

// Test build
console.log('\n📊 Testing build...');
try {
  const { execSync } = require('child_process');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build still has issues - may need manual review');
}