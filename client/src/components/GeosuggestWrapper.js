/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Geosuggest from 'react-geosuggest'

class GeosuggestWrapper extends Component {
  render() {
    const { onSuggestSelect } = this.props
    return (
      <div className='row'>
        <div className='col-10 offset-1 col-lg-6 offset-lg-3'>
          <Geosuggest
            onSuggestSelect={onSuggestSelect}
            inputClassName='location-input'
            queryDelay={0}
            country='ca'
            types={['geocode']}
            ignoreTab={true}
            location={new google.maps.LatLng(49.2827291, -123.12073750000002)}
            radius='20'
          />
        </div>

      </div>
    )
  }
}

GeosuggestWrapper.propTypes = {
  onSuggestSelect: PropTypes.func.isRequired
}

export default (GeosuggestWrapper)