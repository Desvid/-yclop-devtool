module.exports = {
  SearchSubscription: function(value) {
    this.dispatch('searchSubscription', value);
  },
  ClearSearch: function() {
    this.dispatch('clearSearch');
  },
};
