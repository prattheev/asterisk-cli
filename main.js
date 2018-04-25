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
                console.log(`You have won at try number - ${game.try.count - 1}`);
                console.log(`The Code was ${game.code}`);
                console.log("");
                process.exit(0);
            } else{
                console.log("___________________________________");
                console.log("| Correct Order | Incorrect Order |");
                console.log("----------------+------------------");
                console.log(`|       ${game.order.correct}       |        ${game.order.incorrect}        |`);
                console.log("-----------------------------------\n");
            }

            if(!game.over){
                loop();
            } else if(!game.won){
                console.log("\nSorry!");
                console.log("End of tries! :(");
                console.log(`The Code was ${game.code}`);
                user.close();
            }
        }
    });
}

loop();
