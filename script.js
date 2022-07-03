const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
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
    let quote
    try{
        quote = await getRandomQuote();
    }catch(err){
        quote = "When I get up in the morning, I feel so grateful for every second I have with you and have here on Earth. You give my life meaning; you give my days such joy; you are the reason I smile. Thank you for being with me, for joining me on this journey through life. Your love is everything to me and API is not working"
    }
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

