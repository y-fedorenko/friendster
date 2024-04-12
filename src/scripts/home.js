'use strict';

/* 
Post Wall part
*/
const postButton = document.querySelector('.post-button');
const postInput = document.querySelector('#post-input');
const postWall = document.querySelector('#post-wall');
const imageInput = document.getElementById('image-input');
const fileNameLabel = document.getElementById('image-name');
const rightSidebar = document.querySelector('#right-sidebar');

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

/* 
User Content generation part
*/

const options = {
  method: 'GET',
  headers: {'Content-Type': 'application/json; Charset=UTF-8'},
  mode: 'cors'
}

const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';
let users = [];

async function getUsers(endPoint) {
  try {
    const result = await fetch(endPoint, options);

    if (!result.ok) {
      throw new Error(`Error: ${result.status} - ${result.statusText}`);
    }
  
    const data = await result.json();
    console.log(data.results);
    users = data.results;
    setSuggestionsContent();
    
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener('load', getUsers(URL));

function setSuggestionsContent() {
  if (users.length === 0) return;
  users.forEach((user) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <div class="suggestion">
      <img id ="avatar" src="${user.picture.large}" alt="avatar"> 
      <p>${user.name.first} ${user.name.last}</p>
    </div>`;
    newDiv.classList.add('suggestion');
    const firstPost = rightSidebar.firstChild;
    rightSidebar.insertBefore(newDiv, firstPost);
  })
}