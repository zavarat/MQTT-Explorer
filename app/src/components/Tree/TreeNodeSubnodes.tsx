import * as React from 'react'
import * as q from '../../../../backend/src/Model'
import { withTheme, Theme } from '@material-ui/core/styles'
import { List, ListItem, Collapse } from '@material-ui/core'
import TreeNode from './TreeNode'

export interface Props {
  animateChanges: boolean
  treeNode: q.TreeNode
  autoExpandLimit: number
  collapsed?: boolean | undefined
  didSelectNode?: (node: q.TreeNode) => void
  toggleCollapsed: () => void
  theme: Theme
}

class TreeNodeSubnodes extends React.Component<Props, {}> {
  public render() {
    const edges = Object.values(this.props.treeNode.edges)
    const listItemStyle = {
      padding: '3px 8px 0px 8px',
    }

    const listStyle = {
      padding: '3px 8px 0px 8px',
    }

    if (edges.length > 0 && !this.props.collapsed) {
      const listItems = edges
        .map(edge => edge.target)
        .map(node => (
          <ListItem
            key={node.hash()}
            style={listItemStyle}
            button
          >
            <TreeNode
              animateChages={this.props.animateChanges}
              treeNode={node}
              didSelectNode={this.props.didSelectNode}
              autoExpandLimit={this.props.autoExpandLimit}
            />
          </ListItem>
        ))

      return <Collapse in={!this.props.collapsed} timeout="auto" unmountOnExit>
        <List style={listStyle}>{listItems}</List>
      </Collapse>
    }

    return null
  }
}

export default withTheme()(TreeNodeSubnodes)
