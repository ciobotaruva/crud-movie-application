const apiUrl = 'https://ancient-caverns-16784.herokuapp.com/auth';

//Selectors
const usernameError = document.querySelector('.username__error');
const passwordError = document.querySelector('.password_error');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const button = document.querySelector('button');
const fields = document.querySelectorAll('input');

//HANDLE FORM DATA 
const handleRegister = document.querySelector(".register__form").addEventListener("submit", (e)=>{
    e.preventDefault();

    const username = e.target.querySelector("#username").value;
    const password = e.target.querySelector("#password").value;

    //
    if(username === '' && password === ''){
        usernameError.innerHTML = 'Username is required'
        passwordError.innerHTML = 'Password is required'
    } else if(username === '' || username == null){
        usernameError.innerHTML = 'Username is required'
    } else if(password === '' || password == null){
        passwordError.innerHTML = 'Password is required'
    }else{
        //PASS FORM DATA 
        register(username, password);
    }
});

//REGISTER
async function register(username, password){
    try{
        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            body: `username=${username}&password=${password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = await res.json();
        handleRegisterErrors(data);
    }catch(err){
        console.warn(err);
    };
};

//Handle register errors
function handleRegisterErrors(data){
    //Display server response
    if(data.message === "Username already existing"){
        usernameError.innerHTML = data.message;
    }   
}

document.querySelector('form').addEventListener('keyup', removeErrors);

function formValidation(e){
    if(username.value === '' || username.value == null){
        usernameError.innerHTML = 'Username must contain 6 or more characters'
    }
}


//Remove error messages
function removeErrors(e){
    e.preventDefault();
    
    for(let i = 0; i < fields.length; i++){
        const field = fields[i];
        field.addEventListener('keyup',() =>{
            usernameError.innerHTML = '';
            passwordError.innerHTML = '';
        });
    }
}