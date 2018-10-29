import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ReactMapGL, { Marker } from 'react-map-gl'
import Constants from '../Constants'
import { getBuses } from '../actions'
import DrawerWrapper from '../components/DrawerWrapper'
import GeosuggestWrapper from '../components/GeosuggestWrapper'

const styles = theme => ({
  root: {}
})

class Map extends Component {
  state = {
    viewport: {
      latitude: 49.2827291,
      longitude: -123.12073750000002,
      zoom: 13,
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
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

  onSuggestSelect = (location) => {
    console.log(location)
    if(location) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: location.location.lat,
          longitude: location.location.lng
        }
      })
    }
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={this.onViewportChange}
        mapboxApiAccessToken={Constants.mapboxToken}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <GeosuggestWrapper onSuggestSelect={this.onSuggestSelect} />
        <DrawerWrapper
          isDrawerOpen={this.state.isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
          busInfo={this.state.busInfo}
        />
        {
          this.props.busesReducer !== null && !this.props.busesReducer.error &&
          this.props.busesReducer.map(x => (
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
  busesReducer: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ]),
  getBuses: PropTypes.func
}

const mapDispatchToProps = {
  getBuses
}

const mapStateToProps = ({ busesReducer }) => ({
  busesReducer
})

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Map))