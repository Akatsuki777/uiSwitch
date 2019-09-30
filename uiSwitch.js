(function (root, factory) {
    
    
	if ( typeof define === 'function' && define.amd ) {
		define([], function () {
			return factory(root);
		});
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.uiSwitch = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

  'use strict';

   var defaults = {
        selectorClass : 'uiSwitch',
        
        outerClassName: 'uiSwitchBase',
        innerClassName: 'uiSwitchButton',
        
        uiSwitchWidth: '200px',
        uiSwitchBorderRadius: '100px',
        uiSwitchHeight: '100px',

        uiSwitchTransistionTime: 500
    }
  var setSize = function(parentElem){
        defaults.uiSwitchBorderRadius = parentElem.offsetHeight;
        defaults.uiSwitchWidth = parentElem.offsetWidth;
        defaults.uiSwitchHeight = parentElem.offsetHeight;
    };
    
    var changeSize = function(baseElement,buttonElement){
        baseElement.style.borderRadius = defaults.uiSwitchBorderRadius+"px";
        buttonElement.style.width = (defaults.uiSwitchBorderRadius-2)+"px";
        buttonElement.style.height = (defaults.uiSwitchBorderRadius-2)+"px";
        buttonElement.style.borderRadius = (defaults.uiSwitchBorderRadius-2)+"px";
    };
    
    var animate = function(from,to,uiButton,dir){
        var start = new Date().getTime(),
            timer = setInterval(function(){
                
                var time = new Date().getTime() - start;
                if(time>=defaults.uiSwitchTransistionTime){
                    clearInterval(timer);
                    uiButton.style.left = to+"px";
                }
                var t = time/defaults.uiSwitchTransistionTime,
                    step = from + calc.easeInOutQuart(t)*(to-from);
            
                uiButton.style.left = step+"px";

            },10);
        
        uiButton.style.left = from+"px";
        uiButton.style.width = defaults.uiSwitchHeight+"px";
    };
    


    var calc = {
        easeInOutQuart : function(t){
            if(t<.5) return calc.easeInQuart(t*2)/2;
            return 1-calc.easeInQuart((1-t)*2)/2;
        },
        easeInQuart : function(t){
            return Math.pow(t,4);
        },
        easeOutQuart : function(t){
            return 1-calc.easeInQuart(1-t);
        }
    };
    
    var makeAnim = function(uiButton,uiBase){
    
        var from = uiButton.offsetLeft - uiBase.offsetLeft;
        var to = 0;
        if(from <= 2){
           to = (uiBase.offsetWidth-uiButton.offsetWidth-3);
        } else {
           to = 1;
        }
        return [from,to];
    }; 
    
     var publicAPIs = function(){
         var isSwitchClicked = false;
    };
	
    publicAPIs.prototype.init = function(elem, callback){
            
            var base = document.createElement("div");
            var button = document.createElement("div");
            base.setAttribute("class",defaults.outerClassName);
            button.setAttribute("class",defaults.innerClassName);
            
            setSize(elem);
            changeSize(base,button);
            
            base.appendChild(button);
            
            elem.appendChild(base);
            
            base.addEventListener("click",function(){
                
                this.isSwitchClicked = !this.isSwitchClicked;
                var fromTo = makeAnim(button,base);
                animate(fromTo[0],fromTo[1],button);
                if(this.isSwitchClicked){
                    base.style.borderColor = "#FF0000";
                    button.style.backgroundColor = "#FF0000";
                } else {
                     base.style.borderColor = "rgb(0,192,126)";
                    button.style.backgroundColor = "rgb(0,192,126)";
                }
                if(typeof(callback) === "function"){
                  callback();
                }
            });   
    };
       
    return publicAPIs;
});
