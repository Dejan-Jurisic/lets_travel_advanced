let singInForm = document.querySelector('.sing-in-form'),
    register = document.querySelector('.register-form');

singInForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('sing-in-email').value;
    let password = document.getElementById('sing-in-password').value;
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        window.location.href = data.redirectURL;
    }).catch(() => alert('Wrong email or password'));
})

register.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let rePassword = document.getElementById('register-re-enter-password').value;
    if (password !== rePassword) {
        return;
    }
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((resp) => resp.text()).then((data) => alert(data));
})