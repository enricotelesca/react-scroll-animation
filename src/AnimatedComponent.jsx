/**
 * Created by enrico on 22/11/16.
 */

'use strict'

import React, {Component} from 'react'
import {dimensions} from './utils.js'

const utilsDimensions = dimensions

export default function AnimatedComponent (WrappedComponent, animations = {}, triggers = []) {
  class AnimatedComponentWrapper extends Component {
    constructor (props) {
      super(props)
      this.type = ''
      this.animatedRefs = {}
      this.triggers = triggers
      this.animations = animations
      this.state = {
        dimensions: {
          containerHeight: props.height || '600px',
          containerWidth: props.width || '1024px'
        },
        animatedRefs: {}
      }
      /*
       if (this.props.triggers)
       this.triggers = this.triggers.concat(this.props.triggers)
       */
      if (this.props.animations) {
        this.animations = Object.assign({}, this.props.animations, this.animations)
      }
      this._updateAllDimensions = this._updateAllDimensions.bind(this)
      this._updateHorizontalDimension = this._updateHorizontalDimension.bind(this)
      this._handleResize = this._handleResize.bind(this)
    }

    componentDidMount () {
      this._createAnimatedRefsAndTriggers(this.props)
      this._updateAllDimensions()
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this._handleResize)
      }
    }

    render () {
      return <WrappedComponent {...this.props} ref='wrappedComponent' {...this.state} animatedRefs={this.state.animatedRefs} triggers={this.triggers} />
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.isStaticVersion !== this.props.isStaticVersion) {
        this._createAnimatedRefs(nextProps)
      }
    }

    _createAnimatedRefsAndTriggers (props) {
      this._createAnimatedRefs(props)
      this._createTriggers()
      this.setState({animatedRefs: this.animatedRefs})
    }

    _createAnimatedRefs (props) {
      Object.keys(this.refs.wrappedComponent.refs).map(item => {
        if (this.refs.wrappedComponent.refs[item] instanceof Component) {
          this._addICAnimatedRefs(item)
        }
        if (this.refs.wrappedComponent.refs[item].attributes && this.refs.wrappedComponent.refs[item].attributes.getNamedItem('data-animation')) {
          if (this.refs.wrappedComponent.refs[item].attributes.getNamedItem('data-animation').value !== 'animated') {
            this.refs.wrappedComponent.refs[item].attributes.getNamedItem('data-animation').value = !props.isStaticVersion
          }
          this.animatedRefs[item] = this.animatedRefs[item] || {node: null, animations: null}
          this.animatedRefs[item].node = this.refs.wrappedComponent.refs[item]
          this.animatedRefs[item].animations = this.animations[item]
          if (!this.animatedRefs[item].initialStyle) {
            this.animatedRefs[item].initialStyle = this._getElementNonAnimatedStyle(this.animations[item], this.animatedRefs[item].node)
          }
        }
      })
    }

    _getElementNonAnimatedStyle (animations, element) {
      let nonAnimatedStyle = {}
      animations.map(item => {
        let propKeys = Object.keys(item.style)
        propKeys.map(prop => {
          if (!nonAnimatedStyle[prop]) {
            nonAnimatedStyle[prop] = element.style[prop]
          }
        })
      })
      return nonAnimatedStyle
    }

    _createTriggers () {
      Object.keys(this.refs).map(item => {
        if (this.refs[item] instanceof Component) {
          this._addICTrigger(item)
        }
      })
    }

    _addICTrigger (icRef) {
      // let innerComponent = this.refs[icRef]
      // this.triggers = this.triggers.concat(innerComponent.triggers)
    }

    _addICAnimatedRefs (icRef) {
      let innerComponent = this.refs.wrappedComponent.refs[icRef]
      if (innerComponent.animatedRefs) {
        Object.keys(innerComponent.animatedRefs).forEach(item => {
          this.animatedRefs[icRef + (item.charAt(0).toUpperCase() + item.slice(1))] = innerComponent.animatedRefs[item]
        })
      }
    }

    _handleResize () {
      if (!this.props.isStaticVersion) {
        this._updateAllDimensions()
      } else {
        this._updateHorizontalDimension()
      }
    }

    _updateAllDimensions () {
      let dimensions = this.state.dimensions
      if (typeof window !== 'undefined') {
        dimensions.containerHeight = this.props.height || utilsDimensions.y()
        dimensions.containerWidth = this.props.width || utilsDimensions.x()
      }
      this.setState({dimensions: dimensions})
    }

    _updateHorizontalDimension () {
      let dimensions = this.state.dimensions

      if (typeof window !== 'undefined') {
        let newDimension = this.props.width || utilsDimensions.x()
        if (dimensions.containerWidth !== newDimension) {
          dimensions.containerWidth = newDimension
          this.setState({dimensions: dimensions})
        }
      }
    }
  }

  AnimatedComponentWrapper.isAnimatedComponent = true
  return AnimatedComponentWrapper
}
