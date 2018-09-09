var menuHammer = $(".menutrigger").hammer({ drag_lock_to_axis: true }).on("panleft  panright panend", onTriggerEvent);
    var menuEle = document.getElementById('menu');
    var menuStatus=false;
    var screenWidth = $(window).width();
    
/******************PERSONALIZE MENU**********************/
    var menuSize=new Number(75); //this is a percent
    var menuSizePx = screenWidth*(menuSize/100);
    var menuHidePosition= '-' + menuSizePx+500;
    var menuAnnimateAmmount= menuSizePx;
    var menubg="url('img/bg_dark.png')";
    var menuOpacity ="1";
    var menuShadowEnabled = true;
    var menuShadow = "rgba(0, 0, 0, 0.14902) 30px 0px 30px 0px";
    var menuOverHeader = true;

/******************PERSONALIZE MENU*********************/ 
/******************PERSONALIZE SHADE*********************/
    var shadeInclude = true;
    var shadeOpacity = ".8";
    var shadeBGColor = "black"; 
    //var shadebg = "linear-gradient(to right,black 30%,transparent)";
    var menuTitle={
        fonttype: "arial",
        fontsize: new Number(20),
        color: "#fff",
        bgcolor: "#5a5959",
        padding: "4px 0 4px 10px",
        background: "linear-gradient(rgba(90,89,89,1) 5%, rgba(66,65,65,1) 85%",
        topborder: "solid #6b6b6b 1px",
        bottomborder: "solid #3d3d3d 1px",
        textshadow: "0px -1px 1px #333",
        centered: ""
    };
    var menuItem ={
        color: "#fff",
        fontSize: new Number(14),
        hover:{
            bgColor: "#716f6f",
            color: "#fff"
        }
    };
    var menuItemActive={
        background: "linear-gradient(#1e1d1d, #383737 21%)",
        bgColor: "#383737"
    };
    
