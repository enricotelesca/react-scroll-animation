/**
 * Created by enrico on 24/11/16.
 */

/**
 * Created by enrico on 24/11/16.
 */

'use strict'

import React, {Component} from 'react'
import SlideComponent from './SlideComponent.jsx'

function FloatingSlideComponent () {
  return class extends Component {
    render () {
      const position = (this.props.isStaticVersion) ? 'relative' : 'fixed'
      const transform = (this.props.isStaticVersion) ? '' : 'translate3d(0px,100%,0px)'
      const style = Object.assign({},
        {
          transform: transform,
          position: position,
          zIndex: 100,
          top: '0px',
          left: '0px'
        },
        this.props.style)
      return <SlideComponent slideStyle={style} type='float' {...this.props} />
    }
  }
}

const FloatingSlide = FloatingSlideComponent()
export default FloatingSlide
