const logoutBtn = document.getElementById('logout-btn');


function logout() {
    axios.get('/logout')
        .then(res => {
            alert("Logout successful.");
            window.localStorage.removeItem('email')
            location.assign("/");
        })
        .catch((err) => {
            console.log(err);
            alert("Error logging out. Please try again.");
        });
}


logoutBtn.addEventListener('click', logout);
