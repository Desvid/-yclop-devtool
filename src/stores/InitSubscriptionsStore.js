const Fluxxor = require('fluxxor');


const InitSubscriptionsStore = Fluxxor.createStore({
  actions: {
    'didGetFirstSubscriptions': 'onDidGetFirstSubscriptions'
  },

  initialize: function() {
    this.entities = null;
  },

  onDidGetFirstSubscriptions: function(data) {
    this.entities = data;

    this.emit('change');
  }
});

module.exports = InitSubscriptionsStore;
