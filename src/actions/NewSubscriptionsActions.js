module.exports = {
  didGetNewSubscription: function(subscription) {
    this.dispatch('didGetNewSubscription', subscription);
  }
};
