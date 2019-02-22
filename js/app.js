var cards = ["fa-diamond", "fa-diamond",
             "fa-paper-plane-o", "fa-paper-plane-o",
             "fa-anchor", "fa-anchor",
             "fa-bolt", "fa-bolt",
             "fa-cube", "fa-cube",
             "fa-leaf", "fa-leaf",
             "fa-bicycle", "fa-bicycle",
             "fa-bomb", "fa-bomb",
            ];


function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


function initGame() {
    var deck = document.querySelector(".deck");

    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join("");
    time = 0;
    setTimer();
    createStarsPanel();
};


initGame();


function removeStar() {
    var star = document.querySelectorAll("ul.stars li");
    var stars = document.querySelector("ul.stars");

    var removed = stars.removeChild(star[star.length-1]);
};


let moves = 0;
const movesCounter = document.querySelector(".moves");


function slipCards() {
    const allCards = document.querySelectorAll(".card");
    let openCards = [];
    let matchedCards = [];
    allCards.forEach(function(card){
        card.addEventListener("click", function(e) {
    
            if(!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("match")){
            openCards.push(card);
            card.classList.add("open", "show");
    
            //check if they match
            if(openCards.length == 2) {
                if(openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add("match");
                    openCards[0].classList.add("open");
                    openCards[0].classList.add("show");
                    openCards[0].classList.add("animated");
                    openCards[0].classList.add("tada");
    
                    openCards[1].classList.add("match");
                    openCards[1].classList.add("open");
                    openCards[1].classList.add("show");
                    openCards[1].classList.add("animated");
                    openCards[1].classList.add("tada");
                    
                    matchedCards.push(openCards[0], openCards[1]);
                    if (matchedCards.length === 16) {
                        gameOver();
                    };
                    openCards = [];
                } else {
    
            //if cards don't match, hide
                    setTimeout(function(){
                        openCards.forEach(function(card){
                            card.classList.remove("open", "show");
                        });
    
                        openCards = [];
                        
                        }, 700);
                    } 

                    moves += 1;
                    if (moves == 1) {
                        movesCounter.innerHTML = moves + ' Move';
                    } else {
                        movesCounter.innerHTML = moves + ' Moves';
                    }
        
                    if (moves == 10 || moves == 18) {
                        removeStar();
                    }
                }
            }           
        });
    });
};

slipCards();

var time = 0;
var timer;

function setTimer() {
    timer = setInterval(function() {
        time++;

    }, 1000);
};

function clearTimer() {
    clearInterval(timer);
};

var resetBtn = document.querySelector(".restart");
resetBtn.addEventListener('click', function() {
    clearTimer();
    initGame();
    moves = 0;
    movesCounter.innerHTML = moves + ' Moves';
    slipCards();
});

function createStarsPanel() {

    $("ul.stars li").remove();

    var ul = document.querySelector("ul.stars");
    var text = "<li><i class='fa fa-star'></i></li>";

    for (i = 0; i < 3; i++) {
    ul.insertAdjacentHTML("beforeend", text);
    };
}

//after match every cards run this function
function gameOver() {
    const winnerAlert = document.querySelector("div#winnerAlert");
    winnerAlert.style.visibility = "visible";
    const rating = document.querySelector("p#rating");
    let message = 
    `You did it with ${moves+1} moves and ${time} seconds!
    
    Your rating is:

    `;
    const text1 = "<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>";
    const text2 = "<i class='fa fa-star'></i><i class='fa fa-star'></i>";
    const text3 = "<i class='fa fa-star'></i>";

    if (moves <= 9) {
        rating.textContent = message;
        rating.insertAdjacentHTML("beforeend", text1);
        } else if (moves <= 17) {
        rating.textContent = message;
        rating.insertAdjacentHTML("beforeend", text2);
        } else {
        rating.textContent = message;
        rating.insertAdjacentHTML("beforeend", text3);
        }
    };

//stars new game on button click
    var newGame = document.querySelector("div#winnerAlert button");
    newGame.addEventListener("click", function() {
        winnerAlert.style.visibility = "hidden";
        clearTimer();
        initGame();
        moves = 0;
        movesCounter.innerHTML = moves + ' Moves';
        slipCards();
    });
