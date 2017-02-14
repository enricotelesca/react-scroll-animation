/**
 * Created by enrico on 25/11/16.
 *
 * @TODO optimize with some flags, especially where style is tested
 */

'use strict'

import {scroll, dimensions} from './utils.js'

// Consts
const FILLING_STRING = '??'
const DIRECTION_UP = 'UP'
const DIRECTION_DOWN = 'DOWN'
const DIRECTION_FIXED = 'FIXED'

// Singleton
let instance = null

export default class ScrollAnimator {
  constructor (opts) {
    if (!instance) {
      this.offsetTop = 0
      this.heightFactor = 4
      this.scrollingStart = 2
      this.isStatic = false
      this.slides = opts.slides || []
      this.activeSlide = 100000000
      this.scrollProgress = 0
      this.setOpts(opts)
      this._render = this._render.bind(this)
      this._handleScroll = this._handleScroll.bind(this)
      window.addEventListener('scroll', this._handleScroll)
      window.addEventListener('hashchange', this._hashChanged.bind(this))
      this._mouseWheelHandler()
      instance = this
    }
    return instance
  }

  setOpts (opts) {
    this.offsetTop = opts.offsetTop || 0
    this.heightFactor = opts.heightFactor || 4
    this.scrollingStart = opts.scrollingStart || 2
    this.isStatic = opts.isStatic || false
    this.slides = opts.slides || []
    this.activeSlide = 100000000
    this.scrollProgress = 0
    this._render()
  }

  registerSlide (type, element, index) {
    this.slides[index] = {type: type, element: element, animatedElements: {}}
    this.activeSlide = 100000000
    this._render()
  }

  registerAnimatedElements (index, animatedElements) {
    this.slides[index].animatedElements = this._fillAnimatedElements(animatedElements)
    this.initAnimatedElementsAndTriggers(index)
  }

  registerTriggers (index, triggers) {
    this.slides[index].triggers = this._fillTriggers(triggers)
    this.initAnimatedElementsAndTriggers(index)
  }

  initAnimatedElementsAndTriggers (index) {
    if (index !== this.activeSlide) {
      let slideProgress = (index > this.activeSlide) ? 0 : 1
      let fakePrevProgress = (index > this.activeSlide) ? 1 : 0
      let fakeCurrProgress = (index > this.activeSlide) ? 0 : 1
      this._playTimeLine(index, slideProgress, this._detectDirection(fakePrevProgress, fakeCurrProgress))
    }
    this._render()
  }

  _handleScroll () {
    window.requestAnimationFrame(this._render)
  }

  _calcScrollProgress () {
    if (!this.isStatic) {
      return (scroll.y() - this.offsetTop) / (dimensions.y() * this.heightFactor)
    } else {
      return (scroll.y() - this.offsetTop) / (dimensions.y())
    }
  }

  _reverseProgress (progress) {
    if (!this.isStatic) {
      return progress * (dimensions.y() * this.heightFactor) + this.offsetTop
    } else {
      return progress * (dimensions.y()) + this.offsetTop
    }
  }

  _render (...args) {
    const scrollProgress = (args.length > 1) ? args[1] : this._calcScrollProgress()
    const newActiveSlide = Math.floor(scrollProgress)
    const slideProgress = scrollProgress - newActiveSlide

    if (newActiveSlide >= 0 && this.slides[newActiveSlide]) {
      this._playTimeLine(newActiveSlide, slideProgress, this._detectDirection(this.scrollProgress, scrollProgress))
      this._moveScrollingSlides(slideProgress, newActiveSlide)
      this.scrollProgress = scrollProgress
      if (newActiveSlide !== this.activeSlide) {
        if (this.slides[newActiveSlide] && this.slides[newActiveSlide].type === 'static') {
          this._updateStaticSlidesVisibility(newActiveSlide)
        }
        this._triggerSlideChanged(newActiveSlide)
        this.activeSlide = newActiveSlide
      }
    }
  }

  _triggerSlideChanged (newSlide) {
  }

