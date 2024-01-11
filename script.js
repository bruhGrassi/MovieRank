const API_URL = 'https://api.themoviedb.org/3/discover/movie?'
const API_KEY = '&api_key=c52409697411e90ee08cc0aec8c32ab7&page=1'
const INITIAL_SORT= 'sort_by=popularity.desc'
const INITIAL_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c52409697411e90ee08cc0aec8c32ab7&language=pt-BR&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=c52409697411e90ee08cc0aec8c32ab7&language=pt-BR&query="'

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const searchBtn = document.getElementById('searchBtn');
const noResultsMessage = document.getElementById('noResultsMessage');

getMovies(INITIAL_URL)
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
   
    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    if (movies.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie;
            const movieEl = document.createElement('div');
            const imagePath = poster_path && !poster_path.includes('null') ? IMG_PATH + poster_path : 'no-image-icon.png';
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <img src="${imagePath}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            `
            main.appendChild(movieEl)
        })
    }
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)

    } else {
        window.location.reload
    }
});

search.addEventListener('input', () => {
    const searchTerm = search.value.trim();

    if (!searchTerm) {
        getMovies(INITIAL_URL);
    }
});

const sortSelect = document.getElementById('sort');
const clearFilterBtn = document.getElementById('clearFilter');

sortSelect.addEventListener('change', () => {
    const selectedValue = sortSelect.value;
    if (selectedValue !== '') {
        const sortedURL = `${API_URL}sort_by=${selectedValue}${API_KEY}`;
        getMovies(sortedURL);
    } else {
        getMovies(INITIAL_URL);
    }
});

clearFilterBtn.addEventListener('click', () => {
    getMovies(INITIAL_URL); 
    sortSelect.selectedIndex = 0;
    const searchTerm = search.value = "";

    if (!searchTerm) {
        getMovies(INITIAL_URL);
    }

    noResultsMessage.style.display = 'none';
});

searchBtn.addEventListener('click', () => {
    const searchTerm = search.value.trim();

    if (!searchTerm) {
        getMovies(INITIAL_URL);
    }
});