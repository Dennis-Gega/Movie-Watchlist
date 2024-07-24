const searchBarEl = document.getElementById("search-bar")
const searchButtonEl = document.getElementById("search-button")
const startExploringEl = document.getElementById("explore-container")
const movieList = document.getElementById("movie-list")
const header = document.getElementById("header")
const watchlistEl = document.getElementById("watchlist")

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

searchButtonEl.addEventListener('click', handleClick)  


async function handleClick() {

    startExploringEl.style.display = "none"
    const response = await fetch(`http://www.omdbapi.com/?apikey=f98439bf\&s=${searchBarEl.value}`)
    const data = await response.json()
    const movies = data.Search
    let html = ''

    try {

        for (let i = 0; i < 5; i++) {

            const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=f98439bf&t=${movies[i].Title}`)
            const movieData = await movieResponse.json()

            html += `
                <div class="movie-card">
                    <div class="movie-poster-container">
                        <img class="movie-poster" src="${movieData.Poster}" />
                    </div>
                    <div class="movie-info">
                        <div class="title-rating">
                            <p class="movie-title">${movieData.Title}</p>
                            <p class="movie-rating"><img class="star" src="./images/star.png">${movieData.imdbRating}
                        </div>
                        <div class="runtime-genre">
                            <p class="movie-runtime">${movieData.Runtime}</p>
                            <p class="movie-genre">${movieData.Genre}</p>
                            <button id="${i}" class="add-to-watchlist"><img class="plus-small" src="./images/plus.png"> Watchlist</p>
                        </div>
                        <div class="plot">
                            <p class="movie-description">${movieData.Plot}</p>
                        </div>
                    </div>
                </div> 
                <hr>
            `
        }
        movieList.style.marginTop = "105vh"
        header.style.marginBottom = "20vh"
        setTimeout(() => addEventListeners(movies), 0);

    } catch(error) {
        console.log(error)
        movieList.style.marginTop = "0vh"
        header.style.marginBottom = "0vh"
        html = "<p class='no-movie-found'>Unable to find what you're looking for. Please try another search.</p>"
    }
    movieList.innerHTML = html
}

function addEventListeners(movieList) {

    const addToWatchlistButtons = document.getElementsByClassName("add-to-watchlist")

    for (let button of addToWatchlistButtons) {

        button.addEventListener('click', (e) => {
            const movieIndex = e.target.id
            const movieTitle = movieList[movieIndex].Title

            addItemToWatchlist(movieTitle)
        })
    }
}

function addItemToWatchlist(movieTitle) {
    if (!watchlist.includes(movieTitle)) {
        watchlist.push(movieTitle);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));    
    }
}
