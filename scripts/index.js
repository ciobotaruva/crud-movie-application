const apiUrl = 'https://ancient-caverns-16784.herokuapp.com/movies';
const accessToken = localStorage.getItem('accessToken' || '');
//MOVIES REFERENCE
let movies = [];

//GET ALL MOVIES
async function getAllMovies(){
    const res = await fetch(apiUrl);
    const data = await res.json();
    movies = data.results;
    moviesList(movies);
}

//GENERATE MOVIE CARDS
function moviesList(movies){
    const section = document.querySelector('.movies');
    const htmlString = movies.map((movie)=> {
        return `
            <div class="movies__card">
                <h2 class="movie__title">${movie.Title}</h2>
                <img class="movie__poster" src="${movie.Poster}" alt="Loadin..."/>
                <p>Genre: ${movie.Genre}</p>
                <p>Language:${movie.Language}</p>
                <p>Runtime:${movie.Runtime}</p>
                <button class="movie__button" id=${movie._id}>Delete</button>
            </div>
        `
    }).join(' ');
    section.innerHTML = htmlString;
};

//SEARCH
const search = document.querySelector('#search').addEventListener('keyup', (e)=>{
    const searchString = e.target.value.toLowerCase();
    const filterMovies = movies.filter((movie)=>{
        return (
            movie.Title.toLowerCase().includes(searchString) ||
            movie.Genre.toLowerCase().includes(searchString)
        );
    });
    moviesList(filterMovies);
});

//LOGOUT
const handleLogout = document.querySelector('.logout').addEventListener('click', ()=>{
    localStorage.removeItem('accessToken');
    //REFRESH THE PAGE AFTER LOGOUT
    window.location.reload();
});

//Get movie ID and pass it
const handleDelete = document.querySelector('.movies').addEventListener('click', (e)=>{
    const movieId = e.target.getAttribute('id');
    if(movieId){
        deleteMovie(movieId);
    }
});

//Delete movie
async function deleteMovie(id){
    const res = await fetch(`https://ancient-caverns-16784.herokuapp.com/movies/${id}`, {
        method: 'DELETE',
        headers: {
            "X-Auth-Token" : accessToken
        }
    });

    const data = await res.text();
    console.log(data);
    if(data === `Movie ${id} deleted!`){
        emptyMovieList();
        getAllMovies();
    }
}

//Empty movie list after DELETE
function emptyMovieList(){
    document.querySelector('.movies').innerHTML = '';
}

getAllMovies();

