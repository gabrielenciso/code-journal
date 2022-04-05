/* global data */
/* exported data */

var $photoURLInput = document.querySelector('#photoUrl');
var $photoPreviewSRC = document.querySelector('.photo-preview img');
var $form = document.querySelector('form');

function handlePhotoUpdate(event) {
  $photoPreviewSRC.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();

  var formResult = {};
  formResult[$form.elements.title.name] = $form.elements.title.value;
  formResult[$form.elements.photoUrl.name] = $form.elements.photoUrl.value;
  formResult[$form.elements.notes.name] = $form.elements.notes.value;
  formResult.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formResult);

  $photoPreviewSRC.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
}

$photoURLInput.addEventListener('input', handlePhotoUpdate);
$form.addEventListener('submit', handleSubmit);
