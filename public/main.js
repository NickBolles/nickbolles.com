(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Nicholas on 9/15/2015.
 */

//Require Libs
//var libs = require('./libs/');
//var content = require('./content.js');
$(document).ready(scrollMagicSetup);
function scrollMagicSetup(){
  var scroller = new ScrollMagic.Controller({vertical:false});
  $('.nb-section').each(function () {
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      duration:       0,
      triggerHook:    "onCenter"
    }).addTo(scroller);

    // use a function to automatically adjust the duration to the window height.
    var durationValueCache;
    function getDuration () {
      return durationValueCache;
    }
    function updateDuration (e) {
      durationValueCache = window.innerWidth;
    }
    $(window).on("resize", updateDuration); // update the duration when the window size changes
    $(window).triggerHandler("resize"); // set to initial value
    scene.duration(getDuration); // supply duration method


    //update the .nb-active-section class to this target
    scene.on("start", function(event){
      if (!$('.nb-animating-to').length){
        $('.nb-active-section').removeClass('nb-active-section');
        $(event.target.triggerElement()).addClass('nb-active-section nb-visited-section');
      }
    });
  });
}


var currentPane="#Home";
var duration;
var easingEffect='easeOutBack';
//Hide the navpane right away
$(document).ready(animateNavPaneIn);
function animateNavPaneIn(){
  $('#navpane')
      .css({'display': 'none', 'top': '-60px'})
      //Animate and fade in the Navpane
      .delay(1500).animate({top:'0px'},3000).dequeue().fadeIn(1250);
}

$(document).ready(nbAnimate);
//Should probably move this over to a GSAP timeline, but it works well for now
function nbAnimate(){
  if (!window.nbIsMobile){
    $('[data-nb-animate-from]').each(function(idx){
      var thisEl  = $(this);
      var options = thisEl.data('nb-animate-options');
      options = $.extend({duration: 400, delay: 0, easing: 'swing'}, options);
      var fromCss = thisEl.data('nb-animate-from') || {};
      var toCss   = thisEl.data('nb-animate-to') || {'opacity': 1, 'display': 'auto'};
      var defaults = {
        position:'relative',
        transition: 'transform ' + options.duration + 'ms',
        '-webkit-transition': 'transform ' + options.duration + 'ms',
        '-moz-transition': 'transform ' + options.duration + 'ms',
        '-ms-transition': 'transform ' + options.duration + 'ms',
        '-o-transition': 'transform ' + options.duration + 'ms'
      };
      if (fromCss.transform){
        var transform = fromCss.transform;
        var vendTransform = {
          transform: transform,
          '-webkit-transform': transform,
          '-moz-transform': transform,
          '-ms-transform': transform,
          '-o-transform': transform
        };
        $.extend(fromCss, vendTransform);
      }
      //Setting the default for the transition will mean that the initial fromCss will abide by that timing too
      //This will not be desired if opacity isn't used. This should
      //fromCss = $.extend(defaults, fromCss);
      options.always = animationComplete;
      thisEl
          .css(fromCss)
          .delay(options.delay)
          .css(defaults)
          .animate(toCss, options);


      function animationComplete(){
        $(this).css({
          transform: 'none',
          '-webkit-transform': 'none',
          '-moz-transform': 'none',
          '-ms-transform': 'none',
          '-o-transform': 'none'
        });
      }
    })
  }
}

$(document).ready(function(){
  //Set a function for after scroll end
  var debouncedScroll;
  $(window).scroll(function(){
    try{
      clearTimeout(debouncedScroll);
    }catch(err){}
    debouncedScroll=setTimeout(getCurrentPane,500);
    //**********Snap to pane, Not Needed, Replaced with Overflow:hidden;
    //yfTime=setTimeout("$(this).snapToPane()",500);
  });



  //Bind all links to do a smooth scroll to the 'href'
  $('a').bind('click',function(event){
    var href=$(this).attr('href');
    $('html, body').stop(true,false);
    checkEasing(href);
    $(href).addClass('nb-animating-to');
    $.scrollTo(href,duration, {
          easing:  easingEffect,
          onAfter: function (target, settings) {
            target.removeClass('nb-animating-to').addClass('nb-active-section nb-visited-section');
          }
        }
    );
    event.preventDefault();
  });
});

