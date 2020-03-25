
var document;
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// The variable scores is a array scores = [0,0] which hold the scores of both players.
// scores[0] means the score of player 1 and scores[1] is score of player 2.

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random Number.
        var dice = Math.floor((Math.random() * 6) + 1);
        
        //Display Result.
        document.querySelector('.dice').style.display = 'block';
        animateCSS('.dice', 'flip');
        document.querySelector('.dice').src = 'img/dice-' + dice + '.png';
        
        //Update Result IF no. was not 1.
        if (dice !== 1) {
            //Add Score.
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player.
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add current score to global score.
        scores[activePlayer] += roundScore;
        
        //display result.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if the Player Won.
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            //Hide Dice.
            document.querySelector('.dice').style.display = 'none';
            //Add winner class and remove active class.
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            document.querySelector('.dice').style.display = 'none';
            nextPlayer();
        }
    }
});



document.querySelector('.btn-new-game').addEventListener('click', function() {
    var conf = confirm("Are You Sure you want to start New Game?");
    if(conf == true) {
        init();
    } else {
        //Do nothing
    }
});



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    //Current score get back to 0.
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    
    //Switch the active class.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //Remove all then set 1st player to active.
    document.querySelector('.player-0-panel').classList.add('active');
}


function animateCSS(element, animationName, callback) {
    var node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}


window.addEventListener('beforeunload', function(event) {
    event.returnValue = "Are you sure You Want to refresh the page? All Progress will be Lost!";
});

//window.onbeforeunload = function() {
//  return "Are you sure You Want to refresh the page? All Progress will be Lost!";
//};


/*window.onbeforeunload = function()
        {
          var r = confirm("Are you sure You Want to refresh the page? All Progress will be Lost");
          if(r)
          {
            window.location.reload();
          }
          else {}
        };
*/