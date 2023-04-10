const Fluxxor = require('fluxxor');


const SearchFilterStore = Fluxxor.createStore({
  actions: {
    'searchSubscription': 'onSearch',
    'clearSearch': 'onClear'
  },

  initialize: function() {
    this.searchValue = '';
  },

  onSearch: function(searchValue) {
    this.searchValue = searchValue;
    this.emit('change');
  },

  onClear: function() {
    this.searchValue = '';
    this.emit('change');
  },
});

module.exports = SearchFilterStore;
