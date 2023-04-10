import React from "react";
import { isPrimitive } from "../../../util/typeCheck";
import PrimitiveNode from "./primitive-node/PrimitiveNode";
import SubscriptionNode from "../subscrip-node/ObjectView";
import './NodeRenderer.less';


const NodeRenderer = ({
  id,
  node,
  getNestedNodeState,
  isExpanded,
  getNestedHeight
}) => {
  
  const isPrimitiveNode = isPrimitive(node);
  
  return (
    <div className="node-renderer" onClickCapture={() => getNestedNodeState(id)}>
      {isPrimitiveNode
        ? <PrimitiveNode primitive={node} />
        : <SubscriptionNode node={node} isExpanded={isExpanded} getNestedHeight={getNestedHeight} />}
    </div>
  );
}

export default NodeRenderer;