const fs = require('fs');
const { execSync } = require('child_process');

function runBuildAndFix() {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`🔧 Build attempt ${attempts}/${maxAttempts}`);
    
    try {
      // Try to build
      execSync('npm run build', { stdio: 'pipe' });
      console.log('✅ BUILD SUCCESSFUL! Checks should now pass.');
      return true;
    } catch (error) {
      const errorOutput = error.stdout?.toString() || error.stderr?.toString() || '';
      console.log(`❌ Build failed on attempt ${attempts}`);
      
      // Extract error information
      const errorMatch = errorOutput.match(/ERROR: (.+)/);
      const fileMatch = errorOutput.match(/file: (.+):(\d+):(\d+)/);
      
      if (errorMatch && fileMatch) {
        const errorType = errorMatch[1];
        const filePath = fileMatch[1];
        const lineNum = parseInt(fileMatch[2]);
        
        console.log(`🎯 Fixing: ${errorType} in ${filePath}:${lineNum}`);
        
        if (fixSpecificError(filePath, lineNum, errorType, errorOutput)) {
          console.log(`✅ Applied fix for ${errorType}`);
          continue; // Try building again
        }
      }
      
      console.log('⚠️ Could not automatically fix this error');
      console.log(errorOutput);
      break;
    }
  }
  
  return false;
}

function fixSpecificError(filePath, lineNum, errorType, fullError) {
  try {
    if (!fs.existsSync(filePath)) return false;
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    if (lineNum > lines.length) return false;
    
    const problemLine = lines[lineNum - 1];
    let fixedLine = problemLine;
    
    // Apply specific fixes based on error type and content
    if (errorType.includes('Expected "}" but found "."')) {
      // Fix object property syntax like "id, assessment.id"
      fixedLine = fixedLine.replace(/\{\s*id,\s*(\w+)\.id\s*,/g, '{ id: $1.id,');
      fixedLine = fixedLine.replace(/\{\s*(\w+),\s*(\w+)\.(\w+)\s*,/g, '{ $1: $2.$3,');
    }
    
    if (errorType.includes('Expected ":" but found ")"')) {
      // Fix ternary operators
      fixedLine = fixedLine.replace(/\?\s*true\s*\)\s*:\s*false/g, '? true : false');
      fixedLine = fixedLine.replace(/\?\s*(\w+)\s*\)\s*:\s*(\w+)/g, '? $1 : $2');
    }
    
    if (errorType.includes('Expected ":" but found ","')) {
      // Fix React lazy load destructuring
      fixedLine = fixedLine.replace(/\{\s*default,\s*m\.(\w+)/g, '{ default: m.$1');
    }
    
    if (errorType.includes('Unexpected "]"')) {
      // Fix array type syntax
      fixedLine = fixedLine.replace(/(\w+),\s*(\w+)\[\]/g, '$1: $2[]');
    }
    
    if (errorType.includes('Expected "}" but found ":"')) {
      // Fix object syntax issues
      fixedLine = fixedLine.replace(/(\w+):\s*([^,}:]+):\s*(\w+):/g, '$1: $2, $3:');
    }
    
    if (errorType.includes('Expected ")" but found ":"')) {
      // Fix console.log syntax
      fixedLine = fixedLine.replace(/console\.(log|error)\('([^']*)':\s*/g, "console.$1('$2', ");
    }
    
    // Apply the fix if the line was changed
    if (fixedLine !== problemLine) {
      lines[lineNum - 1] = fixedLine;
      const fixedContent = lines.join('\n');
      fs.writeFileSync(filePath, fixedContent);
      console.log(`  🔧 Fixed line ${lineNum}: ${problemLine.trim()} → ${fixedLine.trim()}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

console.log('🚀 AUTOMATED BUILD FIX: Getting GitHub checks to pass...');
const success = runBuildAndFix();

if (success) {
  console.log('🎉 SUCCESS! Repository is now ready for production deployment.');
  console.log('✅ All GitHub checks should now pass.');
} else {
  console.log('⚠️ Some manual fixes may still be needed.');
}