function getCurrentPane(){
  //set variables for calculating
  var winScroll = $(window).scrollLeft();
  var winWidth = window.innerWidth;
  var paneNum = Math.round(winScroll/winWidth);
  //Get ID of corresponding paneNum and set 'pane' to it
  var pane= "#" + $('.nb-section')[paneNum].id;
  //Update the OverFlow to allow scrolling
  updateOverflow(paneNum);
  return pane;
}
var OVERFLOW_PANES = [1,2];
function updateOverflow(paneNum){
  //If the current section is the second section (#MyProgram) Set Overflow to Scroll
  //Todo: make this dynamic and not hard coded
  if (OVERFLOW_PANES.indexOf(paneNum) !== -1){
    if ($("body").css('overflow-y') !== 'scroll'){
      $("body").css("overflow-y", "scroll").dequeue().scrollTo('-=25px',0, {axis:'x'});
    }
  }else{
    //Default to Hidden Overflow
    if ($("body").css('overflow-y') === 'scroll'){
      $("body").css("overflow-y", "hidden").dequeue().scrollTo('+=30px',0, {axis:'x'});;
    }
  }
};

//This function allows for different easing and duration to each ID
function checkEasing(href){
  //Default to EaseOutBack, unless the target is '#Home' or '#Contact'
  //using a "back easing function causes it to glitch out because it is going beyond the body limits
  easingEffect='easeOutBack';
  duration=1000;
  if (href==='#Home' || href==='#Contact'){
    easingEffect='easeOutQuart';
    duration=1500;
  }
};

