((win, doc) => {
    'use strict';
    /* Variables */
    let numbers = '[data-calc="number"]';
    let operators = '[data-calc="operator"]';
    let glyphs = '[data-calc="glyph"]';
    let display = '[data-calc="display"]';
    /* Functions */

    /**
     * Constructor Stopwatch
     * @param {String | Array} selector String | Array
     */
    function Stopwatch(selector){
        this.selector = selector;
        if(typeof(this.selector) === "string"){
            this.querySelector = querySelector(this.selector);
        }else{
            this.querySelector = [];
            for(var i = 0; i < this.selector.length; i++){
                this.querySelector.push(querySelector(this.selector[i]));
            }
        }

        function querySelector(q){
            if(doc.querySelectorAll(q).length > 1){
                return doc.querySelectorAll(q);
            }else{
                return doc.querySelector(q);
            }
        }
    }

    function clickNumber(e){
        if(display.value == 0){
            display.value = this.value;
        }else{
            display.value += this.value;
        }
    }

    function clickOperator(e){
        e.preventDefault();
        if(display.value == 0){
            display.value = 0;
        }else if(isOperator(display.value)){
            display.value = display.value.slice(0, -1);
            display.value += this.value;
        }else{
            display.value += this.value;
        }
    }

    function clickGlyph(e){
        e.preventDefault();
        if(this.value == "ce"){
            display.value = 0;
        }else if(this.value == "="){
            let data = display.value;
            let arrData = data.match(/\d+[÷×+-]?/g);
            let result = arrData.reduce((accumulated, actual, index) => {
            let gathered = isOperator(accumulated) ? accumulated.slice(0, -1) : accumulated;
            let current = isOperator(actual) ? actual.slice(0, -1) : actual;
            let operating = isOperator(actual) ? actual.slice(-1) : '';
            let operator = isOperator(accumulated) ? accumulated.slice(-1) : '';
                switch(operator){
                    case "+":
                        return Number(gathered) + Number(current) + operating;
                    case "-":
                        return Number(gathered) - Number(current) + operating;
                    case "×":
                        return Number(gathered) * Number(current) + operating;
                    case "÷":
                        return Number(gathered) / Number(current) + operating;
                    default:
                        return 0;
                }
        })
        display.value = result;
        }else{
            if(display.value == 0){
                display.value = this.value;
            }else if(isGlyph(display.value)){
                display.value = display.value.slice(0,-1);
                display.value += this.value;
            }else{
                display.value += this.value;
            }
        }
    }

    function isOperator(operator){
        var operators = ["+", "-", "×", "÷"];
        var result = operators.find((op) => {
            if(operator.length == undefined){
                return false;
            }else{
                return op == operator.slice(-1);
            }
        });
        return result;
    }

    function isGlyph(glyph){
        alert("Em desenvolvimento");
        var glyphs = ["(", ")", "."];
        var result = glyphs.find((g) => {
            if(glyph.length == 1){
                return g == glyph;
            }else if(glyph.length == undefined){
                return false;
            }else{
                return g == glyph.slice(-1);
            }
        });
        return result;
    }
    /* Methods */

    /**
     * Method on add events
     * @param {String} action String
     * @param {Function} callback Function
     * @param {Boolean} listener Boolean - Optinal | Default false
     * @returns EventListener 
     */
    Stopwatch.prototype.on = (call, action, callback, listener = false) => {
        if(!call.value){
            Array.prototype.forEach.call(call, (item) => {
                item.addEventListener(action, callback, listener);
            });
        }else{
            call.addEventListener(action, callback, listener);
        }  
    }

    /* Calls */
    var stopwatch = new Stopwatch([numbers, operators, glyphs, display]);
    numbers = stopwatch.querySelector[0];
    operators = stopwatch.querySelector[1];
    glyphs = stopwatch.querySelector[2];
    display = stopwatch.querySelector[3];
    stopwatch.on(numbers, "click", clickNumber);
    stopwatch.on(operators, "click", clickOperator);
    stopwatch.on(glyphs, "click", clickGlyph);
})(window, document);