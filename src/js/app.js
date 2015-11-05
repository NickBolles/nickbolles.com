/**
 * Created by Nicholas on 9/15/2015.
 */
/*
  Setup Mobile alert
 */

//$(document).ready(mobileAlertSetup);
//$(window).resize(mobileAlertSetup);
//window.nbIsMobile = false;
//function mobileAlertSetup(){
//  window.nbIsMobile = false;
//  if ($('#mobile-alert').css('display').toLowerCase() !== 'none'){
//    window.nbIsMobile = true;
//  }
//  $('#mobile-alert .nb-button').click(function hideMobileAlert(){
//    $('#mobile-alert').hide();
//    //Fire off the main section animations now
//    nbAnimate(null,true);
//  });
//  return window.nbIsMobile;
//}

/*
  Setup nbTabs
 */
$(document).ready(nbTabsSetup);
function nbTabsSetup(){
  $('.nb-tabs').each(function(parent){
    parent = $(parent);
    var tabbar = $('<div class="nb-tab-bar"/>');
    parent.prepend(tabbar);
    var tabs = parent.find('.nb-tab');
    tabs.each(function(tab){
      tab = $(tab);
      var label = $('<div>tab.data().label</div>');
      label.click(showTab.bind(tab));
      tabbar.append();
    });
    function showTab(){
      tabs.slideUp();
      this.slideDown();
    }
  });
}


/*
Setup nbAnimate Elements
 */

$(document).ready(nbAnimate);
//Should probably move this over to a GSAP timeline, but it works well for now
var toAnimate = [];
function nbAnimate(e, force){
  var doAnimate = false;
  if (window.nbAnimated){
    return;
  }
  if (!window.nbIsMobile || force){
    doAnimate =true;
    window.nbAnimated = true;
    if (toAnimate.length >0){
      while(toAnimate.length>0){
        animate(toAnimate.pop());
      }
      return;
    }
  }

  $('[data-nb-animate-from]').each(function(idx){
    var thisEl  = $(this);
    var animation = {thisEl: thisEl};
    animation.options = thisEl.data('nb-animate-options');
    animation.options = $.extend({duration: 400, delay: 0, easing: 'swing'}, animation.options);
    animation.fromCss = thisEl.data('nb-animate-from') || {};
    animation.toCss   = thisEl.data('nb-animate-to') || {'opacity': 1, 'display': 'auto'};
    if (animation.fromCss.transform){
      //Setting the default for the transition will mean that the initial fromCss will abide by that timing too
      //This will not be desired if opacity isn't used. This should
      //fromCss = $.extend(defaults, fromCss);
      var transform = animation.fromCss.transform;
      var vendTransform = {
        transform: transform,
        '-webkit-transform': transform,
        '-moz-transform': transform,
        '-ms-transform': transform,
        '-o-transform': transform
      };
      $.extend(animation.fromCss, vendTransform);
    }
    var defaults = {
      position:'relative',
      transition: 'transform ' + animation.options.duration + 'ms',
      '-webkit-transition': 'transform ' + animation.options.duration + 'ms',
      '-moz-transition': 'transform ' + animation.options.duration + 'ms',
      '-ms-transition': 'transform ' + animation.options.duration + 'ms',
      '-o-transition': 'transform ' + animation.options.duration + 'ms'
    };
    animation.defaults = defaults;
    animation.options.always = animationComplete.bind(thisEl);

    //Set the initial css
    thisEl
        .css(animation.fromCss);
    //If we don't want to animate right now add it to a list to do later
    if (doAnimate){
      animate(animation)
    }else{
      toAnimate.push(animation);
    }
  });

  function animationComplete(){
    $(this).css({
      transform: 'none',
      '-webkit-transform': 'none',
      '-moz-transform': 'none',
      '-ms-transform': 'none',
      '-o-transform': 'none'
    });
  }
  function animate(animation){
    setTimeout(function(){
      animation.thisEl.css(animation.defaults)
          .animate(animation.toCss, animation.options);
    }, animation.options.delay);
  }
}

/*
  Setup Nav Pane animation
 */
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

/*
  Setup smooth scroll on click
 */
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
      $("body").css("overflow-y", "hidden").dequeue().scrollTo('+=30px',0, {axis:'x'});
    }
  }
}

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
}

/*
  Setup Scroll Effects
 */
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
