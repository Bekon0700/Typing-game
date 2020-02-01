const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteInput = document.getElementById('quoteInput')
const timer = document.getElementById('timer');

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let correct = true;
    arrayQuote.forEach((char, index) => {
        const character = arrayValue[index];

        if (character == null) {
            char.classList.remove('incorrect');
            char.classList.remove('correct');
            correct = false;
        } else if (character === char.innerText) {
            char.classList.remove('incorrect');
            char.classList.add('correct');
        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');
            correct = false;
        }
    });

    if (correct) {
        getNextQuote();
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(res => res.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote();
    quoteDisplay.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    });

    quoteInput.value = null;
    startTimer();
}

let startTime;
function startTimer() {
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

getNextQuote();