  _fillTriggers (triggers) {
    for (let i = 0; i < triggers.length; i++) {
      triggers[i].triggered = false
      // normalize 0 - 100 in 0 - 1
      triggers[i].ntriggerAt = triggers[i].triggerAt / 100
      if (triggers[i].rewindAt >= 0) {
        triggers[i].nrewindAt = triggers[i].rewindAt / 100
      }
    }
    return triggers
  }

  _fillAnimatedElements (animatedElements) {
    let keys = Object.keys(animatedElements)
    keys.forEach(key => {
      if (animatedElements[key].animations instanceof Array) {
        animatedElements[key].animations.forEach(animation => {
          let props = Object.keys(animation.style)
          props.forEach(prop => {
            if (typeof animation.style[prop][0] === 'number') {
              animation.style[prop] = this._fillNumberAnimationProperty(animation.style[prop])
            }
            if (typeof animation.style[prop][0] === 'string') {
              animation.style[prop] = this._fillStringAnimationProperty(animation.style[prop])
            }
          })
          // normalize 0 - 100 in 0 - 1
          animation.nstart = animation.start / 100
          animation.nend = animation.end / 100
        })
        animatedElements[key].animations.sort((a, b) => {
          a.nend - b.nend
        })
      }
    })
    return animatedElements
  }

  _fillNumberAnimationProperty (animProp) {
    return {
      type: 'number',
      start: animProp[0],
      stop: animProp[1],
      current: animProp[0]
    }
  }

  _fillStringAnimationProperty (animProp) {
    return {
      type: 'string',
      start: animProp[0].match(/(?!3d)-{0,1}(\d\.\d+|\d+)/g).map(Number),
      stop: animProp[1].match(/(?!3d)-{0,1}(\d\.\d+|\d+)/g).map(Number),
      current: animProp[0].match(/(?!3d)-{0,1}(\d\.\d+|\d+)/g).map(Number),
      fillingString: animProp[0].replace(/(?!3d)-{0,1}(\d\.\d+|\d+)/g, FILLING_STRING)
    }
  }

  _detectDirection (oldProgress, newProgress) {
    if (oldProgress < newProgress) {
      return DIRECTION_DOWN
    }
    if (oldProgress > newProgress) {
      return DIRECTION_UP
    } else {
      return DIRECTION_FIXED
    }
  }

  _playTimeLine (activeSlide, slideProgress, direction) {
    // normalized scrolling start
    let nss = this.scrollingStart / this.heightFactor
    let animationSlideProgress = slideProgress
    if (activeSlide !== 0) {
      animationSlideProgress = ((slideProgress + nss) / (1 + nss))
      if (this.slides[activeSlide].type === 'static' && this.slides[activeSlide - 1].type === 'static') {
        animationSlideProgress = slideProgress
      }
    }
    this._animateSlide(activeSlide, animationSlideProgress, direction)
    this._fireTriggers(activeSlide, animationSlideProgress, direction)

    // animate following slide if visible
    if (this.slides[activeSlide + 1]) {
      let nextSlideAnimationProgress = slideProgress
      if (slideProgress >= nss) {
        nextSlideAnimationProgress = ((slideProgress - nss) / (1 + nss))
        if (!(this.slides[activeSlide].type === 'static' && this.slides[activeSlide + 1].type === 'static')) {
          this._animateSlide(activeSlide + 1, nextSlideAnimationProgress, direction)
          this._fireTriggers(activeSlide + 1, nextSlideAnimationProgress, direction)
        }
      } else {
        this._animateSlide(activeSlide + 1, 0, direction)
        this._fireTriggers(activeSlide + 1, 0, direction)
      }
    }
  }

  _fireTriggers (activeSlide, slideProgress, direction) {
    if (this.slides[activeSlide].triggers) {
      let triggers = this.slides[activeSlide].triggers
      for (let i = 0; i < triggers.length; i++) {
        if (triggers[i].ntriggerAt <= slideProgress && !triggers[i].triggered) {
          triggers[i].triggered = true
          triggers[i].triggerFunction()
        }
        if (triggers[i].nrewindAt >= 0 && triggers[i].rewindFunction && triggers[i].nrewindAt >= slideProgress && triggers[i].triggered) {
          triggers[i].triggered = false
          triggers[i].rewindFunction()
        }
      }
    }
  }

