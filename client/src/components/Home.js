import React, { Component } from 'react'
import GeosuggestWrapper from './GeosuggestWrapper'

class Home extends Component {
  state = {
    height: 0,
    mobileHeaderDisplay: ''
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    this.setState({ height: window.innerHeight })
  }

  onSuggestSelect = (location) => {
    if (location && location.label && location.label) {
      this.props.history.push({
        pathname: '/map',
        state: { latitude: location.location.lat, longitude: location.location.lng }
      })
    } else {
      this.props.history.push('/map')
    }
  }

  onFocus = () => this.setState({ mobileHeaderDisplay: 'none' })

  onBlur = () => this.setState({ mobileHeaderDisplay: '' })

  render() {
    return (
      <div className='home-bg' style={{ height: this.state.height }}>
        <header className='pt-5 mobile' style={{ display: this.state.mobileHeaderDisplay }}>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center'>
                <h1 className='home-header'>Serving residents of Metro Vancouver <br />Find a bus near you!</h1>
              </div>
            </div>
          </div>
        </header>
        <div className='container desktop' style={{ paddingTop: this.state.height / 2.5 }}>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='home-header'>Serving residents of Metro Vancouver <br />Find a bus near you!</h1>
            </div>
          </div>
          <GeosuggestWrapper onSuggestSelect={this.onSuggestSelect} />
        </div>
        <div className='container mobile' style={{ paddingTop: this.state.height / 10 }}>
          <GeosuggestWrapper onSuggestSelect={this.onSuggestSelect} onFocus={this.onFocus} onBlur={this.onBlur}/>
        </div>
      </div>
    )
  }
}

export default (Home)

