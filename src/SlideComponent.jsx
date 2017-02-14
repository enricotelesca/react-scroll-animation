'use strict'

import React, {Component} from 'react'
import AnimatedComponent from './AnimatedComponent.jsx'

class Slide extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollAnimator: null,
      index: -1
    }
    this.type = props.type

    this._getClonedElement = this._getClonedElement.bind(this)
    this._getSlideWrapper = this._getSlideWrapper.bind(this)
  }

  componentWillReceiveProps (props) {
    let newState = this.state
    if (props.scrollAnimator && !newState.scrollAnimator) {
      newState.scrollAnimator = props.scrollAnimator
    }
    newState.index = props.index
    this.setState(newState, () => {
      this.state.scrollAnimator.registerSlide(this.type, this.refs.slideWrapper, this.state.index)
      this.state.scrollAnimator.registerAnimatedElements(this.state.index, props.animatedRefs)
      this.state.scrollAnimator.registerTriggers(this.state.index, props.triggers)
    })
  }

  componentDidMount () {

  }

  render () {
    return this._getSlideWrapper(this.props.slideStyle)
  }

  _getClonedElement (item, index) {
    if (item.type.isAnimatedComponent) {
      return React.cloneElement(item, {ref: 'slideChild' + index, isStaticVersion: this.props.isStaticVersion})
    }
    return React.cloneElement(item)
  }

  _getSlideWrapper (style) {
    if (typeof style.transform === 'undefined') {
      style.transform = ''
    }
    style.transform += ' translateZ(0)'

    let commonStyles = {
      width: this.props.dimensions.containerWidth + 'px',
      height: (this.props.staticVersionSlideOffset) ? this.props.dimensions.containerHeight + this.props.staticVersionSlideOffset + 'px' : this.props.dimensions.containerHeight + 'px',
      OTransform: style.transform,
      WebkitTransform: style.transform,
      MsTransform: style.transform,
      MozTransform: style.transform,
      BackfaceVisibility: 'hidden',
      MozBackfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      WebkitPerspective: 1000,
      WebkitTransformStyle: 'preserve-3d',
      transition: 'transform 20ms ease-in-out',
      boxSizing: 'border-box',
      willChange: 'transform, display, z-index'
    }

    Object.assign(style, commonStyles)
    return (
      <div id={(this.props.id) ? this.props.id : 'slide-index-' + this.props.index} style={Object.assign({}, style, {backfaceVisibility: 'hidden'})} ref='slideWrapper' className='slide-wrapper'>
        <div style={{width: '100%', height: '100%', position: 'relative'}} >
          {
            React.Children.toArray(this.props.children).map(this._getClonedElement)
          }
        </div>
      </div>
    )
  }

  getWrapperElement () {
    return this.refs.slideWrapper
  }
}
const SlideComponent = AnimatedComponent(Slide)
export default SlideComponent
