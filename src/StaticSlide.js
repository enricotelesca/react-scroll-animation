/**
 * Created by enrico on 24/11/16.
 */

'use strict'

import React, {Component} from 'react'
import SlideComponent from './SlideComponent.js'

function StaticSlideComponent () {
  return class extends Component {
    render () {
      let position = (this.props.isStaticVersion) ? 'relative' : 'fixed'
      let showStile = (this.props.isStaticVersion) ? {opacity: 1, zIndex: 2} : {}
      let style = Object.assign({},
        {
          position: position,
          top: '0px',
          left: '0px'
        },
        showStile,
        this.props.style)
      return <SlideComponent slideStyle={style} type='static' {...this.props} />
    }
  }
}

const StaticSlide = StaticSlideComponent()
export default StaticSlide
