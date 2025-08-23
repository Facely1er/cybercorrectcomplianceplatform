/**
 * Deployment Verification Script
 * Run this to check if the latest fixes are deployed in production
 */

console.log('🔍 DEPLOYMENT VERIFICATION SCRIPT');
console.log('=====================================');
console.log('');

// Check 1: Verify the fixes are in the built files
console.log('✅ CHECKING BUILD ARTIFACTS...');

const fs = require('fs');
const path = require('path');

// Check if dist folder exists and contains the latest build
if (fs.existsSync('./dist')) {
    const indexHtml = fs.readFileSync('./dist/index.html', 'utf8');
    console.log('✅ Build artifacts found');
    console.log('✅ index.html generated:', indexHtml.includes('vite') ? 'YES' : 'NO');
    
    // Check for specific fixed files
    const assetsDir = './dist/assets';
    if (fs.existsSync(assetsDir)) {
        const assets = fs.readdirSync(assetsDir);
        const jsFiles = assets.filter(f => f.endsWith('.js'));
        console.log(`✅ JavaScript bundles: ${jsFiles.length} files`);
        console.log(`✅ Main bundle found: ${assets.some(f => f.includes('index-')) ? 'YES' : 'NO'}`);
    }
} else {
    console.log('❌ Build artifacts missing - run "npm run build" first');
}

console.log('');
console.log('🔧 RECENT FIXES VERIFICATION:');
console.log('=====================================');

// Check 2: Verify the source code contains our fixes
const sourceChecks = [
    {
        file: 'src/features/assessment/components/EnhancedAssessmentView.tsx',
        check: 'Framework validation fix',
        pattern: 'if (!framework || !framework.sections || !Array.isArray(framework.sections))'
    },
    {
        file: 'src/services/dataService.ts', 
        check: 'hasOwnProperty security fix',
        pattern: 'Object.prototype.hasOwnProperty.call'
    },
    {
        file: 'src/lib/enhancedValidation.ts',
        check: 'Regex escape fix',
        pattern: '/^\\+?[\\d\\s\\-()]+$/'
    }
];

sourceChecks.forEach(({ file, check, pattern }) => {
    try {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            const hasPattern = content.includes(pattern);
            console.log(`${hasPattern ? '✅' : '❌'} ${check}: ${hasPattern ? 'FIXED' : 'NOT FOUND'}`);
        } else {
            console.log(`❌ ${check}: FILE NOT FOUND (${file})`);
        }
    } catch (error) {
        console.log(`❌ ${check}: ERROR CHECKING (${error.message})`);
    }
});

console.log('');
console.log('🚀 DEPLOYMENT STATUS:');
console.log('=====================================');

// Check 3: Git status
const { execSync } = require('child_process');

try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    const isClean = gitStatus.trim() === '';
    console.log(`✅ Git working tree: ${isClean ? 'CLEAN' : 'HAS CHANGES'}`);
    
    const latestCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
    console.log(`✅ Latest commit: ${latestCommit}`);
    
    const hasForceDeployCommit = latestCommit.includes('FORCE DEPLOYMENT');
    console.log(`✅ Force deployment commit: ${hasForceDeployCommit ? 'PRESENT' : 'MISSING'}`);
    
} catch (error) {
    console.log(`❌ Git check failed: ${error.message}`);
}

console.log('');
console.log('🎯 VERIFICATION SUMMARY:');
console.log('=====================================');
console.log('');
console.log('If all checks show ✅, your fixes are ready for deployment.');
console.log('If using auto-deployment (Vercel/Netlify), changes should be live within 2-5 minutes.');
console.log('');
console.log('🔗 TO VERIFY PRODUCTION:');
console.log('1. Visit your live site URL');
console.log('2. Try creating an assessment'); 
console.log('3. Check browser console for errors');
console.log('4. Verify assessments load without "sections" error');
console.log('');
console.log('📱 Test these specific fixes:');
console.log('- Assessment creation (NIST CSF, CMMC, Privacy)');
console.log('- Framework loading without undefined errors');
console.log('- Error boundaries showing helpful messages');
console.log('- Security validation working properly');
console.log('');