/* global data */
/* exported data */
var $entryNav = document.querySelector('.entries-nav');

var $entryForm = document.querySelector('div[data-view="entry-form"]');
var $form = document.querySelector('form');
var $photoURLInput = document.querySelector('#photoUrl');
var $photoPreviewSRC = document.querySelector('.photo-preview img');
var $deleteEntry = document.querySelector('.delete-entry');

var $entriesPage = document.querySelector('div[data-view="entries"]');
var $buttonNew = document.querySelector('.button-to-form');
var $entriesList = document.querySelector('.entries-list');

var $emptyEntries = document.querySelector('div[data-view="entries"] > p');

var $overlay = document.querySelector('.overlay');
var $deleteConfirmation = document.querySelector('.delete-confirmation');
var $deleteButtonConfirm = document.querySelector('.button-confirm');
var $deleteButtonCancel = document.querySelector('.button-cancel');

function handlePhotoUpdate(event) {
  $photoPreviewSRC.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();

  if (data.editing === null) {
    var formResult = {};
    formResult[$form.elements.title.name] = $form.elements.title.value;
    formResult[$form.elements.photoUrl.name] = $form.elements.photoUrl.value;
    formResult[$form.elements.notes.name] = $form.elements.notes.value;
    formResult.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formResult);

    $photoPreviewSRC.setAttribute('src', 'images/placeholder-image-square.jpg');
    var $newEntry = renderEntry(formResult);
    $entriesList.prepend($newEntry);
    $form.reset();
  } else {
    var editResult = {};
    editResult[$form.elements.title.name] = $form.elements.title.value;
    editResult[$form.elements.photoUrl.name] = $form.elements.photoUrl.value;
    editResult[$form.elements.notes.name] = $form.elements.notes.value;
    editResult.entryId = data.editing.entryId;

    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries.splice(i, 1, editResult);
        break;
      }
    }

    var $entriesListArray = document.querySelectorAll('li');

    for (var j = 0; j < $entriesListArray.length; j++) {
      var currentDataEntryId = $entriesListArray[j].getAttribute('data-entry-id');
      if (data.editing.entryId.toString() === currentDataEntryId) {
        var $editedEntry = renderEntry(editResult);
        $entriesList.replaceChild($editedEntry, $entriesListArray[j]);
        break;
      }
    }

    $photoPreviewSRC.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    data.editing = null;
  }

  $entryForm.className = 'hidden';
  $entriesPage.className = '';
  $emptyEntries.remove();
}

if (data.entries.length > 0) {
  $emptyEntries.remove();
}

function renderEntry(entries) {
  var $entry = document.createElement('li');
  $entry.setAttribute('class', 'row');
  $entry.setAttribute('data-entry-id', entries.entryId);

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
  $titleHead.setAttribute('class', 'row');

  var $titleBlock = document.createElement('div');
  $titleBlock.setAttribute('class', 'column-fifth-fill');

  var $editIconBlock = document.createElement('div');
  $editIconBlock.setAttribute('class', 'column-fifth text-align-end');

  var $title = document.createElement('h2');
  $title.setAttribute('class', 'font-form');
  $title.textContent = entries.title;
  $titleBlock.appendChild($title);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fa-solid fa-pen fa-2xl column-fifth');
  $editIconBlock.appendChild($editIcon);

  $titleHead.append($titleBlock, $editIconBlock);

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
      $entriesList.appendChild($entry);
    }
  }
}

function handleEdit(event) {
  if (event.target.tagName === 'I') {
    $entryForm.className = '';
    $entriesPage.className = 'hidden';
    $deleteEntry.className = 'delete-entry';
  } else {
    return;
  }

  var dataId = event.target.closest('li').getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    var dataEntryId = data.entries[i].entryId;
    if (dataId === dataEntryId.toString()) {
      data.editing = data.entries[i];
      break;
    }
  }

  $form.elements.title.value = data.editing.title;
  $form.elements.photoUrl.value = data.editing.photoUrl;
  $photoPreviewSRC.setAttribute('src', data.editing.photoUrl);
  $form.elements.notes.value = data.editing.notes;

}

function handleEntriesNav(event) {
  $entryForm.className = 'hidden';
  $entriesPage.className = '';
}

function handleToForm(event) {
  $entryForm.className = '';
  $entriesPage.className = 'hidden';
  $deleteEntry.className = 'delete-entry hidden';
}

function handleDelete(event) {
  $overlay.className = 'overlay';
  $deleteConfirmation.className = 'delete-confirmation';
}

function handleDeleteButtonCancel(event) {
  $overlay.className = 'overlay hidden';
  $deleteConfirmation.className = 'delete-confirmation hidden';
}

function handleDeleteButtonConfirm(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      break;
    }
  }

  var $entriesListArray = document.querySelectorAll('li');
  for (var j = 0; j < $entriesListArray.length; j++) {
    var currentDataEntryId = $entriesListArray[j].getAttribute('data-entry-id');
    if (data.editing.entryId.toString() === currentDataEntryId) {
      $entriesListArray[j].remove();
      break;
    }
  }

  $overlay.className = 'overlay hidden';
  $deleteConfirmation.className = 'delete-confirmation hidden';
  $entryForm.className = 'hidden';
  $entriesPage.className = '';
}

$photoURLInput.addEventListener('input', handlePhotoUpdate);
$form.addEventListener('submit', handleSubmit);
$entryNav.addEventListener('click', handleEntriesNav);
$buttonNew.addEventListener('click', handleToForm);
$entriesList.addEventListener('click', handleEdit);
$deleteEntry.addEventListener('click', handleDelete);
$deleteButtonCancel.addEventListener('click', handleDeleteButtonCancel);
$deleteButtonConfirm.addEventListener('click', handleDeleteButtonConfirm);

window.addEventListener('DOMContentLoaded', handleMakeEntry);
