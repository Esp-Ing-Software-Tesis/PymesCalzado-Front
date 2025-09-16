const fs = require('fs');
const path = require('path');
const svgstore = require('svgstore');

// Carpeta donde están tus íconos individuales
const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');
// Archivo de salida del sprite
const outFile = path.join(__dirname, 'src', 'assets', 'icons-sprite.svg');

// Crear el contenedor de sprites
const sprites = svgstore();

// Lista de íconos que deben usar currentColor
const iconsWithCurrentColor = [
  'headerAndFooter-user',
  'headerAndFooter-shoe',
  'headerAndFooter-pedido',
  'headerAndFooter-task',
  'headerAndFooter-cerrarSesion',
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.svg') {
      // id = ruta relativa sin .svg, slash → guion
      const rel = path.relative(iconsDir, full).replace(/\\/g, '/').replace(/\.svg$/, '');
      const id = rel.replace(/\//g, '-');

      let content = fs.readFileSync(full, 'utf8');
      // Limpiar cabeceras XML/DOCTYPE
      content = content.replace(/<\?xml[\s\S]*?\?>\s*/g, '')
                       .replace(/<!DOCTYPE[\s\S]*?>\s*/g, '');

      // Solo aplicar currentColor a los íconos de la lista
      if (iconsWithCurrentColor.includes(id)) {
        content = content.replace(/fill=".*?"/g, 'fill="currentColor"')
                         .replace(/stroke=".*?"/g, 'stroke="currentColor"');
      }

      sprites.add(id, content);
    }
  });
}

if (!fs.existsSync(iconsDir)) {
  console.error('❌ No se encontró la carpeta de íconos:', iconsDir);
  process.exit(1);
}

walk(iconsDir);

let sprite = sprites.toString({ inline: true });

if (!sprite.includes('xmlns=')) {
  sprite = sprite.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
}

fs.writeFileSync(outFile, sprite);
console.log('✅ Sprite generado en:', outFile);