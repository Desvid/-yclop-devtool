import React from "react";
import './SubscripItem.less';
import Highlighter from "react-highlight-words";


const SubscripItem = ({ item, selectedItem, selectHandler, searchValue }) => (
  <div
    className={`subscription ${item.order === selectedItem.order ? 'active' : ''}`}
    onClickCapture={() => selectHandler(item)}
  >
    <Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={[searchValue]}
      autoEscape={true}
      textToHighlight={`${item.order}. ${item.topic}`}
    />
  </div>
);

export default SubscripItem;