/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('journal-logs');

if (data.entries !== []) {
  data = JSON.parse(previousData);
}
