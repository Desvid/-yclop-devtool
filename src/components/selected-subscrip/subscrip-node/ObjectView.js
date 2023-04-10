import React, { useEffect, useState } from "react";
import { isObject } from "../../../util/typeCheck";
import NodeArray from "../node-array/NodeArray";
import NodeHeader from "../node-header/NodeHeader";
import NodeObject from "../node-object/NodeObject";
import './ObjectView.less';


const ObjectView = ({ node, isExpanded, getNestedHeight }) => {
  const [isCollapsed, setCollapsedState] = useState(false);
  const [expandedKey, setExpandedKey] = useState(-1);
  const [nestedHeight, setNestedHeight] = useState(0);

  const nestedHeightChangeHandler = (value) => {
    setNestedHeight((prev) => value + prev);

    if (getNestedHeight) getNestedHeight(nestedHeight);
  }

  useEffect(() => {
    if (!!node) setCollapsedState(false);
  }, [node]);

  useEffect(() => {
    if (getNestedHeight) {
      const isObjectNode = isObject(node);
      const nodeKeys = (!!node && isObjectNode) ? Object.keys(node) : node;

      const nestedHeight = (isCollapsed && nodeKeys.length) ? nodeKeys.length * 18 : 0;
      getNestedHeight(nestedHeight);
    }
  }, [isCollapsed]);

  const clickNodeHandler = () => {
    setCollapsedState(!isCollapsed);
  }

  const isObjectNode = isObject(node);
  const nodeKeys = (!!node && isObjectNode) ? Object.keys(node) : node;

  const getNestedNodeState = (value) => setExpandedKey(value);
  const nodeStyles = {
    height: (isCollapsed && nodeKeys.length) ? ((nodeKeys.length + 1) * 18) + nestedHeight : 'inherit'
  }
  
  return (
    <div className="node" style={nodeStyles}>
      <NodeHeader
        node={node}
        isCollapsed={isCollapsed}
        clickNodeHandler={clickNodeHandler}
      />

      {(isCollapsed && !!nodeKeys.length) && <div className={`node-content ${isExpanded ? "is-expanded" : ""}`}>
        {isObjectNode
          ? <NodeObject
              node={node}
              nodeKeys={nodeKeys}
              expandedKey={expandedKey}
              getNestedNodeState={getNestedNodeState}
              getNestedHeight={nestedHeightChangeHandler}
            />
          : <NodeArray
              nodeKeys={nodeKeys}
              expandedKey={expandedKey}
              getNestedNodeState={getNestedNodeState}
              getNestedHeight={nestedHeightChangeHandler}
            />
        }
      </div>}
    </div>
  );
}

export default ObjectView;