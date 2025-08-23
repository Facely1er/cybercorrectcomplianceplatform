#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to fix hasOwnProperty
const hasOwnPropertyFixes = [
  {
    file: '/workspace/src/shared/utils/performance.ts',
    old: 'if (localStorage.hasOwnProperty(key)) {',
    new: 'if (Object.prototype.hasOwnProperty.call(localStorage, key)) {'
  },
  {
    file: '/workspace/src/services/dataService.ts', 
    old: 'if (localStorage.hasOwnProperty(key)) {',
    new: 'if (Object.prototype.hasOwnProperty.call(localStorage, key)) {'
  },
  {
    file: '/workspace/src/services/healthCheck.ts',
    old: 'if (localStorage.hasOwnProperty(key)) {',
    new: 'if (Object.prototype.hasOwnProperty.call(localStorage, key)) {'
  }
];

// Files to fix regex escaping
const regexFixes = [
  {
    file: '/workspace/src/lib/enhancedValidation.ts',
    old: '/^\\+?[\\d\\s\\-\\(\\)]+$/',
    new: '/^\\+?[\\d\\s\\-()]+$/'
  },
  {
    file: '/workspace/src/lib/validation.ts',
    old: '/^\\+?[\\d\\s\\-\\(\\)]+$/',
    new: '/^\\+?[\\d\\s\\-()]+$/'
  }
];

// Apply hasOwnProperty fixes
console.log('Fixing hasOwnProperty issues...');
hasOwnPropertyFixes.forEach(fix => {
  try {
    if (fs.existsSync(fix.file)) {
      let content = fs.readFileSync(fix.file, 'utf8');
      if (content.includes(fix.old)) {
        content = content.replace(fix.old, fix.new);
        fs.writeFileSync(fix.file, content);
        console.log(`Fixed hasOwnProperty in ${fix.file}`);
      }
    }
  } catch (error) {
    console.error(`Error fixing ${fix.file}:`, error.message);
  }
});

// Apply regex fixes
console.log('Fixing regex escaping issues...');
regexFixes.forEach(fix => {
  try {
    if (fs.existsSync(fix.file)) {
      let content = fs.readFileSync(fix.file, 'utf8');
      if (content.includes(fix.old)) {
        content = content.replace(fix.old, fix.new);
        fs.writeFileSync(fix.file, content);
        console.log(`Fixed regex escaping in ${fix.file}`);
      }
    }
  } catch (error) {
    console.error(`Error fixing ${fix.file}:`, error.message);
  }
});

console.log('Bug fixes completed!');