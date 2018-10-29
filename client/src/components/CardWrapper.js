import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  root: {},
  card: {
    minWidth: 275,
    marginBottom: '2rem',
    borderRadius: 0
  },
  title: {
    fontSize: 14,
  }
})

class CardWrapper extends Component {

  render() {
    const { classes, icon, title, text, link } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className='row'>
            <div className='col-2 text-center'>
              <div className='vert-align'>
                <Icon>{icon}</Icon>
              </div>
            </div>
            <div className='col-10'>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography component="p">
                {
                  link ?
                    <Link to={`/route/${text}`} target='_blank'>{text}</Link>
                    : text
                }
              </Typography>

            </div>

          </div>
        </CardContent>
      </Card>
    )
  }
}

CardWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  link: PropTypes.bool
}

export default withStyles(styles, { withTheme: true })(CardWrapper)

