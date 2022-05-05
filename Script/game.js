const techs = [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react"
]

let lockMode = false
let firstCard = null
let secondCard = null
let cards = []

function createCardsFromTech(techs) {
    techs.forEach(tech => {
        cards.push(createPairFromTech(tech))
    });
    return cards.flatMap(pair => pair)
    //Aqui significa que estou dando um flatMap no pair e retornando ele mesmo, mas com a nova propriedade do flatMap que desmembra
    // o array pai.
}

function createPairFromTech(tech) {
    return [{
        id: createIdFromTech(tech),
        icon: tech,
        flipped: false
    }, {
        id: createIdFromTech(tech),
        icon: tech,
        flipped: false
    }]
}

function createIdFromTech(tech) {
    return tech + parseInt(Math.random() * 1000)
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function setCard(id) {
    let card = cards.filter(card => card.id === id)[0];
    if (card.flipped || lockMode) {
        return false
    }
    if (!firstCard) {
        firstCard = card
        firstCard.flipped = true
        return true
    } else {
        secondCard = card
        secondCard.flipped = true
        lockMode = true
        return true
    }
}


function clearCards() {
    firstCard = null
    secondCard = null
    lockMode = false
}

function checkWin() {
    return firstCard.icon === secondCard.icon
}

function gameOver() {
    return cards.filter(card => !card.flipped).length == 0
}

function restart() {
    cards = []
    play()
    startGame()
    clearCards()
    gameOverLayer.style.display = "none"
}