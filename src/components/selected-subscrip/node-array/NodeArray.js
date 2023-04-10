import React from "react";
import NodeRenderer from "../node-renderer/NodeRenderer";
import './NodeArray.less';


const NodeArray = ({
  nodeKeys,
  expandedKey,
  getNestedNodeState,
  getNestedHeight
}) => {

  return (
    <React.Fragment>
      {!!nodeKeys && nodeKeys.map((key, id) => (
        <span key={id} className={`node-content-key ${expandedKey === id ? "is-expanded" : ""}`}>
          {id}: <NodeRenderer
                    id={id}
                    node={key}
                    getNestedNodeState={getNestedNodeState}
                    isExpanded={expandedKey === id}
                    getNestedHeight={getNestedHeight}
                  />
        </span>
      ))}
    </React.Fragment>
  );
}

export default NodeArray;