const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');
let fixed = content;

// Fix all interface syntax errors
fixed = fixed.replace(/icon, React\.ComponentType<any>;/g, 'icon: React.ComponentType<any>;');
fixed = fixed.replace(/items: Array<\{ label, string;/g, 'items: Array<{ label: string;');

// Fix all ternary operators
fixed = fixed.replace(/\? ([^:,]+) , ([^}]+)/g, '? $1 : $2');

// Fix object property syntax
fixed = fixed.replace(/\{ ([^:,}]+), ([^.:,}]+)\.([^,}]+) ,/g, '{ $1: $2.$3,');

// Fix function parameter syntax
fixed = fixed.replace(/\(([^,)]+), ([^,)]+), ([^,)]+), ([^)]+)\)/g, '($1: $2, $3: $4)');

// Fix remaining React lazy loads
fixed = fixed.replace(/\{ default, m\.(\w+) \}/g, '{ default: m.$1 }');

// Fix console statements
fixed = fixed.replace(/console\.(log|error)\('([^']+)' :/g, "console.$1('$2',");

// Write the fix
fs.writeFileSync('src/App.tsx', fixed);
console.log('✅ Applied emergency fixes to App.tsx');