const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const refreshQuoteBtn = document.getElementById('refresh-btn');
const timeWrapper = document.querySelector('.time-and-location-info');
const time = document.getElementById('time');
const abbreviation = document.getElementById('abbreviation');
const greeting = document.getElementById('greeting');
const currentPosition = document.getElementById('current-position');
const timezone = document.getElementById('timezone');
const dayOfYear = document.getElementById('day-of-year');
const dayOfWeek = document.getElementById('day-of-week');
const weekNumber = document.getElementById('week-number');
const datailsContainer = document.getElementById('details');
const detailsBtn = document.getElementById('details-btn');

let hours = new Date().getHours();

async function getData(url) {
    let responce = await fetch(url);

    if(!responce.ok) {
        throw new Error('Something went wrong')
    } else {
        let data = await responce.json();
        return data;
    }
}

async function getQuote() {
    let res = await fetch('https://type.fit/api/quotes');
    let quotes = await res.json();
    let quoteIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = `${quotes[quoteIndex].text}`;
    quoteAuthor.textContent = `${quotes[quoteIndex].author}`;
}

getQuote().catch(err => {
    quoteText.textContent = "If you don't know the guy on the other side of the world, love him anyway because he's just like you. He has the same dreams, the same hopes and fears. It's one world, pal. We're all neighbors.";
    quoteAuthor.textContent = 'Frank Sinatra';
    console.log(err);
});

refreshQuoteBtn.addEventListener('click', getQuote);

function displayTime() {
    let date = new Date();
    time.textContent = date.toLocaleTimeString("en-GB", {timeStyle: "short"}
)}

displayTime()
setInterval(displayTime, 1000);

function displayGreeting() {
    
    if (hours >= 22) {
        greeting.textContent = "good night, it's currently";
    } else if (hours > 6 && hours < 12) {
        greeting.textContent = "good morning, it's currently";
    } else if (hours >= 12 && hours < 17) {
        greeting.textContent = "good afternoon, it's currently";
    } else if (hours >= 17 && hours < 22) {
        greeting.textContent = "good evening, it's currently";
    }
}

displayGreeting();

function changeTheme() {

    if (hours > 19) {
        document.body.classList.remove('daytime');
        document.body.classList.add('nighttime');
 
    } else if (hours > 6) {
        document.body.classList.add('daytime');
        document.body.classList.remove('nighttime');
    }
}

changeTheme();

getData("https://api.ipfind.com/me?auth=e7802493-9d7d-4703-bc0b-76d1d9021e15")
.then(data => {
    currentPosition.textContent = `in ${data.city}, ${data.country_code}`;
})
.catch(err => console.log(err))

getData('https://worldtimeapi.org/api/ip')
.then(data => {
    timezone.textContent = `${data.timezone}`;
    dayOfYear.textContent = `${data.day_of_year}`;
    dayOfWeek.textContent = `${data.day_of_week}`;
    weekNumber.textContent =`${data.week_number}`;
    abbreviation.textContent = `${data.abbreviation}`;
})
.catch(err => console.log(err))


detailsBtn.addEventListener('click', () => {
    if(parseInt(datailsContainer.style.height)
            != datailsContainer.scrollHeight) {
                datailsContainer.style.height = datailsContainer.scrollHeight + 'px';
                quoteContainer.style.height = '0px';
                quoteContainer.style.overflow = 'hidden';
                timeWrapper.style.marginTop = '0'
                detailsBtn.textContent = 'less';
                detailsBtn.classList.add('active');

            } else {
                datailsContainer.style.height = '0px';
                quoteContainer.style.height = quoteContainer.scrollHeight + 'px';
                timeWrapper.style.marginTop = 'auto';
                detailsBtn.textContent = 'more';
                detailsBtn.classList.remove('active');
            }
});


