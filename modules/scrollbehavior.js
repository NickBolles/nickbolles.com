let gsap = require("gsap");
let TweenLite = gsap.TimelineLite;
let Sine = gsap.Sine;
module.exports = function (to, from, savedPosition) {

    return new Promise(function (resolve, reject) {
        // setTimeout(() => {
        //     TweenLite.to(document.scrollingElement, 1, {
        //         scrollTop: document.querySelector(".nb.content.section").offsetTop,
        //         ease: Sine.easeInOut,
        //         onComplete: resolve()
        //     });
        // }, 50)
    })
}