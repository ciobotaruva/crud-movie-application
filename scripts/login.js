const apiUrl = 'https://ancient-caverns-16784.herokuapp.com/auth';

//HANDLE FORM DATA
const handleSubmit = document.querySelector('.login__form').addEventListener('submit', (e)=> {
    e.preventDefault();

    const username = e.target.querySelector('#username').value;
    const password = e.target.querySelector('#password').value;

    //PASS INPUT USERNAME AND PASSWORD
    handleLogin(username, password);
});

//LOGIN
async function handleLogin(username, password){
    try{
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: `username=${username}&password=${password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } 
        });
        const data = await res.json();      
        handleResponse(data);
        handleLoginErrors(data);
    }catch(err){
        console.warn(err);
    };
};

//STORE THE TOKEN AND REDIRECT TO INDEX PAGE
function handleResponse(data){
    if(data.authenticated){
        const token = data.accessToken;
        localStorage.setItem('accessToken', token);
        setTimeout(()=>{
            window.location='http://127.0.0.1:5500/index.html';
        }, 3000);
    };
};


//HANDLE LOGIN ERRORS
function handleLoginErrors(data){
    const usernameError = document.querySelector('.username__error');
    const passwordError = document.querySelector('.password_error');

    //Display serverside error messages
    if(data.message === "User not found"){
        usernameError.innerHTML = data.message;
    } else if (data.message === "Wrong password"){
        passwordError.innerHTML = data.message;
    }
}

document.querySelector('form').addEventListener('keyup', handleLoginErrors);

//Initial button state is disabled
const button = document.querySelector('button');
button.disabled = true;

//Form validation
function handleLoginErrors(e){
    e.preventDefault();
    const fields = document.querySelectorAll('input');
    const usernameError = document.querySelector('.username__error');
    const passwordError = document.querySelector('.password_error');

    for(i = 0; i < fields.length; i++){
        field = fields[i];
        if(field.value.length > 0){
            button.disabled = false;
        }

        //Remove field error message
        field.addEventListener('keyup', () =>{
            usernameError.innerHTML = '';
            passwordError.innerHTML = '';
        });

    }
}
