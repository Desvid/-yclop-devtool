import React, { useState } from "react";
import './InitSubscripList.less';
import SubscripItem from "../subscrip-item/SubscripItem";
import { useEffect } from "react/cjs/react.development";


const InitSubscripList = ({ list, selectedItem, selectHandler, searchValue }) => {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const filteredList = list.filter(item => item.topic.toLowerCase().includes(searchValue));
    setFilteredList(filteredList);
  }, [searchValue]);

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

export default InitSubscripList;