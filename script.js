const gameBoard = document.getElementById('game-board');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;

// Cria as cartas
function createBoard() {
    const doubledValues = [...cardValues, ...cardValues]; // Duplicar as cartas para criar pares
    shuffledCards = shuffle(doubledValues); // Embaralha as cartas

    shuffledCards.forEach((value, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = value;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
        cards.push(cardElement);
    });
}

// Embaralha as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Vira a carta
function flipCard(event) {
    const card = event.target;

    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    // Verifica se há dois cards virados
    if (flippedCards.length === 1) {
        checkMatch();
    }
}

// Verifica se as cartas são iguais
function checkMatch() {
    moves++;
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];

    // Verifica se o jogo terminou
    if (matchedCards.length === cards.length) {
        setTimeout(() => alert(`Você venceu! Total de movimentos: ${moves}`), 500);
    }
}

// Inicia o jogo
createBoard();
