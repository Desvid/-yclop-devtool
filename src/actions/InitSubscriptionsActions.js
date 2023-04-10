module.exports = {
  didGetFirstSubscriptions: function(subscriptions) {
    this.dispatch('didGetFirstSubscriptions', subscriptions);
  }
};
