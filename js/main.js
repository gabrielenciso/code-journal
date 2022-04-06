/* global data */
/* exported data */
var $entryNav = document.querySelector('.entries-nav');

var $entryForm = document.querySelector('div[data-view="entry-form"]');
var $form = document.querySelector('form');
var $photoURLInput = document.querySelector('#photoUrl');
var $photoPreviewSRC = document.querySelector('.photo-preview img');

var $entriesPage = document.querySelector('div[data-view="entries"]');
var $buttonNew = document.querySelector('.button-to-form');
var $entriesList = document.querySelector('.entries-list');

var $emptyEntries = document.querySelector('div[data-view="entries"] > p');

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
  $entriesList.prepend(renderEntry(formResult));
  $form.reset();

  $entryForm.className = 'hidden';
  $entriesPage.className = '';
  $emptyEntries.remove();
}

function renderEntry(entries) {
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

  var $titleHead = document.createElement('div');
  $titleHead.setAttribute('class', 'row space-between center');

  var $title = document.createElement('h2');
  $title.setAttribute('class', 'font-form column-free');
  $title.textContent = entries.title;

  var $editIcon = document.createElement('img');
  $editIcon.setAttribute('src', 'images/Vector.png');
  $editIcon.setAttribute('class', 'column-free');

  $titleHead.append($title, $editIcon);

  var $text = document.createElement('p');
  $text.textContent = entries.notes;

  $divText.appendChild($titleHead);
  $divText.appendChild($text);
  return $entry;
}

function handleMakeEntry(event) {
  if (data.entries !== []) {
    for (var i = 0; i < data.entries.length; i++) {
      var $entry = renderEntry(data.entries[i]);
      $entry.setAttribute('data-entry-id', data.entries[i].entryId);
      $entriesList.appendChild($entry);
    }
  }
}

function handleEdit(event) {
  console.log('listetning');
  console.log('event.target: ', event.target);
  console.log('event.target.tagName: ', event.target.tagName);
}

function handleEntriesNav(event) {
  $entryForm.className = 'hidden';
  $entriesPage.className = '';
}

function handleToForm(event) {
  $entryForm.className = '';
  $entriesPage.className = 'hidden';
}

if (data.entries.length > 0) {
  $emptyEntries.remove();
}

$photoURLInput.addEventListener('input', handlePhotoUpdate);
$form.addEventListener('submit', handleSubmit);
$entryNav.addEventListener('click', handleEntriesNav);
$buttonNew.addEventListener('click', handleToForm);
$entriesList.addEventListener('click', handleEdit);

window.addEventListener('DOMContentLoaded', handleMakeEntry);
