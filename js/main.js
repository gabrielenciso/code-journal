/* global data */
/* exported data */

var $photoURLInput = document.querySelector('#photoUrl');
var $photoPreviewSRC = document.querySelector('.photo-preview img');
var $form = document.querySelector('form');
var $entryNav = document.querySelector('.entries-nav');

var $entryForm = document.querySelector('div[data-view="entry-form"]');
var $entriesPage = document.querySelector('div[data-view="entries"]');

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

function makeEntry(entries) {
  // <li class="row">
  //   <div class="photo-preview column-half">
  //     <img src="images/placeholder-image-square.jpg">
  //   </div>
  //   <div class="column-half padding-left-entries">
  //     <h2 class="font-form">Ada Lovelace</h2>
  //     <p>
  //       Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles
  //       Babbage's proposed mechanical general-purpose computer, the Analytical Engine.She was the first to recognize that the
  //       machine had applications beyond pure calculation, and to have published the first algorithm intended to be carried out
  //       by such a machine.
  //     </p>
  //   </div>
  // </li>
  var $entry = document.createElement('li');
  $entry.setAttribute('class', 'row');

  var $photoView = document.createElement('div');
  $photoView.setAttribute('class', 'photo-preview column-half');

  var $image = document.createElement('img');
  $image.setAttribute('src', entries.photoUrl);

  $photoView.appendChild($image);

  var $divText = document.createElement('div');
  $divText.setAttribute('class', 'column-half padding-left-entries');

  $entry.appendChild($photoView);
  $entry.appendChild($divText);

  var $title = document.createElement('h2');
  $title.setAttribute('class', 'font-form ');
  $title.textContent = entries.title;

  var $text = document.createElement('p');
  $text.textContent = entries.notes;

  $divText.appendChild($title);
  $divText.appendChild($text);

  return $entry;
}

function handleMakeEntry(event) {
  var $entriesList = document.querySelector('.entries-list');

  for (var i = 0; i < data.entries.length; i++) {
    var $entry = makeEntry(data.entries[i]);
    $entriesList.appendChild($entry);
  }
}

function handleEntriesNav(event) {
  $entryForm.className = 'hidden';
  $entriesPage.className = '';
}

$photoURLInput.addEventListener('input', handlePhotoUpdate);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleMakeEntry);
$entryNav.addEventListener('click', handleEntriesNav);
