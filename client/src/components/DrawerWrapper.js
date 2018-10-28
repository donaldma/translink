import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CardWrapper from './CardWrapper'
import AppbarWrapper from './AppbarWrapper'

const styles = theme => ({
  root: {}
})

class DrawerWrapper extends Component {

  render() {
    const { isDrawerOpen, toggleDrawer, busInfo } = this.props
    return (
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => toggleDrawer(false, undefined)}>
        {
          busInfo &&
          <div>
            <AppbarWrapper title='Bus Info' handleCick={() => toggleDrawer(false, undefined)} />
            <div className='p-3'>
              <CardWrapper icon='card_travel' title='Trip Id' text={busInfo.TripId} />
              <CardWrapper icon='directions_bus' title='Vehicle Number' text={busInfo.VehicleNo} />
              <CardWrapper icon='map' title='Route Number' text={busInfo.RouteNo} link={busInfo.RouteMap.Href} />
              <CardWrapper icon='directions' title='Direction' text={busInfo.Direction.charAt(0) + busInfo.Direction.slice(1).toLowerCase()} />
              <CardWrapper icon='place' title='Destination' text={busInfo.Destination} />
              <CardWrapper icon='access_time' title='Recorded Time' text={busInfo.RecordedTime} />
            </div>
          </div>
        }
      </Drawer>
    )
  }
}

DrawerWrapper.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  busInfo: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(DrawerWrapper)

