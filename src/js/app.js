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