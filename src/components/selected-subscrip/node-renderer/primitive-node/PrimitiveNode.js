import React from "react";
import './PrimitiveNode.less';
import { getType } from "../../../../util/typeCheck";

const StringNode = ({value}) => <span className="primitive-node-string">{JSON.stringify(value)}</span>

const BooleanNode = ({value}) => <span className="primitive-node-boolean">{JSON.stringify(value)}</span>

const NumberNode = ({value}) => <span className="primitive-node-number">{JSON.stringify(value)}</span>


const PrimitiveNode = ({ primitive }) => {
  
  const type = getType(primitive);

  const switchNode = (primitiveType) => {
    switch(primitiveType) {
      case "string":
        return <StringNode value={primitive} />;
      case "boolean":
        return <BooleanNode value={primitive} />;
      case "number":
        return <NumberNode value={primitive} />;
      default:
        return <span className="primitive-node-default">not-primitive</span>
    }
  }

  return (
    <div className="primitive-node">
      {type && switchNode(type)}
    </div>
  );
}

export default PrimitiveNode;