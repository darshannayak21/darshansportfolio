const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('d:/DARSHANSPORTFOLIO/app/src');

files.forEach(file => {
  if (file.includes('ThemeProvider')) return;
  if (file.includes('Hero.tsx') || file.includes('Skills.tsx')) return;

  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  if (!content.includes('useTheme')) return;

  // 1. Remove useTheme import
  content = content.replace(/import\s+\{\s*useTheme\s*\}\s+from\s+['"]@\/components\/ThemeProvider['"];?\s*/g, '');

  // 2. Remove hooks
  content = content.replace(/\s*const\s+\{\s*theme\s*\}\s*=\s*useTheme\(\);\s*/g, '');
  content = content.replace(/\s*const\s+dark\s*=\s*theme\s*===\s*['"]dark['"];?\s*/g, '');

  // 3. Replace ${dark ? 'A' : 'B'} -> B
  content = content.replace(/\$\{dark\s*\?\s*['"]([^'"]*)['"]\s*:\s*['"]([^'"]*)['"]\}/g, '$2');

  // 4. Replace className={dark ? 'A' : 'B'} -> className="B"
  content = content.replace(/className=\{dark\s*\?\s*['"]([^'"]*)['"]\s*:\s*['"]([^'"]*)['"]\}/g, 'className="$2"');

  // 5. Replace other occurrences of dark ? 'A' : 'B'
  content = content.replace(/dark\s*\?\s*['"]([^'"]*)['"]\s*:\s*['"]([^'"]*)['"]/g, "'$2'");

  // Clean up empty template literals if any like className={`bg-white`} -> className="bg-white"
  content = content.replace(/className=\{`([^`\$]*)`\}/g, 'className="$1"');

  if (content !== original) {
    console.log(`Updated ${file}`);
    fs.writeFileSync(file, content, 'utf-8');
  }
});
