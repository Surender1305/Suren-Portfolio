const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find ease: [a, b, c, d] and replace with ease: [a, b, c, d] as const
  // but avoid replacing if it already has "as const"
  const updated = content.replace(/ease:\s*\[([\d\.\s,-]+)\](?![\s]*as\s+const)/g, 'ease: [$1] as const');
  
  if (content !== updated) {
    fs.writeFileSync(filePath, updated);
    console.log(`Updated ${file}`);
  }
}
