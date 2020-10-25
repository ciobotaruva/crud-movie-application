accessToken = localStorage.getItem('accessToken') || '';

//Selectors
const fields = document.querySelectorAll('input');
const allFieldsError = document.querySelector('.general__error');

//CREATE
const handleForm = document.querySelector('.movie__add').addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = e.target.querySelector('#title').value;
    const runtime = e.target.querySelector('#runtime').value;
    const genre = e.target.querySelector('#genre').value;
    const language = e.target.querySelector('#langauge').value;
    const poster = e.target.querySelector('#poster').value;

    if(title === '' || runtime === '' || genre ==='' || language ==='' || poster ===''){
        allFieldsError.innerHTML = "All fields are required";
    } else {
        addMovie(title, runtime, genre, language, poster);
    }
});

async function addMovie(title, runtime, genre, language, poster){
    try{
        const res = await fetch('https://ancient-caverns-16784.herokuapp.com/movies', {
            method: 'POST',
            body: `Title=${title}&Runtime=${runtime}&Genre=${genre}&Language=${language}&Poster=${poster}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Auth-Token': accessToken
            }
        });
        const data = await res.json();
        console.log(data);
    }catch(err){
        console.warn(err);
    }
}


//Form validation

const formValidation = document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();

    for(let i = 0; i < fields.length; i++){
        const field = fields[i];

        if(field.value === ''){
            addFieldError(field);
        }

        field.addEventListener('keyup', ()=>{
            removeErrors(field);
        });
    }

});

function addFieldError(field){
    field.style.border = '2px solid #c00';
}

function removeErrors(field){
    allFieldsError.innerHTML = '';
    field.style.border = 'none';
}