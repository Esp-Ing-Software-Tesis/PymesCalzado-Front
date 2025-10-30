const fs = require('node:fs');
const path = require('node:path');
const svgstore = require('svgstore');

// Carpeta donde están los íconos individuales
const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');
// Archivo de salida del sprite
const outFile = path.join(__dirname, 'src', 'assets', 'icons-sprite.svg');

// Crear el contenedor de sprites
const sprites = svgstore();

const iconsWithCurrentColor = new Set([
  'headerAndFooter-user',
  'headerAndFooter-shoe',
  'headerAndFooter-pedido',
  'headerAndFooter-task',
  'headerAndFooter-cerrarSesion',
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.svg') {
      // id = ruta relativa sin .svg, slash → guion
      const rel = path
        .relative(iconsDir, full)
        .replace(/\\/g, '/')
        .replace(/\.svg$/, '');
      const id = rel.replace(/\//g, '-');

      let content = fs.readFileSync(full, 'utf8');
      // Limpiar cabeceras XML/DOCTYPE
      content = content.replace(/<\?xml[\s\S]*?\?>\s*/g, '').replace(/<!DOCTYPE[\s\S]*?>\s*/g, '');

      // Aplicar currentColor solo a los íconos definidos en el Set
      if (iconsWithCurrentColor.has(id)) {
        content = content.replace(/fill=".*?"/g, 'fill="currentColor"').replace(/stroke=".*?"/g, 'stroke="currentColor"');
      }

      sprites.add(id, content);
    }
  }
}

if (!fs.existsSync(iconsDir)) {
  console.error(`No se encontró la carpeta de íconos: ${iconsDir}`);
  process.exit(1);
}

walk(iconsDir);

let sprite = sprites.toString({ inline: true });

// Asegurar que tenga xmlns
if (!sprite.includes('xmlns=')) {
  sprite = sprite.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
}

// Guardar el sprite resultante
fs.writeFileSync(outFile, sprite);
console.log(`Sprite generado en: ${outFile}`);
