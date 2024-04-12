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

const postButton = document.querySelector('.post-button');
const postInput = document.querySelector('#post-input');
const postWall = document.querySelector('#post-wall');
const imageInput = document.getElementById('image-input');
const fileNameLabel = document.getElementById('image-name');


function addPost() {

  if (!(imageInput.files[0] || postInput.value)) return; // no input - do nothing


  const newDiv = document.createElement('div');
  const postDate = new Date();

  let imageSource;

 (imageInput.files[0]) ? imageSource = 
  `<div id="image-container"><img id ="post-image" src="
  ${URL.createObjectURL(imageInput.files[0])}" alt="image"></div>` 
  : imageSource = '';
  
  newDiv.innerHTML = `
    <div class="post-header">
     <div class="flex">
        <img id ="avatar" src="./src/media/avatar.jpg" alt="avatar"> 
        <p>Placeholder for username</p></div>
        <p>${postDate.toLocaleDateString(
          'en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      </div>
      <div class="post-content">
        <p>${postInput.value}</p>
        ${imageSource}
      </div>
    </div>`;
  newDiv.classList.add('post');


  const firstPost = postWall.firstChild;
  postWall.insertBefore(newDiv, firstPost);
  resetInput();
}

function resetInput() {
  postInput.value = '';
  imageInput.value = '';
  fileNameLabel.textContent = '';
}

postButton.addEventListener('click', addPost);

//this function shows the name of the image selected instead of the standard text
imageInput.addEventListener('change', function() {

  if (imageInput.files.length !== 0) {
    const fileName = imageInput.files[0].name;
    fileNameLabel.textContent = fileName;
  } else fileNameLabel.textContent = '';
});