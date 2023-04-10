import React, { useEffect, useState } from "react";
import Connect from "fluxxor-connect";
import './NewSubscripList.less';
import SubscripItem from "../subscrip-item/SubscripItem";


const NewSubscripList = ({ selectedItem, selectHandler, newEntity, searchValue }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (newEntity) {
      list.push(newEntity);
      setList(list);
    }
  }, [newEntity]);

  useEffect(() => {
    const filteredList = list.filter(item => item.topic.toLowerCase().includes(searchValue));
    setFilteredList(filteredList);
  }, [searchValue, newEntity]);

  const renderSubscribe = (item) => (
    <React.Fragment key={item.order}>
      <SubscripItem
        item={item}
        selectedItem={selectedItem}
        selectHandler={selectHandler}
        searchValue={searchValue}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {!!searchValue ? filteredList.map(renderSubscribe) : list.map(renderSubscribe)}
    </React.Fragment>
  );
}

export default Connect({
  store: 'NewSubscriptionsStore',
  state: function (store) {
    return {
      newEntity: store.newEntity
    };
  }
})(NewSubscripList);