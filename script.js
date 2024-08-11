const gameboard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const cards = [
    'A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'
];
const scoreSpan = document.getElementById('score-text');
const bestStreakSpan = document.getElementById('bestStreak-text');
const currentStreakSpan = document.getElementById('currentStreak-text');
const streakGIF = document.getElementById('streak-text-column-left');
const winDiv = document.getElementById('win-div');

let flippedCards = [];
let matchedCards = [];
let score = 0;
let streak = false;
let currentStreak = 0;
let bestStreak = 0;
let matchCount = 0;
const goodPairSound = new Audio('../audio/goodPair.wav');
goodPairSound.volume = 0.30;

//Mélanger les cartes 

function shuffleCards(array){
    for (let i=array.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

}

function createBoard(){
    streak = false;currentStreak=0;bestStreak=0;
    scoreSpan.innerHTML='0';
    currentStreakSpan.innerHTML='0';
    gameboard.innerHTML = '';
    matchCount = 0;
    winDiv.classList.add('hidden');
    
    shuffleCards(cards);
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.dataset.index = toString(index);
        cardElement.addEventListener('click', flipCard);
        gameboard.appendChild(cardElement);
    });
}

function flipCard(){
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card.dataset.index)) {
        switch(this.dataset.value) {
            case 'A': 
            card.style.backgroundImage = "url('../img/cafe.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'B': 
            card.style.backgroundImage = "url('../img/beach.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'C': 
            card.style.backgroundImage = "url('../img/guitar.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'D': 
            card.style.backgroundImage = "url('../img/lake.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'E': 
            card.style.backgroundImage = "url('../img/redhead.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'F': 
            card.style.backgroundImage = "url('../img/samus.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'G': 
            card.style.backgroundImage = "url('../img/snow.png')";
            card.style.backgroundSize = "cover";
            break;
            case 'H': 
            card.style.backgroundImage = "url('../img/street.png')";
            card.style.backgroundSize = "cover";
            break;
        }
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2){
            setTimeout(checkMatch, 700);
        }
    }
}

function checkMatch(){
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value){
        goodPairSound.play();
        matchCount++;
        console.log(matchCount);
        matchedCards.push(firstCard.dataset.index, secondCard.dataset.index);
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        firstCard.style.backgroundImage = "none";
        secondCard.style.backgroundImage = "none";

        if (streak){
            score += 20;
        } else { score += 10 };

        if (currentStreak >= 2){
            streakGIF.style.backgroundImage = "url('img/big-flame.gif')";
            streakGIF.style.backgroundSize = 'contain';
            streakGIF.style.backgroundRepeat = 'no-repeat';
            streakGIF.style.backgroundPosition = 'center';
        } else {
            streakGIF.style.backgroundImage = "url('img/little-flame.gif')";
            streakGIF.style.backgroundSize = 'contain';
            streakGIF.style.backgroundRepeat = 'no-repeat';
            streakGIF.style.backgroundPosition = 'center';
            };

        streak = true;

        currentStreak += 1;
        currentStreakSpan.innerHTML = currentStreak;
        scoreSpan.innerHTML = score;
        if(bestStreak <= currentStreak){
            bestStreak = currentStreak;
            bestStreakSpan.innerHTML = bestStreak;
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.style.backgroundImage = "none";
        secondCard.style.backgroundImage = "none";
        streak = false;
        currentStreak = 0;
        currentStreakSpan.innerHTML = '0';
    }
    flippedCards = [];
    matchedCards = [];
    if(matchCount === (cards.length)/2){
        winDiv.classList.remove('hidden');
    }
}

restartButton.addEventListener('click', createBoard);


createBoard();