const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")
const table = document.getElementById("table")
const currentTime = document.getElementById("currentTime")
const saves = document.getElementById("saves")
let indiceHour = 0
let indiceMinut = 0
let indiceSecond = 0
let interval = null
let beginCount = false
const gameOverLayer = document.getElementById("gameOver")
const startGameLayer = document.getElementById("startGame")
const board = document.getElementById("board")

function start() {
    startGame()
    currentTime.style.display = "flex"
    saves.style.display = "block"
    startGameLayer.style.display = "none"
    board.style.display = "grid"
}

function startGame() {
    cards = createCardsFromTech(techs)
    shuffleCards(cards)
    initializeCards(cards)
    play()
}

function initializeCards(cards) {

    board.innerHTML = ''
    cards.forEach(card => {

        let div = document.createElement("div")
        div.id = card.id
        div.dataset.icon = card.icon
        div.classList.add(CARD)
        div.setAttribute("flipped", card.flipped)
        div.addEventListener("click", flipCards)

        setTimeout(() => {
            div.classList.add("flip")
        }, 300)
        setTimeout(() => {
            div.classList.remove("flip")
        }, 2000)

        let divFront = document.createElement("div")
        let imgFront = document.createElement("img")
        imgFront.src = "./images/" + card.icon + ".png"
        divFront.classList.add(FRONT)

        let divBack = document.createElement("div")
        divBack.innerHTML = "&lt/&gt"
        divBack.classList.add(BACK)

        divFront.appendChild(imgFront)
        div.appendChild(divFront)
        div.appendChild(divBack)

        board.appendChild(div)
    });
}

function flipCards() {
    if (setCard(this.id)) {
        this.classList.add("flip")
        if (secondCard != null) {
            if (checkWin()) {
                clearCards()
                if (gameOver()) {
                    gameOverLayer.style.display = "flex"
                    clearInterval(interval)
                    addInterval()
                }
            } else {
                setTimeout(() => {
                    firstCardView = document.getElementById(firstCard.id)
                    secondCardView = document.getElementById(secondCard.id)

                    firstCardView.classList.remove("flip")
                    secondCardView.classList.remove("flip")
                    firstCard.flipped = false
                    secondCard.flipped = false
                    clearCards()
                }, 700);
            }
        }
    }
}


function play() {
    if (beginCount == false) {
        interval = setInterval(function () {
            indiceSecond += 1
            if (indiceSecond == 60) {
                indiceSecond = 0
                indiceMinut++
            }

            if (indiceMinut == 60) {
                indiceMinut = 0
                indiceHour++
            }

            if (indiceHour < 10) { ho = "0" + indiceHour }
            else { ho = indiceHour }

            if (indiceMinut < 10) { mi = "0" + indiceMinut }
            else { mi = indiceMinut }

            if (indiceSecond < 10) { se = "0" + indiceSecond }
            else { se = indiceSecond }


            hours.innerText = ho
            minutes.innerText = mi
            seconds.innerText = se

            return ho, mi, se

        }, 1000)
    }
}

function addInterval() {
    let tr = document.createElement("tr")
    tr.innerHTML = "<td>" + ho + ":" + mi + ":" + se + " | Tente novamente e bata o seu record!</td>"
    table.appendChild(tr)
}










