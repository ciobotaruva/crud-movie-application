function handleButtonToggle(){
    const accessToken = localStorage.getItem('accessToken');
    const loginButton = document.querySelector('.login');
    const logoutButton = document.querySelector('.logout');
    const addMovie = document.querySelector('.add__movie');
    const register = document.querySelector('.register');

    //Toggle buttons
    if(accessToken){
        loginButton.style.display = 'none';
        register.style.display = 'none';
    } else if (accessToken === null) {
        logoutButton.style.display = 'none';
        addMovie.style.display = 'none';
    }
}

handleButtonToggle();