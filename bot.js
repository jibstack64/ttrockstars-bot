// ==UserScript==
// @name         TTROCK-bot
// @namespace    https://jibstack64.github.io
// @version      0.1
// @description  Times Tables Rockstars bot.
// @author       jibstack64
// @match        https://play.ttrockstars.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';

    GM_log("on.");

    if(typeof(String.prototype.trim) === "undefined") {
        String.prototype.trim = function() {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }

    /*const keyMap = new Map();
    const numbers = "0123456789"
    for (var i = 0; i < 10; i++) {
        keyMap.set(numbers[i], 48+i)
    }*/

    var running = false;
    setInterval(() => {
        var equation = document.getElementsByClassName("notranslate height-100 noselect current")[0];
        var input = document.getElementsByClassName("input-holder width-100")[0];
        var enter = document.getElementsByClassName("key-ent ng-star-inserted")[0];
        var top = document.getElementsByClassName("next-game-question padding-5")[0];
        var keypad = document.getElementsByClassName("keyboard mat-white-color bg-2")[0];

        if (equation != undefined) {
            if (running) {
                return;
            }
            // start running
            running = true;
            // add "hacks enabled" message
            let el = document.createElement("b");
            for (var i = 0; i < top.children.length; i++) {
                top.children[i].remove()
            }
            el.style = "width: auto;align-items: center;margin-top: 10px;margin-bottom: 10px;padding: 5px;border: 2px solid red; font-size: 20px;";
            el.innerHTML = " -> BOT ENABLED";
            top.appendChild(el);
    
            var id = setInterval(() => {
                if (running) {
                    let raw = equation.innerHTML.replace("×", "*").replace("÷", "/");
                    while (raw.includes("<!---->")) {
                        raw = raw.replace("<!---->", "");
                    }
                    raw = raw.trim();
                    let answer = String(eval(raw));
                    GM_log("answer: " + answer);
        
                    // example: 30 <!---->÷<!----><!----> 5 <!----><!----><!----><!---->
                    /*let el = "<span class=\"notranslate ng-star-inserted\">"+String(answer)+"</span>";
                    if (!input.innerHTML.includes(el)) {
                        input.innerHTML = "<span class=\"notranslate ng-star-inserted\">"+String(answer)+"</span>" + input.innerHTML
                    }*/
                    
                    [...answer].forEach(char => {
                        for (var row = 0; row < keypad.children.length; row++) {
                            for (var key = 0; key < keypad.children[row].children.length; key++) {
                                let elem = keypad.children[row].children[key]
                                if (elem.innerHTML.trim() == char) {
                                    elem.click();
                                    return;
                                }
                            }
                        }
                    });
                    enter.click();
                } else {
                    clearInterval(id);
                }
            }, 225);
        } else {
            running = false;
            let elems = document.getElementsByClassName("mat-button-wrapper");
            var play_again = null;
            for (var i = 0; i < elems.length; i++) {
                if (elems[i].innerHTML.toLowerCase().includes("Play again")) {
                    play_again = elems[i];
                    break
                }
            }
            if (play_again != null) {
                play_again.click();
            }
        }

    }, 100);
})();