import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
}

class AppbarWrapper extends Component {
  render() {
    const { classes, title, handleCick } = this.props

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography color='inherit' className={classes.grow}>
              {title}
            </Typography>
            {
              handleCick &&
              <IconButton color='inherit' aria-label='Close' onClick={handleCick}>
                <Icon>close</Icon>
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

AppbarWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func
}

export default withStyles(styles)(AppbarWrapper)