  /**
   * @TODO optimize this function
   */
  _animateSlide (slideIndex, x, direction) {
    let animatedElements = this.slides[slideIndex].animatedElements
    let animatedElementsKeys = Object.keys(animatedElements)
    animatedElementsKeys.forEach(aek => {
      if (animatedElements[aek].node.attributes.getNamedItem('data-animation').value !== 'false') {
        const _x = x
        const element = animatedElements[aek].node
        const animations = animatedElements[aek].animations
        // let currentStepIndex = -1
        const currentStep = animations.find((item, index) => {
          // currentStepIndex = index
          return item.nstart <= _x && item.nend >= _x
        })
        if (currentStep) {
          this._animateStep(element, currentStep, _x)
        }
      } else {
        this._applyInitialStyle(animatedElements[aek].initialStyle, animatedElements[aek].node)
      }
    })
  }

  _applyInitialStyle (initialStyle, element) {
    const props = Object.keys(initialStyle)
    props.forEach(prop => {
      if (element.style[prop] !== initialStyle[prop]) {
        element.style[prop] = initialStyle[prop]
      }
    })
  }

  _calcY (f, y0, y1, type, property) {
    if (type === 'number') {
      return (y0 + f * (y1 - y0)).toFixed(3)
    } else {
      return y0.map((_y0, i) => {
        let _y1 = y1[i]
        if (property.indexOf('olor') !== -1 && i < 3) {
          return Math.round((_y0 + f * (_y1 - _y0)))
        } else {
          return (_y0 + f * (_y1 - _y0))
        }
      })
    }
  }

  _valuesAreEqual (v1, v2) {
    let flag = true
    if (typeof v1 === 'string' || typeof v1 === 'number') {
      return v1 === v2
    } else {
      v1.map((_v1, i) => {
        if (_v1 !== v2[i]) flag = false
      })
      return flag
    }
  }

  _animateStep (element, currentStep, x) {
    const skeys = Object.keys(currentStep.style)
    const x0 = currentStep.nstart
    const x1 = currentStep.nend
    const f = (x - x0) / (x1 - x0)
    skeys.forEach(sk => {
      this._applyStyleToElement(element, sk, currentStep.style[sk], f)
    })
  }

  _applyStyleToElement (element, property, style, f) {
    const y0 = style.start
    const y1 = style.stop
    const y = this._calcY(f, y0, y1, style.type, property)
    /**
     * @TODO this is the optimized way to apply new style but buggy when currentSlide is 0 and progress is 0
     */
      // if (!this._valuesAreEqual(style.current, y))
      // this._applyNewStyleToElement(element, property, style, y)
    const newStyle = this._createNewStyle(style, y)
    if (!this._styleIsEqualToDomStyle(element, property, newStyle)) {
      this._applyNewComputedStyle(element, property, newStyle)
    }
  }

  _createNewStyle (style, y) {
    let newStyle = ''
    if (style.type === 'number') {
      newStyle = y
    }
    if (style.type === 'string') {
      newStyle = style.fillingString
      for (let i = 0; i < y.length; i++) {
        newStyle = newStyle.replace(FILLING_STRING, y[i])
      }
    }
    return newStyle
  }

  _styleIsEqualToDomStyle (element, property, style) {
    return element.style[property] === style
  }

  _applyNewStyleToElement (element, property, style, y) {
    let newStyle = this._createNewStyle(style, y)
    element.style[property] = newStyle
    style.current = y
  }

  _applyNewComputedStyle (element, property, newStyle) {
    element.style[property] = newStyle
  }

  _updateStaticSlidesVisibility (slideToDisplay) {
    if (!this.isStatic) {
      this.slides.forEach((item, index) => {
        // style is checked to avoid repaint (see @TODO at the top)
        /**
         * @TODO performances Safari iOS vs Firefox: iOS works better with z-index instead of display
         */
        if (item.type === 'static') {
          if (index === slideToDisplay) {
            if (item.element.style.zIndex !== 2) {
              item.element.style.zIndex = 2
            }
            item.element.style.opacity = 1
          } else {
            if (item.element.style.zIndex !== 1) {
              item.element.style.zIndex = 1
              item.element.style.opacity = 0
            }
          }
        }
      })
    }
  }

