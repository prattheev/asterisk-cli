/**
 *
 *  main.js
 *
 *  Written by Pratheev <pratheev@email.com>, December 23, 2017 6:41 PM
 *
 *
 *  This code holds the interaction between the player and the game algorithm.
 *
 *
 *  @Last modified time: December 24, 2017 8:40 PM
 *
 *  --------------------------------------------------------------------------
 *
 *  "THE BEERWARE LICENSE" (Revision 42):
 *  Pratheev <pratheev@email.com> wrote this code. As long as you retain this
 *  notice, you can do whatever you want with this stuff. If we
 *  meet someday, and you think this stuff is worth it, you can
 *  buy me a beer in return.
 *
 *  IN NO EVENT SHALL PRATHEEV BE LIABLE FOR ANY DIRECT, INDIRECT
 *  CONSEQUENTIAL, BLAH FLURB LEGALESE HERE, ARE YOU ACTUALLY READING THIS;
 *  EVEN WHEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, BOB'S YOUR UNCLE.
 *
 *  This is not a life-saving device and must not be used to build one,
 *  or a medical device, oh, and also, this is not something you'd want
 *  to put in a nuclear power plant, or anything else for that matter.
 *  In fact, you'd be wise to print a copy, destroy all other copies,
 *  including electronic copies, burn the printout, dissolve the ashes
 *  in acid, and bury the waste into a hole in the desert.
 *
 *  --------------------------------------------------------------------------
 */

// Imports
const readline = require('readline');
const credits = require('./credits');
const Codecracker = require('./codecracker');

// Config Interface
const user = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display Credits
credits();

// Create new game
var game = new Codecracker();
console.log("\n4-digit pin (0000-9999) has been generated. You got 15 tries to crack it!\n");

// While the game is not over
var loop = function(){
    user.question(`${game.try.count}. Make a guess: `, (guess) => {
        if((guess+"").length>4){
            console.log("\nThat's too large for the guess!");
            console.log("Try again :)\n");
            loop();
        } else{
            game.makeGuess(guess);
            if(game.won){
                console.log("\nCongratulations! :)");
                console.log(`You have won at try number - ${game.try.count}`);
                console.log(`The Code was ${game.code}`);
            } else{
                console.log("___________________________________");
                console.log("| Correct Order | Incorrect Order |");
                console.log("----------------+------------------");
                console.log(`|       ${game.order.correct}       |        ${game.order.incorrect}        |`);
                console.log("-----------------------------------\n");
            }

            if(!game.over){
                loop();
            } else{
                console.log("\nSorry!");
                console.log("End of tries! :(");
                console.log(`The Code was ${game.code}`);
                user.close();
            }
        }
    });
}

loop();
