const startExploringEl = document.getElementById("start-exploring-container")
const watchlistEl = document.getElementById("watchlist")
const headerEl = document.getElementById("header")
const mainEl = document.getElementById("main")

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
console.log(watchlist)

if (watchlist.length > 0) {
    renderMovies()
} else {
    startExploringEl.style.display = "visible"
}

async function renderMovies() {

    let marginTop = -20
    if (watchlist.length > 0) {
        startExploringEl.style.display = "none"
    } else {
        location.reload()
    }
    let html

    for (let movie of watchlist) {
        
        const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=f98439bf&t=${movie}`)
        const movieData = await movieResponse.json()

        if (watchlist.indexOf(movieData.Title) !== 0) {
            marginTop += 37
        }

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
                        <button id=${watchlist.indexOf(`${movieData.Title}`)} class="remove-from-watchlist"><img class="minus-small" src="./images/remove.png"> Remove</p>
                    </div>
                    <div class="plot">
                        <p class="movie-description">${movieData.Plot}</p>
                    </div>
                </div>
            </div> 
            <hr>
        `
    }
    watchlistEl.style.marginTop = `${marginTop}vh`
    watchlistEl.innerHTML = html
    setTimeout(() => addEventListeners(watchlist), 0)
}

function addEventListeners(movieList) {

    const removeFromWatchlistButtons = document.getElementsByClassName("remove-from-watchlist")

    for (let button of removeFromWatchlistButtons) {

        button.addEventListener('click', (e) => removeItemFromWatchlist(e.target.id))
    }
}

function removeItemFromWatchlist(movieIndex) {
    console.log('this ran')
    watchlist.splice(movieIndex, 1)
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); 
    renderMovies()
}
