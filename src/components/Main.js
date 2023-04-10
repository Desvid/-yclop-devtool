import React from "react";
import Connect from "fluxxor-connect";

import SubscripContainer from "./subscrip-container/SubscripContainer";
import Spinner from "./spinner/Spinner";
import Header from "./header/Header";


class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    this.getSubscriptionData();
  }

  getSubscriptionData() {
    if (this.props.store && this.props.store.entities) {
      const keys = Object.keys(this.props.store.entities);
      const data = keys.map(key => this.props.store.entities[key]);
      if (JSON.stringify(data) !== JSON.stringify(this.state.data)) {
        this.setState({ data });
      }
    }
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <Header />
        {data ? <SubscripContainer list={data} searchValue={this.props.store.searchValue} /> : <Spinner/>}
      </React.Fragment>
    );
  }
}

export default Connect(
  {
    store: 'InitSubscriptionsStore',
    state: function (store) {
      return {
          store: {
            entities: store.entities
          }
        };
      }
  },
  {
    store: 'SearchFilterStore',
    state: function (store) {
      return {
        store: {
          searchValue: store.searchValue
        }
      };
    }
  }
)(Main);