  _moveScrollingSlides (slideProgress, activeSlide) {
    if (!this.isStatic) {
      // normalized scrolling start
      const nss = this.scrollingStart / this.heightFactor
      // transition from prev slide to next slide
      if (this.slides[activeSlide + 1] && this.slides[activeSlide + 1].type === 'float') {
        if (slideProgress >= nss) {
          let amount = 100 - 100 * this._computeSlidingFactor(slideProgress, nss)
          this._applySlidingAmount(this.slides[activeSlide + 1], amount)
        } else {
          this._applySlidingAmount(this.slides[activeSlide + 1], 100)
        }
      }
      // scrolling slide is current slide
      // optimize with flags (see @TODO at the top)
      if (this.slides[activeSlide] && this.slides[activeSlide].type === 'float') {
        // preparing next visible slide to prevent glitches
        if (slideProgress >= 0 && slideProgress >= nss / 2) {
          this._updateStaticSlidesVisibility(activeSlide + 1)
        } else {
          this._updateStaticSlidesVisibility(activeSlide - 1)
        }
        // check if the current slide should start disappearing
        if (slideProgress >= 0 && slideProgress <= nss) {
          this._applySlidingAmount(this.slides[activeSlide], 0)
        } else {
          if (this.slides[activeSlide + 1]) {
            let amount = -100 * this._computeSlidingFactor(slideProgress, nss)
            this._applySlidingAmount(this.slides[activeSlide], amount)
          }
        }
      }
      // scrolling slide is previous slide
      if (this.slides[activeSlide - 1] && this.slides[activeSlide - 1].type === 'float') {
        this._applySlidingAmount(this.slides[activeSlide - 1], -100)
      }
    }
  }

  _applySlidingAmount (slide, amount) {
    let transform = 'translate3d(0,' + amount + '%,0) translateZ(0)'
    // style is checked to avoid repaint (see @TODO at the top)
    if (slide.element.style.transform !== transform) {
      slide.element.style.OTransform = transform
      slide.element.style.WebkitTransform = transform
      slide.element.style.MsTransform = transform
      slide.element.style.MozTransform = transform
      slide.element.style.transform = transform
    }
    /**
     * @TODO performances Safari iOS vs Firefox: iOS works better without this. Implement adaptive strategy.
     */
    /*
     if (amount === -100 || amount === 100)
     slide.element.style.display === 'none'
     else
     slide.element.style.display === 'block'
     */
  }

  _computeSlidingFactor (slideProgress, nss) {
    let factor = (slideProgress - nss) / (nss)
    if (factor > 1) {
      return 1
    }
    return Math.max(0, factor)
  }

  /**
   * @TODO
   * this piece of code is really ugly... provide a working functionality for navigating in page
   */
  _hashChanged (e) {
    const hash = window.location.href.split('/#')[1]
    const newSlideIndex = this.slides.findIndex(item => item.element.id === hash)
    if (newSlideIndex !== -1) {
      if (!this.isStatic) {
        if (this.activeSlide < newSlideIndex) {
          for (let i = 0; i < newSlideIndex; i++) {
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.25)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.50)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.75)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.999999)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (1)))
            this._render()
          }
          window.scrollTo(0, dimensions.y() * this.heightFactor * (newSlideIndex * 1.1))
          this._render()
        } else {
          for (let i = this.slides.length - 1; i > newSlideIndex; i--) {
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (1)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.75)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.50)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.25)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0.0000001)))
            this._render()
            window.scrollTo(0, dimensions.y() * this.heightFactor * (i + (0)))
            this._render()
          }
          window.scrollTo(0, dimensions.y() * this.heightFactor * (newSlideIndex * 1.1))
          this._render()
        }

        // this._scrollToY((dimensions.y()*this.heightFactor*newSlideIndex + 40),(500 * Math.abs(newSlideIndex - this.activeSlide) + 200))
      }
    }
  }

  /**
   * @TODO implement smooth scrolling wheel
   */
  _mouseWheelHandler () {
  }
}
