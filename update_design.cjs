const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles', 'globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace hex greens and blues
cssContent = cssContent.replace(/#16a34a/g, '#ea580c');
cssContent = cssContent.replace(/#22c55e/g, '#f97316');
cssContent = cssContent.replace(/#15803d/g, '#c2410c');
cssContent = cssContent.replace(/#1a56db/g, '#2563eb');

// Replace rgb values
cssContent = cssContent.replace(/rgba\(22,163,74/g, 'rgba(234,88,12');
cssContent = cssContent.replace(/rgba\(26,86,219/g, 'rgba(37,99,235');

// Update border radius for a new pill look
cssContent = cssContent.replace(/--radius:\s*16px;/g, '--radius: 24px;');

// New Body Background to give a "different" look
cssContent = cssContent.replace(/background: #f8fafc;/g, 'background: #f1f5f9; background-image: radial-gradient(#e2e8f0 1px, transparent 1px); background-size: 20px 20px;');

fs.writeFileSync(cssPath, cssContent);
console.log('Updated globals.css');

// NJK files
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.njk')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const njkFiles = walkSync(path.join(__dirname, 'src'));
njkFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/rgba\(26,86,219/g, 'rgba(37,99,235');
  content = content.replace(/rgba\(22,163,74/g, 'rgba(234,88,12');
  content = content.replace(/#22c55e/g, '#f97316');
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated NJK file:', file);
  }
});