$(document).ready(mobileAlertSetup);
function mobileAlertSetup(){
  if ($('#mobile-alert').css('display').toLowerCase() === 'none'){
    window.nbIsMobile = true;
  }
  $('#mobile-alert .nb-button').click(hideMobileAlert);
}
function hideMobileAlert(){
  $('#mobile-alert').hide();
  //Fire off the main section animations now
  nbAnimate();
}
},{}]},{},[1])


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBOaWNob2xhcyBvbiA5LzE1LzIwMTUuXHJcbiAqL1xyXG5cclxuLy9SZXF1aXJlIExpYnNcclxuLy92YXIgbGlicyA9IHJlcXVpcmUoJy4vbGlicy8nKTtcclxuLy92YXIgY29udGVudCA9IHJlcXVpcmUoJy4vY29udGVudC5qcycpO1xyXG4kKGRvY3VtZW50KS5yZWFkeShzY3JvbGxNYWdpY1NldHVwKTtcclxuZnVuY3Rpb24gc2Nyb2xsTWFnaWNTZXR1cCgpe1xyXG4gIHZhciBzY3JvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKHt2ZXJ0aWNhbDpmYWxzZX0pO1xyXG4gICQoJy5uYi1zZWN0aW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpcyxcclxuICAgICAgZHVyYXRpb246ICAgICAgIDAsXHJcbiAgICAgIHRyaWdnZXJIb29rOiAgICBcIm9uQ2VudGVyXCJcclxuICAgIH0pLmFkZFRvKHNjcm9sbGVyKTtcclxuXHJcbiAgICAvLyB1c2UgYSBmdW5jdGlvbiB0byBhdXRvbWF0aWNhbGx5IGFkanVzdCB0aGUgZHVyYXRpb24gdG8gdGhlIHdpbmRvdyBoZWlnaHQuXHJcbiAgICB2YXIgZHVyYXRpb25WYWx1ZUNhY2hlO1xyXG4gICAgZnVuY3Rpb24gZ2V0RHVyYXRpb24gKCkge1xyXG4gICAgICByZXR1cm4gZHVyYXRpb25WYWx1ZUNhY2hlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdXBkYXRlRHVyYXRpb24gKGUpIHtcclxuICAgICAgZHVyYXRpb25WYWx1ZUNhY2hlID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB9XHJcbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdXBkYXRlRHVyYXRpb24pOyAvLyB1cGRhdGUgdGhlIGR1cmF0aW9uIHdoZW4gdGhlIHdpbmRvdyBzaXplIGNoYW5nZXNcclxuICAgICQod2luZG93KS50cmlnZ2VySGFuZGxlcihcInJlc2l6ZVwiKTsgLy8gc2V0IHRvIGluaXRpYWwgdmFsdWVcclxuICAgIHNjZW5lLmR1cmF0aW9uKGdldER1cmF0aW9uKTsgLy8gc3VwcGx5IGR1cmF0aW9uIG1ldGhvZFxyXG5cclxuXHJcbiAgICAvL3VwZGF0ZSB0aGUgLm5iLWFjdGl2ZS1zZWN0aW9uIGNsYXNzIHRvIHRoaXMgdGFyZ2V0XHJcbiAgICBzY2VuZS5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgaWYgKCEkKCcubmItYW5pbWF0aW5nLXRvJykubGVuZ3RoKXtcclxuICAgICAgICAkKCcubmItYWN0aXZlLXNlY3Rpb24nKS5yZW1vdmVDbGFzcygnbmItYWN0aXZlLXNlY3Rpb24nKTtcclxuICAgICAgICAkKGV2ZW50LnRhcmdldC50cmlnZ2VyRWxlbWVudCgpKS5hZGRDbGFzcygnbmItYWN0aXZlLXNlY3Rpb24gbmItdmlzaXRlZC1zZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5cclxudmFyIGN1cnJlbnRQYW5lPVwiI0hvbWVcIjtcclxudmFyIGR1cmF0aW9uO1xyXG52YXIgZWFzaW5nRWZmZWN0PSdlYXNlT3V0QmFjayc7XHJcbi8vSGlkZSB0aGUgbmF2cGFuZSByaWdodCBhd2F5XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGFuaW1hdGVOYXZQYW5lSW4pO1xyXG5mdW5jdGlvbiBhbmltYXRlTmF2UGFuZUluKCl7XHJcbiAgJCgnI25hdnBhbmUnKVxyXG4gICAgICAuY3NzKHsnZGlzcGxheSc6ICdub25lJywgJ3RvcCc6ICctNjBweCd9KVxyXG4gICAgICAvL0FuaW1hdGUgYW5kIGZhZGUgaW4gdGhlIE5hdnBhbmVcclxuICAgICAgLmRlbGF5KDE1MDApLmFuaW1hdGUoe3RvcDonMHB4J30sMzAwMCkuZGVxdWV1ZSgpLmZhZGVJbigxMjUwKTtcclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkobmJBbmltYXRlKTtcclxuLy9TaG91bGQgcHJvYmFibHkgbW92ZSB0aGlzIG92ZXIgdG8gYSBHU0FQIHRpbWVsaW5lLCBidXQgaXQgd29ya3Mgd2VsbCBmb3Igbm93XHJcbmZ1bmN0aW9uIG5iQW5pbWF0ZSgpe1xyXG4gIGlmICghd2luZG93Lm5iSXNNb2JpbGUpe1xyXG4gICAgJCgnW2RhdGEtbmItYW5pbWF0ZS1mcm9tXScpLmVhY2goZnVuY3Rpb24oaWR4KXtcclxuICAgICAgdmFyIHRoaXNFbCAgPSAkKHRoaXMpO1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXNFbC5kYXRhKCduYi1hbmltYXRlLW9wdGlvbnMnKTtcclxuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtkdXJhdGlvbjogNDAwLCBkZWxheTogMCwgZWFzaW5nOiAnc3dpbmcnfSwgb3B0aW9ucyk7XHJcbiAgICAgIHZhciBmcm9tQ3NzID0gdGhpc0VsLmRhdGEoJ25iLWFuaW1hdGUtZnJvbScpIHx8IHt9O1xyXG4gICAgICB2YXIgdG9Dc3MgICA9IHRoaXNFbC5kYXRhKCduYi1hbmltYXRlLXRvJykgfHwgeydvcGFjaXR5JzogMSwgJ2Rpc3BsYXknOiAnYXV0byd9O1xyXG4gICAgICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgcG9zaXRpb246J3JlbGF0aXZlJyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtICcgKyBvcHRpb25zLmR1cmF0aW9uICsgJ21zJyxcclxuICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogJ3RyYW5zZm9ybSAnICsgb3B0aW9ucy5kdXJhdGlvbiArICdtcycsXHJcbiAgICAgICAgJy1tb3otdHJhbnNpdGlvbic6ICd0cmFuc2Zvcm0gJyArIG9wdGlvbnMuZHVyYXRpb24gKyAnbXMnLFxyXG4gICAgICAgICctbXMtdHJhbnNpdGlvbic6ICd0cmFuc2Zvcm0gJyArIG9wdGlvbnMuZHVyYXRpb24gKyAnbXMnLFxyXG4gICAgICAgICctby10cmFuc2l0aW9uJzogJ3RyYW5zZm9ybSAnICsgb3B0aW9ucy5kdXJhdGlvbiArICdtcydcclxuICAgICAgfTtcclxuICAgICAgaWYgKGZyb21Dc3MudHJhbnNmb3JtKXtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gZnJvbUNzcy50cmFuc2Zvcm07XHJcbiAgICAgICAgdmFyIHZlbmRUcmFuc2Zvcm0gPSB7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcclxuICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6IHRyYW5zZm9ybSxcclxuICAgICAgICAgICctbW96LXRyYW5zZm9ybSc6IHRyYW5zZm9ybSxcclxuICAgICAgICAgICctbXMtdHJhbnNmb3JtJzogdHJhbnNmb3JtLFxyXG4gICAgICAgICAgJy1vLXRyYW5zZm9ybSc6IHRyYW5zZm9ybVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJC5leHRlbmQoZnJvbUNzcywgdmVuZFRyYW5zZm9ybSk7XHJcbiAgICAgIH1cclxuICAgICAgLy9TZXR0aW5nIHRoZSBkZWZhdWx0IGZvciB0aGUgdHJhbnNpdGlvbiB3aWxsIG1lYW4gdGhhdCB0aGUgaW5pdGlhbCBmcm9tQ3NzIHdpbGwgYWJpZGUgYnkgdGhhdCB0aW1pbmcgdG9vXHJcbiAgICAgIC8vVGhpcyB3aWxsIG5vdCBiZSBkZXNpcmVkIGlmIG9wYWNpdHkgaXNuJ3QgdXNlZC4gVGhpcyBzaG91bGRcclxuICAgICAgLy9mcm9tQ3NzID0gJC5leHRlbmQoZGVmYXVsdHMsIGZyb21Dc3MpO1xyXG4gICAgICBvcHRpb25zLmFsd2F5cyA9IGFuaW1hdGlvbkNvbXBsZXRlO1xyXG4gICAgICB0aGlzRWxcclxuICAgICAgICAgIC5jc3MoZnJvbUNzcylcclxuICAgICAgICAgIC5kZWxheShvcHRpb25zLmRlbGF5KVxyXG4gICAgICAgICAgLmNzcyhkZWZhdWx0cylcclxuICAgICAgICAgIC5hbmltYXRlKHRvQ3NzLCBvcHRpb25zKTtcclxuXHJcblxyXG4gICAgICBmdW5jdGlvbiBhbmltYXRpb25Db21wbGV0ZSgpe1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ25vbmUnLFxyXG4gICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ25vbmUnLFxyXG4gICAgICAgICAgJy1tb3otdHJhbnNmb3JtJzogJ25vbmUnLFxyXG4gICAgICAgICAgJy1tcy10cmFuc2Zvcm0nOiAnbm9uZScsXHJcbiAgICAgICAgICAnLW8tdHJhbnNmb3JtJzogJ25vbmUnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIC8vU2V0IGEgZnVuY3Rpb24gZm9yIGFmdGVyIHNjcm9sbCBlbmRcclxuICB2YXIgZGVib3VuY2VkU2Nyb2xsO1xyXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIHRyeXtcclxuICAgICAgY2xlYXJUaW1lb3V0KGRlYm91bmNlZFNjcm9sbCk7XHJcbiAgICB9Y2F0Y2goZXJyKXt9XHJcbiAgICBkZWJvdW5jZWRTY3JvbGw9c2V0VGltZW91dChnZXRDdXJyZW50UGFuZSw1MDApO1xyXG4gICAgLy8qKioqKioqKioqU25hcCB0byBwYW5lLCBOb3QgTmVlZGVkLCBSZXBsYWNlZCB3aXRoIE92ZXJmbG93OmhpZGRlbjtcclxuICAgIC8veWZUaW1lPXNldFRpbWVvdXQoXCIkKHRoaXMpLnNuYXBUb1BhbmUoKVwiLDUwMCk7XHJcbiAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy9CaW5kIGFsbCBsaW5rcyB0byBkbyBhIHNtb290aCBzY3JvbGwgdG8gdGhlICdocmVmJ1xyXG4gICQoJ2EnKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgdmFyIGhyZWY9JCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAkKCdodG1sLCBib2R5Jykuc3RvcCh0cnVlLGZhbHNlKTtcclxuICAgIGNoZWNrRWFzaW5nKGhyZWYpO1xyXG4gICAgJChocmVmKS5hZGRDbGFzcygnbmItYW5pbWF0aW5nLXRvJyk7XHJcbiAgICAkLnNjcm9sbFRvKGhyZWYsZHVyYXRpb24sIHtcclxuICAgICAgICAgIGVhc2luZzogIGVhc2luZ0VmZmVjdCxcclxuICAgICAgICAgIG9uQWZ0ZXI6IGZ1bmN0aW9uICh0YXJnZXQsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDbGFzcygnbmItYW5pbWF0aW5nLXRvJykuYWRkQ2xhc3MoJ25iLWFjdGl2ZS1zZWN0aW9uIG5iLXZpc2l0ZWQtc2VjdGlvbicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRQYW5lKCl7XHJcbiAgLy9zZXQgdmFyaWFibGVzIGZvciBjYWxjdWxhdGluZ1xyXG4gIHZhciB3aW5TY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsTGVmdCgpO1xyXG4gIHZhciB3aW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gIHZhciBwYW5lTnVtID0gTWF0aC5yb3VuZCh3aW5TY3JvbGwvd2luV2lkdGgpO1xyXG4gIC8vR2V0IElEIG9mIGNvcnJlc3BvbmRpbmcgcGFuZU51bSBhbmQgc2V0ICdwYW5lJyB0byBpdFxyXG4gIHZhciBwYW5lPSBcIiNcIiArICQoJy5uYi1zZWN0aW9uJylbcGFuZU51bV0uaWQ7XHJcbiAgLy9VcGRhdGUgdGhlIE92ZXJGbG93IHRvIGFsbG93IHNjcm9sbGluZ1xyXG4gIHVwZGF0ZU92ZXJmbG93KHBhbmVOdW0pO1xyXG4gIHJldHVybiBwYW5lO1xyXG59XHJcbnZhciBPVkVSRkxPV19QQU5FUyA9IFsxLDJdO1xyXG5mdW5jdGlvbiB1cGRhdGVPdmVyZmxvdyhwYW5lTnVtKXtcclxuICAvL0lmIHRoZSBjdXJyZW50IHNlY3Rpb24gaXMgdGhlIHNlY29uZCBzZWN0aW9uICgjTXlQcm9ncmFtKSBTZXQgT3ZlcmZsb3cgdG8gU2Nyb2xsXHJcbiAgLy9Ub2RvOiBtYWtlIHRoaXMgZHluYW1pYyBhbmQgbm90IGhhcmQgY29kZWRcclxuICBpZiAoT1ZFUkZMT1dfUEFORVMuaW5kZXhPZihwYW5lTnVtKSAhPT0gLTEpe1xyXG4gICAgaWYgKCQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScpICE9PSAnc2Nyb2xsJyl7XHJcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJzY3JvbGxcIikuZGVxdWV1ZSgpLnNjcm9sbFRvKCctPTI1cHgnLDAsIHtheGlzOid4J30pO1xyXG4gICAgfVxyXG4gIH1lbHNle1xyXG4gICAgLy9EZWZhdWx0IHRvIEhpZGRlbiBPdmVyZmxvd1xyXG4gICAgaWYgKCQoXCJib2R5XCIpLmNzcygnb3ZlcmZsb3cteScpID09PSAnc2Nyb2xsJyl7XHJcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIikuZGVxdWV1ZSgpLnNjcm9sbFRvKCcrPTMwcHgnLDAsIHtheGlzOid4J30pOztcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vL1RoaXMgZnVuY3Rpb24gYWxsb3dzIGZvciBkaWZmZXJlbnQgZWFzaW5nIGFuZCBkdXJhdGlvbiB0byBlYWNoIElEXHJcbmZ1bmN0aW9uIGNoZWNrRWFzaW5nKGhyZWYpe1xyXG4gIC8vRGVmYXVsdCB0byBFYXNlT3V0QmFjaywgdW5sZXNzIHRoZSB0YXJnZXQgaXMgJyNIb21lJyBvciAnI0NvbnRhY3QnXHJcbiAgLy91c2luZyBhIFwiYmFjayBlYXNpbmcgZnVuY3Rpb24gY2F1c2VzIGl0IHRvIGdsaXRjaCBvdXQgYmVjYXVzZSBpdCBpcyBnb2luZyBiZXlvbmQgdGhlIGJvZHkgbGltaXRzXHJcbiAgZWFzaW5nRWZmZWN0PSdlYXNlT3V0QmFjayc7XHJcbiAgZHVyYXRpb249MTAwMDtcclxuICBpZiAoaHJlZj09PScjSG9tZScgfHwgaHJlZj09PScjQ29udGFjdCcpe1xyXG4gICAgZWFzaW5nRWZmZWN0PSdlYXNlT3V0UXVhcnQnO1xyXG4gICAgZHVyYXRpb249MTUwMDtcclxuICB9XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShtb2JpbGVBbGVydFNldHVwKTtcclxuZnVuY3Rpb24gbW9iaWxlQWxlcnRTZXR1cCgpe1xyXG4gIGlmICgkKCcjbW9iaWxlLWFsZXJ0JykuY3NzKCdkaXNwbGF5JykudG9Mb3dlckNhc2UoKSA9PT0gJ25vbmUnKXtcclxuICAgIHdpbmRvdy5uYklzTW9iaWxlID0gdHJ1ZTtcclxuICB9XHJcbiAgJCgnI21vYmlsZS1hbGVydCAubmItYnV0dG9uJykuY2xpY2soaGlkZU1vYmlsZUFsZXJ0KTtcclxufVxyXG5mdW5jdGlvbiBoaWRlTW9iaWxlQWxlcnQoKXtcclxuICAkKCcjbW9iaWxlLWFsZXJ0JykuaGlkZSgpO1xyXG4gIC8vRmlyZSBvZmYgdGhlIG1haW4gc2VjdGlvbiBhbmltYXRpb25zIG5vd1xyXG4gIG5iQW5pbWF0ZSgpO1xyXG59Il19