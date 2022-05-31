/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, currentPLayer, rollButton, holdButton, newGameButton;
init();
newGameButton.addEventListener('click', init)
rollButton.addEventListener('click', rollDice)
holdButton.addEventListener('click', holdCurrentScore)


function init() {
    scores = [0, 0]
    roundScore = 0;
    currentPLayer = 0;
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    newGameButton = document.querySelector('.btn-new')
    rollButton = document.querySelector('.btn-roll')
    holdButton = document.querySelector('.btn-hold')
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.getElementById('name-0').classList.remove('winner')
    document.getElementById('name-1').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.add('active')

}


function nextPlayer() {
    // Hide Dice
    document.querySelector('.dice').style.display = "none"
    // Next Player
    currentPLayer === 0 ? currentPLayer = 1 : currentPLayer = 0
    // resetting game environment
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    // Toggling Active class for players
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
}
function rollDice() {
    // Generate random number
    var randomDIceNUmber = Math.floor(Math.random() * 6) + 1;

    // Display result
    document.querySelector('#current-' + currentPLayer).textContent = randomDIceNUmber
    var Dice = document.querySelector('.dice')
    Dice.src = 'imgs/dice-' + randomDIceNUmber + '.png'
    Dice.style.display = "flex"

    // Update the round score IF the rolled number was NOT a 1
    if (randomDIceNUmber !== 1) {
        // Add score
        roundScore += randomDIceNUmber
        document.querySelector('#current-' + currentPLayer).textContent = roundScore
    }
    else {
        nextPlayer()
    }
}
function holdCurrentScore() {
    // Add CURRENT score to GLOBAL score
    scores[currentPLayer] += roundScore
    document.getElementById('score-' + currentPLayer).textContent = scores[currentPLayer]
    // Check if the player won the game
    if (scores[currentPLayer] >= 100) {
        document.querySelector('.dice').style.display = "none"
        document.getElementById('name-' + currentPLayer).textContent = 'Winner!!'
        document.getElementById('name-' + currentPLayer).classList.toggle('winner')
        document.querySelector('.player-' + currentPLayer + '-panel').classList.toggle('active')
        rollButton.removeEventListener('click', rollDice)
        holdButton.removeEventListener('click', holdCurrentScore)
    }
    else {
        // Update the UI
        nextPlayer()
    }
}
