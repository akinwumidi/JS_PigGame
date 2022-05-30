/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, diceRoller;

scores = [0, 0]
roundScore = 0;
activePlayer = 0;
diceRoller = document.querySelector('.btn-roll')

document.getElementById('score-0').textContent = '0'
document.getElementById('score-1').textContent = '0'
document.getElementById('current-0').textContent = '0'
document.getElementById('current-1').textContent = '0'


diceRoller.addEventListener('click', function () {
    // Generate random number
    var randomDIceNUmber = Math.floor(Math.random() * 6) + 1;

    // Display result
    document.querySelector('#current-' + activePlayer).textContent = randomDIceNUmber
    var Dice = document.querySelector('.dice')
    Dice.src = 'imgs/dice-' + randomDIceNUmber + '.png'
    Dice.style.display = "flex"

    // Update the round score IF the rolled number was NOT a 1
    if (randomDIceNUmber !== 1) {
        // Add score
        roundScore += randomDIceNUmber
        document.querySelector('#current-' + activePlayer).textContent = roundScore
    }
    else {
        // Hide Dice
        Dice.style.display = "none"

        // Next Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

        // resetting game dependacies
        roundScore = 0
        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'

        // Toggling Active class for players
        document.querySelector('.player-1-panel').classList.toggle('active')
        document.querySelector('.player-2-panel').classList.toggle('active')
    }
})