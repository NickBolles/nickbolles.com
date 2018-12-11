const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminSVG = require('imagemin-svgo');
const imageminJPG = require('imagemin-mozjpeg');


imagemin([path.join(__dirname, 'images/unoptimized/*.{jpg,png}')], path.join(__dirname,  '../', 'static/'), {
	use: [
        imageminWebp({quality: 60, method: 6})
	]
}).then(() => {
	console.log('Images optimized');
});
imagemin([path.join(__dirname, 'images/unoptimized/*.{jpg,png}')], path.join(__dirname,  '../', 'static/'), {
	use: [
		imageminJPG({quality: 60}),
	]
}).then(() => {
	console.log('Images optimized');
});

imagemin([path.join(__dirname, 'images/unoptimized/skill-icons/*.svg')], path.join(__dirname, '../', 'static/skill-icons/'), {
	use: [
		imageminSVG()
	]
}).then(() => {
	console.log('Skill Icons optimized');
});