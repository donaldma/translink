import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMapGL from 'react-map-gl'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getRouteGeoJSON } from '../actions'
import Constants from '../Constants'

const styles = theme => ({
  root: {}
})

class RouteMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewport: {
        latitude: 49.2827291,
        longitude: -123.12073750000002,
        zoom: 12,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight
      },
      routeId: props.match.params.routeId
    }
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()

    await this.props.getRouteGeoJSON(this.state.routeId)

    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: this.props.routeGeojsonReducer.latitude,
        longitude: this.props.routeGeojsonReducer.longitude,
      }
    })

    const map = await this.reactMap.getMap()
    console.log('MAP',map)
    await map.on('load', async () => {
      await map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": this.props.routeGeojsonReducer.geoJson
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#4285F4",
          "line-width": 4
        }
      })
    })
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


  render() {
    return (
      <div>
        <ReactMapGL
          ref={(reactMap) => { this.reactMap = reactMap }}
          {...this.state.viewport}
          onViewportChange={this.onViewportChange}
          mapboxApiAccessToken={Constants.mapboxToken}
          mapStyle='mapbox://styles/mapbox/streets-v9'
        />
      </div>
    )
  }

}

RouteMap.propTypes = {
  routeGeojsonReducer: PropTypes.object,
  getRouteGeoJSON: PropTypes.func
}

const mapDispatchToProps = {
  getRouteGeoJSON
}

const mapStateToProps = ({ routeGeojsonReducer }) => ({
  routeGeojsonReducer
})

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(RouteMap))