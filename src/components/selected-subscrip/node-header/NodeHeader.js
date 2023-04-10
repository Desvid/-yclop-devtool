import React from "react";
import './NodeHeader.less';
import { getType } from "../../../util/typeCheck";
import NodeReduction from "../node-reduction/NodeReduction";


const NodeHeader = ({ node, isCollapsed, clickNodeHandler }) => {
  
  const nodeType = !!node ? getType(node) : null;

  return (
    <div className="node-header" onClickCapture={clickNodeHandler}>
      <div className={`node-collapse-arrow ${isCollapsed ? 'collapsed' : ''}`}>&#9666;</div>
      {(!!node && !isCollapsed) ? <NodeReduction node={node} /> : <span className="node-type">{nodeType}</span>}
    </div>
  );
}

export default NodeHeader;