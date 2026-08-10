const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles', 'globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Replace hex oranges with reds
cssContent = cssContent.replace(/#ea580c/g, '#dc2626');
cssContent = cssContent.replace(/#f97316/g, '#ef4444');
cssContent = cssContent.replace(/#c2410c/g, '#991b1b');

// Replace rgb oranges with red rgb
cssContent = cssContent.replace(/rgba\(234,88,12/g, 'rgba(220,38,38');

// The glow orange variable needs updating too
cssContent = cssContent.replace(/--glow-orange:\s*0 0 32px rgba\(234,88,12,0\.30\);/g, '--glow-orange:  0 0 32px rgba(220,38,38,0.30);');

fs.writeFileSync(cssPath, cssContent);
console.log('Updated globals.css to Red');

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
  content = content.replace(/#ea580c/g, '#dc2626');
  content = content.replace(/#f97316/g, '#ef4444');
  content = content.replace(/rgba\(234,88,12/g, 'rgba(220,38,38');
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated NJK file to Red:', file);
  }
});
