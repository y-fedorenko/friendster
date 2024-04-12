'use strict';

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('#sign-in');
const incorrectCredentials = document.querySelector('.incorrect-credentials');

const user = {
  email: 'example@ex.com',
  password: '12345'
};

const KEEPMEINTIME = 60; // 1 minute

window.addEventListener('load', () => {
  localStorage.setItem('user', JSON.stringify(user));
});

function login() {
  if (checkCredentials(emailInput.value, passwordInput.value)) {
    loginSuccess();
  } else loginFailed();
}
function checkCredentials(email, password) {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  return (email === user.email && password === user.password);
}

function loginSuccess() {
  window.location.href = 'home.html';
}

function loginFailed() {
  emailInput.style.border = '1px solid #ff0000';
  passwordInput.style.border = '1px solid #fa3710';
  passwordInput.value = '';
  incorrectCredentials.style.display = 'block';
  setTimeout(() => {
    emailInput.style.border = '1px solid var(--color-light-grey)';
    passwordInput.style.border = '1px solid var(--color-light-grey)';
    incorrectCredentials.style.display = 'none';
  }, 1000);
}

loginButton.addEventListener('click', login);