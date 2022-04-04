/* global data */
/* exported data */

var $photoURLInput = document.querySelector('#photo-url');
var $photoPreviewSRC = document.querySelector('.photo-preview img');
console.log($photoURLInput);
console.log($photoPreviewSRC);

function handlePhotoUpdate(event) {
  $photoPreviewSRC.setAttribute('src', event.target.value);
}

$photoURLInput.addEventListener('input', handlePhotoUpdate);
