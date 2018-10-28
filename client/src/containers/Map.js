import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import ReactMapGL, { Marker } from 'react-map-gl'
import Constants from '../Constants'
import { getBuses } from '../actions'
import CardWrapper from '../components/CardWrapper'
import AppbarWrapper from '../components/AppbarWrapper';

const styles = theme => ({
  root: {}
})

class Map extends Component {
  state = {
    viewport: {
      latitude: 49.2827291,
      longitude: -123.12073750000002,
      zoom: 14,
      bearing: 0,
      pitch: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    isDrawerOpen: false,
    busInfo: undefined,
    error: ''
  }

  componentWillMount() {
    this.props.getBuses()
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
    setInterval(this.props.getBuses, 20000)
  }

  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  onViewportChange = viewport => this.setState({ viewport })

  toggleDrawer = (open, busInfo) => {
    this.setState({
      isDrawerOpen: open,
      busInfo
    })
  }

  handleMarkerClick = (busInfo) => {
    this.toggleDrawer(true, busInfo)
  }

  renderBusInfo = () => {
    const { busInfo } = this.state
    return (
      <div>
        <AppbarWrapper title='Bus Info' handleCick={() => this.toggleDrawer(false, undefined)}/>
        <div className='p-3'>
          <CardWrapper icon='card_travel' title='Trip Id' text={busInfo.TripId} />
          <CardWrapper icon='directions_bus' title='Vehicle Number' text={busInfo.VehicleNo} />
          <CardWrapper icon='map' title='Route Number' text={busInfo.RouteNo} link={busInfo.RouteMap.Href}/>
          <CardWrapper icon='directions' title='Direction' text={busInfo.Direction.charAt(0) + busInfo.Direction.slice(1).toLowerCase()} />
          <CardWrapper icon='place' title='Destination' text={busInfo.Destination} />
          <CardWrapper icon='access_time' title='Recorded Time' text={busInfo.RecordedTime} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={Constants.mapboxToken}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Drawer anchor='left' open={this.state.isDrawerOpen} onClose={() => this.toggleDrawer(false, undefined)}>
          {this.state.busInfo && this.renderBusInfo()}
        </Drawer>
        {
          this.props.busesReducer !== null && this.props.busesReducer.map(x => (
            <Marker key={x.VehicleNo} latitude={x.Latitude} longitude={x.Longitude}>
              <div className='marker' onClick={() => this.handleMarkerClick(x)}></div>
            </Marker>
          ))
        }
      </ReactMapGL>
    )
  }
}

Map.propTypes = {
  busesReducer: PropTypes.array,
  getBuses: PropTypes.func
}

const mapDispatchToProps = {
  getBuses
}

const mapStateToProps = ({ busesReducer }) => ({
  busesReducer
})

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Map))