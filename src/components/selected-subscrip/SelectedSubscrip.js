import React from "react";
import SubscriptionNode from "./subscrip-node/ObjectView";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { isObject, isArray, isPrimitive } from "../../util/typeCheck";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => {
  debugger
  return {
    color: 'black',
    [`& .${treeItemClasses.content}`]: {
      color: 'black',
      fontWeight: '100%',
      padding: '0',
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, transparent)`,
        color: 'var(--tree-view-color)',
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
        padding: '0'
      },
    },
    [`& .MuiCollapse-root`]: {
      paddingLeft: '.6rem'
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 0,
    },
    [`& .MuiTreeItem-content.Mui-expanded .MuiTreeItem-label .MuiTypography-caption`]: {
      display: 'none'
    }
  }
});

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />

          <Typography
            className="class-test"
            variant="body2"
            sx={{
              fontWeight: 'content',
              paddingRight: '2px',
              color: '#0441c9'
            }}
          >
            {labelText}
          </Typography>

          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>

        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}



const SelectedSubscrip = ({ subscription }) => {

  const getPropValuePreview = (propValue) => {
    switch(true) {
      case isObject(propValue): {
        const keys = Object.keys(propValue);

        const value = keys.reduce((acc, key, index) => {
          if (index > 2) {
            acc.push(`${key}:`);
            acc.push(`${typeof propValue[key]},`);
          }
          
          return acc;
        }, []);
        if (keys.length > 2) {
          value.push('...');
        }
        value.unshift('{');
        value.push('}');

        return value.join(' ');
      }
      case isArray(propValue): {
        return `Array(${propValue.length})`
      }
      default: {
        return `${propValue}`;
      }
    }
  }

  const getTreeChildren = (item, parentId) => {
    let children;
    if (isObject(item) && Object.keys(item).length) {

      children = Object.keys(item).map((key, index) => {
        const propValue = getPropValuePreview(item[key]);
  
        return Object.assign({
          id: `${parentId}.${index + 1}`,
          propName: `${key}:`,
          propValue,
          children: isObject(item[key]) || isArray(item[key]) ? getTreeChildren(item[key], `${parentId}.${index + 1}`) : []
        });
      });
    }

    if (isArray(item) && item.length) {
      children = item.map((key, index) => {
        const propValue = getPropValuePreview(key);
  
        return Object.assign({
          id: `${parentId}.${index + 1}`,
          propName: `${index}:`,
          propValue,
          children: isObject(item[key]) || isArray(item[key]) ? getTreeChildren(item[key], `${parentId}.${index + 1}`) : []
        });
      }); 
    }

    return children
  }

  const transformToTree = (object) => {
    return Object.assign({}, {
      id: 'root',
      propName: '',
      propValue: '',
      children: getTreeChildren(object, 1)
    })
  }

  const datatest = transformToTree(subscription);
  // debugger
  const renderTree = (nodes) => (
    <StyledTreeItem
      nodeId={nodes.id}
      labelText={nodes.propName}
      labelInfo={nodes.propValue}
    >
      {Array.isArray(nodes?.children)
        ? nodes?.children?.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflow: 'hidden' }}
    >
      {renderTree(datatest)}
    </TreeView>
  );
}

export default SelectedSubscrip;