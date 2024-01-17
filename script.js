function toggleTransition() {
    var container = document.getElementById('container');
    container.classList.toggle('active');
    setTimeout(function () {
        container.classList.toggle('active');
    }, 2000);
}

function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some(user => user.email === email);
    const phoneNumberExists = users.some(user => user.phoneNumber === phoneNumber);

    if (!/^[0-9]{9,15}$/.test(phoneNumber)) {
        alert('Número de telefone inválido. Por favor, insira apenas números.');
        return;
    }

    // Validar o formato do email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Endereço de e-mail inválido. Por favor, insira um e-mail válido.');
        return;
    }

    if (emailExists || phoneNumberExists) {
        alert('E-mail ou Número de Telefone já cadastrado. Por favor, use outro e-mail ou número.');
        return;
    }

    const user = {
        firstName,
        lastName,
        phoneNumber,
        email,
        password
    };

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso! Por favor, faça login.');
    showLogin();
    toggleTransition();
}

function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
    toggleTransition();
}

function showLogin() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    toggleTransition();
}

function login() {
    const loginId = document.getElementById('loginId').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = users.find(user => (user.email === loginId || user.phoneNumber === loginId) && user.password === loginPassword);

    if (matchedUser) {
        alert('Login bem-sucedido!');
        window.location.href = 'hello.html';
    } else {
        alert('Credenciais de login inválidas. Por favor, verifique seu e-mail/número de telefone e senha.');
    }
}