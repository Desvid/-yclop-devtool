import React from "react";
import './NodeReduction.less';
import { isObject } from "../../../util/typeCheck";


const NodeReduction = ({ node }) => {
  
  const isObjectNode = !!node && isObject(node);
  const nodeLength = !!node && Object.keys(node).length;
  const keys = nodeLength > 2 ? Object.keys(node).slice(0, 2) : Object.keys(node);
  

  return (
    <div className="node-reduction">
      <span className="node-reduction-start">{isObjectNode ? '{' : '['}</span>
      {isObjectNode ?
        <span className="node-reduction-keys">
          {keys && keys.map((key, id) => {
            const isUnnecessaryComma = nodeLength < 2 && id !== 1;
            return (
              <span className="key" key={id}>{key}: {JSON.stringify(node[key])}{isUnnecessaryComma ? '' : ','}</span>
            );
          })}
          {nodeLength > 2 && <span className="key" key={-1}>...</span>}
        </span>
        : <span>Array({node.length})</span>
      }
      <span className="node-reduction-end">{isObjectNode ? '}' : ']'}</span>
    </div>
  );
}

export default NodeReduction;