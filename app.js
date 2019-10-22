/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- If the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls a 6 twice in a row, all his scores (round score and global score) gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game(you can set your own points limit)

*/



var scores, roundScore, activePlayer, gamePlaying, lastDice;

// We initiate the game with the basic variables
init();

// Clicking the button to roll the dice
document.querySelector('.btn-roll').addEventListener('click', function btn() {
    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
         
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'

        // 3. Update the round score IF the rolled number was NOT a 1
        // If a player rolls 6 twice in a row all his score is set to 0 and he loses his turn
        if (lastDice === 6 && dice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
         } else {
            // Next player
            nextPlayer();
        }

        lastDice = dice;
        console.log(dice);
        
    }

})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI to show the globalScore
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var winningScore;
        var input = document.querySelector('#input-win-score').value;

        if(input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;

        document.querySelector('.btn-hold').style.visibility = 'hidden';
        document.querySelector('.btn-roll').style.visibility = 'hidden';
        }

        // Next player
        nextPlayer();
        }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    // Next player with ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}



function init () {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Hide dice before roll
    document.querySelector('.dice').style.display = 'none';

    // Reset scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    // Player names reset
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // winner and active classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    // show roll and hold buttons
    document.querySelector('.btn-hold').style.visibility = 'visible';
    document.querySelector('.btn-roll').style.visibility = 'visible';

}

// Clicking for instructions
document.querySelector(".instructions").addEventListener("click", function(){
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".close").addEventListener("click", function(){
        document.querySelector(".modal").classList.remove("show");
    });
});