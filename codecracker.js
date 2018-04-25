/**
 *
 *  Codecracker {
 *      code: String,
 *      history: {
 *          guess: Array <String>,
 *          order: {
 *              correct: Array <String>,
 *              incorrect: Array <String>
 *          }
 *      },
 *      over: Boolean,
 *      won: Boolean,
 *      order: {
 *          correct: Integer,
 *          incorrect: Integer
 *      },
 *      try: {
 *          count: Integer,
 *          left: Integer
 *      },
 *      generateCode: Function,
 *      giveUp: Function,
 *      makeGuess: Function,
 *      __proto__: {
 *          didUserWin: Function,
 *          endTurn: Function,
 *          getCorrectOrder: Function,
 *          getIncorrectOrder: Function,
 *          removeDone: Function,
 *          resetOrder: Function,
 *          padZero: Function
 *      }
 *
 *
 *  }
 *
 */

const seedrandom = require('seedrandom');

Array.prototype.has = function (x) {
    return this.map(function(i,y){if(i==x){return y;} else{return null;}}).join("")
};

function GenerateCode(){
    return function(){
        var _min = 0;
        var _max = 9999;
        seedrandom(Date.now());
        var _code = Math.floor(Math.random() * (_max - _min + 1) + _min);
        this.code = this.padZero(_code);
    }
}

function GiveUp(){
    return function(){
        this.try.left = 0;
        this.over = true;
        this.won = false;
    }
}

function MakeGuess(){
    return function(guess){
        guess = this.padZero(guess)
        this.history.guess.push(guess);
        this.endTurn();
        var _temp = this.getCorrectOrder(guess);
        var _code = _temp[0];
        guess = _temp[1];
        _temp = this.getIncorrectOrder(_code,guess);
        this.history.order.correct.push(this.order.correct);
        this.history.order.incorrect.push(this.order.incorrect);
        this.didUserWin();
    }
}

class Codecracker {

    constructor(){
        this.generateCode = GenerateCode();
        this.giveUp = GiveUp();
        this.makeGuess = MakeGuess();

        this.generateCode();
        this.try = { count: 1, left: 15 };
        this.over = false;
        this.won = false;
        this.history = { guess: [], order: { correct: [], incorrect: [] } };
        this.resetOrder();
    }

    endTurn(){
        this.resetOrder();
        this.try.count += 1;
        this.try.left -= 1;
        if (this.try.left<=0){
            this.over = true;
        }
    }

    resetOrder(){
        this.order = { correct: 0, incorrect: 0};
    }

    padZero(n){
        return String('0000' + n).slice(-4);
    }

    didUserWin(){
        if (this.order.correct == 4 && this.order.incorrect == 0){
            this.won = true;
            this.over = true;
        }
    }

    removeDone(x,arr){
        var _code = this.code.split("");
        x = x.split("")

        for(var i=0; i<arr.length; i++){
            _code[arr[i]] = null;
            x[arr[i]] = null;
        }

        return [_code.join(""), x.join("")];
    }

    getCorrectOrder(B){
        var _removeIndex = [];
        var _code = this.code.split("");

        for(var i=0;i<4;i++){
            if(_code.has(B[i]).length > 0 && _code.has(B[i]).indexOf(i+"") != -1){
                this.order.correct += 1;
                _removeIndex.push(i);
            }
        }

        return this.removeDone(B, _removeIndex);
    }

    getIncorrectOrder(A,B){
        var _code = A.split("");
        B = B.split("");

        for(var i=0; i<B.length; i++){
            var _temp = _code.has(B[i]);
            if(_temp.length > 0 && _temp[0] != i){
                this.order.incorrect += 1;
                B[i] = null;
                _code[_temp[0]] = null;
            }
        }

        return B.join("");
    }

}


 module.exports = Codecracker;