/******************PERSONALIZE MENU*********************/
$(document).ready(function(){
    //Create the shade, and get the menu object

    

    $(menuEle).css({
        "width": menuSize + "%",
        "height": "100%",
        "display": "block !important",
        "margin-top": function(){
            if (!menuOverHeader){
                return $("#header").height();
            }else{
                return 0;
            }
            //Doesn't Take Into Account Possible negative Margin-Top
        },
        "z-index": 999999,
        "top":0,
        "background": menubg,
        "opacity": menuOpacity,
        "position":"fixed",
        "left": menuHidePosition + "px" ,
        "overflow-y": "auto",
        "box-shadow": function(){
            if (menuShadowEnabled){
                return menuShadow;
            }else{
               return ""; 
            }
        }
    }).addClass('menuTransitions');
    $("#menu header").css({
        "font-family": menuTitle.fonttype,
        "font-size":menuTitle.fontsize + 'px',
        "color":menuTitle.color,
        "margin":0,
        "background-color":menuTitle.bgcolor,
        "padding":menuTitle.padding,
        "background": menuTitle.background,
        "border-top": menuTitle.topborder,
        "border-bottom":menuTitle.bottomborder,
        "text-shadow": menuTitle.textshadow
    });
    /*$('.sub-menu').css({
        "border-bottom": "solid #333 1px",
        "box-shadow": "0 1px 0 #727272",
        "color": menuItem.color,
        "font-size": (menuItem.fontSize * 1.25) + 'px',
        "font-family": "arial",
        "text-decoration": "underline",
        "display": "block",
        "padding": "10px 0px 10px 10px",
        "text-shadow": "0px 1px 1px #000000"        
    });*/
    $("#menu ul").css({
        "margin":"0",
        "padding": "0",
        "width": "100%",
        
    });
    $("#menu ul li").css({
        "list-style-type": "none",
        "margin": "0"
    });
    $('#menu ul li a:link, #menu ul li a:visited, .sub-menu li a').css({
        "border-bottom": "solid #333 1px",
        "box-shadow": "0 1px 0 #727272",
        "color": menuItem.color,
        "font-size": menuItem.fontSize + "px",
        "font-family": "arial",
        "text-decoration": "none",
        "display": "block",
        "padding": "10px 0px 10px 10px",
        "text-shadow": "0px 1px 1px #000000",
      });
      



    $('#menu ul li a:hover, #menu ul li a:active').css({
        "background-color": menuItem.hover.bgColor,
        "color": menuItem.hover.color
      });
    
    $('.active').css({
        "background-color": menuItemActive.bgColor,
        "background": menuItemActive.background
      });
      
      
      $('#menu footer').css({
          "position": "absolute",
          "bottom":"0",
          "width":"100%",
          "border-bottom": "solid #333 1px"
          
      });

    if (shadeInclude){
        var shade =document.createElement('div');
        shade.id = "shade";
        document.body.appendChild(shade);
        $(shade).css({
            "position":"absolute",
            "top":"0",
            "left":"0",
            "overflow": "hidden",
            "opacity": shadeOpacity,
            "display":"none",
            "z-index": "999998",
            "background-color": shadeBGColor,
            //"background": shadebg,
            "width":"100%",
            "height":"100%",
            "margin-top": function(){
                if (!menuOverHeader){
                    return $("#header").height();
                }else{
                    return 0;
                }
                //Doesn't Take Into Account Possible negative Margin-Top
            },
            "animation-duration": '.5s',
            "-webkit-animation-duration": '.5s'
        });
    };
    $('#menutrigger').css({
        "width": "10px",
        "height": "100%",
        "display": "block !important",
        "float": "left",
        "margin-left": "-1px",
        "z-index": 999997,
        "top":0,
        "left":0,
        "position":"fixed"
    });





    $(shade).click(function(){
       if(menuStatus ){
           toggleMenu();
       };
    });
    $("#showmenubutton").click(function(){
            toggleMenu();
            return false;
    });

    
    //$(".menutrigger").on('dragLeft dragRight');
    //Menu Item State Change
    $("#menu li a").click(function(){
            var p = $(this).parent();
            if($(p).hasClass('active')){
                    $("#menu li").removeClass('active');
            } else {
                    $("#menu li").removeClass('active');
                    $(p).addClass('active');
            }
    });


});
function toggleMenu(){
    if(!menuStatus ){
        setMenu(true);
        return false;
    } else {
        setMenu(false);
        return false;
    }
};
function setMenu(state){
    $(menuEle).addClass('menuTransitions');
    $(menuEle).addClass('animating');
    setTimeout(function(){$(menuEle).removeClass('animating');},500);
    if(!state){
        //The Following code is used for a 'Push' annimation
        /*$(".ui-page-active").animate({
                marginLeft: "+="+menuSize+"px",
          }, 300);
        */
       menuStatus = false;
        $(menuEle).css({
              left: menuHidePosition + "px",
        }, 300);
        return false;
    } else if (state){
        menuStatus = true;
         //The following code is used for a push annimation
         /*$(".ui-page-active").animate({
            marginLeft: "0px",
        }, 300);*/
        $(menuEle).css({
              left: "0px"
        }, 300);
        return false;
    }
         shadeStatus(menuStatus);
};
function shadeStatus(menuStatus){
    if (menuStatus){
        $(shade).addClass('animated fadeInTo80').css('display', 'block');
        setTimeout(function(){
            $(shade).removeClass('animated fadeInTo80');
        },300);
    }
    else{
        $(shade).addClass('animated fadeOutFrom80');
        setTimeout(function(){
            $(shade).removeClass('animated fadeOutFrom80').css('display', 'none');
        },300);
        
    }
};
function setMenuOffset(offset){
    //cache all transition 
    //if(Modernizr.csstransforms3d) {
        //$(menuEle).css("transform", "translate3d( "+ offset +"px,0,0) scale3d(1,1,1)");
    //}
    /*else if(Modernizr.csstransforms) {
        $(menuEle).css("transform", "translate("+ percent +"px,0)");
    }
    else {*/
    $(menuEle).css("left", offset+"px");
    //}
}
function onTriggerEvent(event){
    console.log('menutriggerevent');
    console.log(event);
    event.preventDefault();
    $(menuEle).removeClass('menuTransitions');
    var animate = false;
    if (!$(menuEle).hasClass('animating')){
        switch(event.type) {
            case 'panright':console.log('panRight');
            case 'panleft':console.log('panLeft');
                console.log(event.gesture.velocity);
                if (event.gesture.velocity >2){
                    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////swipe');
                    menuHammer.off("panleft  panright panend");
                    setTimeout(function(){menuHammer.on("panleft  panright panend", onTriggerEvent);},500)
                    if(event.gesture.direction == 4) {
                       
                        console.log('setting menu to true');
                        setMenu(true);
                        animate = true;
                    } else {
                        console.log('setting menu to false');
                        setMenu(false);
                        animate = true;
                    }
                }else{
                  //not the final pan event
                if (event.gesture.isFinal !== true){
                    var xCoord = event.gesture.center.x;

                    if (xCoord<menuSizePx){
                        var drag_offset = xCoord;
                        console.log(drag_offset);
                        setMenuOffset(drag_offset-menuSizePx);

                    }else{
                        console.log('menu is max size');
                    }    
                }
                //the final pan event
                else{
                    console.log('Pan Finished');
                    // more then 50% moved, navigate
                    if(Math.abs(event.gesture.deltaX) > menuSizePx/2) {
                        if (event.gesture.deltaX>0){
                            console.log('setting menu to true');
                            setMenu(true);
                            animate = true;
                        }else{
                            console.log('setting menu to false');
                            setMenu(false);
                            animate = true;
                        }
                        console.log('overHalfway. direction is ' + event.gesture.direction);
    //                    DIRECTION_NONE	1
    //                    DIRECTION_LEFT	2
    //                    DIRECTION_RIGHT	4
    //                    DIRECTION_UP	8
    //                    DIRECTION_DOWN	16
    //                    DIRECTION_HORIZONTAL	6
    //                    DIRECTION_VERTICAL	24
    //                    DIRECTION_ALL	30
                        if(event.gesture.direction == 4) {
                            console.log('setting menu to true');
                            setMenu(true);
                            animate = true;
                        } else {
                            console.log('setting menu to false');
                            setMenu(false);
                            animate = true;
                        }
                    }
                    else {
                        console.log('not halfway setting menu to ' + menuStatus);
                        setMenu(menuStatus);
                        animate = true;
                    }

                } 
                }
                


                break;

            case 'swipeleft':
                console.log('menutrigger swiperight');
                console.log(event);
                if ( $(menuEle).css("left") == menuHidePosition || $(menuEle).css("left") == 0){
                    setMenu(false);
                    menuHammer.stop(true);
                    animate = true;
                }
                break;

            case 'swiperight':
                console.log('menutrigger swipeleft');
                console.log(event);
                setMenu(true);   
                menuHammer.stop(true);
                animate = true;
                break;
        }
        if (animate){
            
            
        }
    }
    else{
        console.log('menu animating');
    }
}
