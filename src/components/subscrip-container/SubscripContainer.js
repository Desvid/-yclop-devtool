import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowResize";
import './SubscripContainer.less';

import SelectedSubscrip from "../selected-subscrip/SelectedSubscrip";
import InitSubscripList from "./init-subscrip-list/InitSubscripList";
import { getType } from "../../util/typeCheck";
import NewSubscripList from "./new-subscrip-list/NewSubscripList";

const SubscripContainer = ({ list, searchValue }) => {
  const { width } = useWindowSize();
  const [leftDims, setLeftDims] = useState({ w: width/2 });
  const [rightDims, setRightDims] = useState({ w: width/2 });
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    setLeftDims({ w: width/2 });
    setRightDims({ w: width/2 });
  }, [width]);


  const [drag, setDrag] = useState({
    active: false,
    x: ""
  });

  const leftBoxStyle = {
    width: `${leftDims.w}px`
  };

  const rightBoxStyle = {
    width: `${rightDims.w}px`
  };

  const startResize = e => {
    setDrag({
      active: true,
      x: e.clientX
    });
  };

  const stopResize = () => {
    const { x } = drag;
    setDrag({ x, active: false });
  };

  const resizeFrame = e => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const newW = x > e.clientX ? leftDims.w - xDiff : leftDims.w + xDiff;
      
      setDrag({ active, x: e.clientX });
      setLeftDims({ w: newW });
      setRightDims({ w: width - newW });
    }
  };

  const selectHandler = (item) => {
    setSelectedItem(null);
    setTimeout(setSelectedItem(item), 100);
  }

  return (
    <div className="main-container" onMouseMoveCapture={resizeFrame} onMouseUpCapture={stopResize}>
      <div className="resizeble-container" style={leftBoxStyle}>
        <div className="resizeble-container-list">
          <div className="list-container">
            <InitSubscripList
              list={list}
              selectedItem={selectedItem}
              selectHandler={selectHandler}
              searchValue={searchValue}
            />
            <NewSubscripList
              selectedItem={selectedItem}
              selectHandler={selectHandler}
              searchValue={searchValue}
            />
          </div>
        </div>
        <button className="resizeble-container-btn" onMouseDownCapture={startResize}></button>
      </div>
      <div className="selected-content" style={rightBoxStyle}>
        {(selectedItem && getType(selectedItem.data) === "object" )
          && <SelectedSubscrip subscription={selectedItem.data} />
        }
      </div>
    </div>
  );
}

export default SubscripContainer;