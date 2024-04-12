'use strict';

window.addEventListener('load', () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log('User email:', user.email);
    console.log('User password:', user.password);
  } else {
    console.log('User not found in local storage');
  }
});