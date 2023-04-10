import React from "react";
import NodeRenderer from "../node-renderer/NodeRenderer";
import './NodeObject.less';


const NodeObject = ({
  node,
  nodeKeys,
  expandedKey,
  getNestedNodeState,
  getNestedHeight
}) => {

  return (
    <React.Fragment>
      {!!nodeKeys && nodeKeys.map((key, id) => (
        <span key={id} className={`node-content-key ${expandedKey === id ? "is-expanded" : ""}`}>
          {key}: <NodeRenderer
                    id={id}
                    node={node[key]}
                    getNestedNodeState={getNestedNodeState}
                    isExpanded={expandedKey === id}
                    getNestedHeight={getNestedHeight}
                  />
        </span>
      ))}
    </React.Fragment>
  );
}

export default NodeObject;