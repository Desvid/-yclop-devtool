import InitSubscriptionsActions from './InitSubscriptionsActions';
import NewSubscriptionsActions from './NewSubscriptionsActions';
import SearchFilterActions from './SearchFilterActions';

export default {
  initSubscriptions: InitSubscriptionsActions,
  newSubscriptions: NewSubscriptionsActions,
  searchFilter: SearchFilterActions,

  didConnect: function() {
    this.dispatch('connected');
  }
};
