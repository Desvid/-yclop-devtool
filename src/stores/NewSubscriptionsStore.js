const Fluxxor = require('fluxxor');


const NewSubscriptionsStore = Fluxxor.createStore({
  actions: {
    'didGetNewSubscription': 'onDidGetNewSubscription'
  },

  initialize: function() {
    this.newEntity = null;
  },

  onDidGetNewSubscription: function(data) {
    this.newEntity = data;

    this.emit('change');
  },
});

module.exports = NewSubscriptionsStore;
