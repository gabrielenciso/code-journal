/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  sortOldest: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('journal-logs');

if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-logs', dataJSON);
}
