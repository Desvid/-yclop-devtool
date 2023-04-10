import React from "react";
import Connect from "fluxxor-connect";
import './Search.less';

class Search extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  searchHandler(event) {
    const store = this.props.store;
    event.currentTarget.value && store ? store.onSearch(event.currentTarget.value) : store?.onClear();
  }

  render() {
    return (
      <React.Fragment>
        <input
          className="search"
          placeholder="Filter"
          type="search"
          onChangeCapture={this.searchHandler.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default Connect({
  store: 'SearchFilterStore',
  state: function (store) {
    return {
      store
    };
  }
})(Search);