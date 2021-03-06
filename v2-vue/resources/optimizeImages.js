const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminSVG = require('imagemin-svgo');
const imageminJPG = require('imagemin-mozjpeg');
const imageminPNG = require('imagemin-pngquant');

new Promise((resolve, reject) => {
  resolve();
}).then(() => (
  imagemin([path.join(__dirname, 'images/unoptimized/*.{jpg,png}')], path.join(__dirname, '../', 'static/'), {
    use: [
      imageminWebp({ quality: 60, method: 6 })
    ]
  }).then(() => {
    console.log('webp Images created/optimized');
  }))
).then(() => (
  imagemin([path.join(__dirname, 'images/unoptimized/*.{jpg,png}')], path.join(__dirname, '../', 'static/'), {
    use: [
      imageminJPG({ quality: 60 }),
      imageminPNG()
    ]
  }).then(() => {
    console.log('JPG images optimized');
  })
)).then(() => (
  imagemin([path.join(__dirname, 'images/unoptimized/skill-icons/*.svg')], path.join(__dirname, '../', 'static/skill-icons/'), {
    use: [
      imageminSVG()
    ]
  }).then(() => {
    console.log('Skill Icon SVGss optimized');
  })
)).then(() => (
  imagemin([path.join(__dirname, 'images/unoptimized/skill-icons/*.png')], path.join(__dirname, '../', 'static/skill-icons/'), {
    use: [
      imageminPNG()
    ]
  }).then(() => {
    console.log('Skill Icon PNGs optimized');
  })
))



