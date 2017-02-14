/**
 * Created by enrico on 22/11/16.
 */

'use strict'

import React, {Component} from 'react'
import {AnimatedComponent, AnimatedSlidesContainer, StaticSlide, FloatingSlide} from '../dist/index.js'

class SlideTransform extends Component {
  render () {
    return (
      <div className='slide-wrapper'>
        <div className='slide-container'>
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#222'}}>Floating Slide</h2>
          <div className='simple-container'>
            <p>Object containing animations for the element with ref <strong>transfAnim</strong></p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const slideTransformAnimations = {<br />transfAnim: [{<br />start:0,<br />end: 50,<br />style: {<br />transform: [<br />\'rotateZ(0deg) translate3d(0%,-75%,0)\',<br /> \'rotateZ(0deg) translate3d(0%,25%,0)\'<br />]<br />}},<br />{<br /> start:50,<br />end: 100,<br />style: {<br />transform: [<br />\'rotateZ(0deg) translate3d(0%,0%,0)\',<br />\'rotateZ(180deg) translate3d(0%,0%,0)\'<br />]<br />}<br />}<br />]<br />}'}} />
            <br />
            <p>Element in the JSX</p>
            <pre className='prettyprint lang-html'>
              <span className='comment'>...</span><br />
              {'<h1 data-animation ref=\'transfAnim\'>Transform<br />Animation</h1>'}<br />
              <span className='comment'>...</span>
            </pre>
            <p>SlideTransform is a regular React component</p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const AnimatedSlideTransform =<br /> AnimatedComponent(SlideTransform,slideTransformAnimations)'}} />
          </div>
          <div className='simple-container'>
            <h1 data-animation ref='transfAnim'>Transform<br />Animation</h1>
          </div>
        </div>
      </div>
    )
  }
}

const slideTransformAnimations = {
  transfAnim: [{
    start: 0,
    end: 50,
    style: {
      transform: [
        'rotateZ(0deg) translate3d(0%,-75%,0)',
        'rotateZ(0deg) translate3d(0%,25%,0)'
      ]
    }},
    {
      start: 50,
      end: 100,
      style: {
        transform: [
          'rotateZ(0deg) translate3d(0%,0%,0)',
          'rotateZ(180deg) translate3d(0%,0%,0)'
        ]
      }
    }
  ]
}

const AnimatedSlideTransform = AnimatedComponent(SlideTransform, slideTransformAnimations)

class SlideColor extends Component {
  render () {
    return (
      <div className='slide-wrapper'>
        <div className='slide-container'>
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#222'}}>Static Slide</h2>
          <div className='simple-container'>
            <p>Object containing animations for the elements with refs <strong style={{color: '#222'}}>colorAnim</strong> and <strong style={{color: '#222'}}>opacityAnim</strong></p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const slideColorAnimations = {<br />    colorAnim: [<br />        {<br />            start:0,<br />            end: 100,<br />            style: {<br />                color: [\'rgba(192, 57, 43,1.0)\', \'rgba(44, 62, 80,1.0)\']<br />            }<br />        }<br />    ],<br />    opacityAnim: [<br />        {<br />            start:0,<br />            end: 100,<br />            style: {<br />                opacity: [0,1]<br />            }<br />        }<br />    ]<br />}<br />'}} />
            <br />
            <p>Elements in the JSX</p>
            <pre className='prettyprint lang-html'>
              <span className='comment'>...</span>
              <br />
              {'<h1 style={{fontSize: \'8rem\'}}>'}
              <br />
              {'<span data-animation ref=\'colorAnim\'>Color</span>'}
              <br />
              {'<br />'}
              <br />
              {'<span data-animation ref=\'opacityAnim\'>Opacity</span>'}
              <br />
              {'</h1>'}
              <span className='comment'>...</span>
            </pre>
            <p>SlideColor is a regular React component</p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const AnimatedSlideColor =<br /> AnimatedComponent(SlideColor,slideColorAnimations)'}} />
          </div>
          <div className='simple-container'>
            <h1 style={{fontSize: '8rem'}}>
              <span data-animation ref='colorAnim'>Color</span>
              <br />
              <span data-animation ref='opacityAnim'>Opacity</span>
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

const slideColorAnimations = {
  colorAnim: [
    {
      start: 0,
      end: 100,
      style: {
        color: ['rgba(192, 57, 43,1.0)', 'rgba(44, 62, 80,1.0)']
      }
    }
  ],
  opacityAnim: [
    {
      start: 0,
      end: 100,
      style: {
        opacity: [0, 1]
      }
    }
  ]
}

const AnimatedSlideColor = AnimatedComponent(SlideColor, slideColorAnimations)

class SlideBackgroundColor extends Component {
  render () {
    return (
      <div className='slide-wrapper' data-animation ref='bgColor'>
        <div className='slide-container'>
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#222'}}>Floating Slide</h2>
          <div className='simple-container'>
            <p>
              It's always the same...<br />
              First you create regular React component setting the attribute <br /><strong>data-animation</strong> and <strong>ref</strong> in the elements you want to animate.<br />
              <strong>Important:</strong> the value used in the <strong>ref</strong> should coincide to the property of the object defining the animation for that element.<br />
              Finally you use the function <strong>AnimatedComponent(MyComponentToAnimate,objectWithAnimations)</strong>
            </p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const slideBackgroundColorAnimations = {<br />    bgColor: [<br />        {<br />            start:0,<br />            end: 100,<br />            style: {<br />                backgroundColor: [\'rgba(155, 89, 182,1.0)\',\'rgba(44, 62, 80,1.0)\']<br />            }<br />        }<br />    ],<br />}'}} />
            <br />
            <pre className='prettyprint lang-html'>
              <span className='comment'>...</span>
              <br />
              {'<div className=\'slide-wrapper\' data-animation ref=\'bgColor\'>'}
              <br />
              <span className='comment'>...</span>
            </pre>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const AnimatedSlideBackgroundColor =<br /> AnimatedComponent(SlideBackgroundColor,slideBackgroundColorAnimations)'}} />
          </div>
          <div className='simple-container'>
            <h1><span>Background</span><br /><span>Color</span>
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

const slideBackgroundColorAnimations = {
  bgColor: [
    {
      start: 0,
      end: 100,
      style: {
        backgroundColor: ['rgba(155, 89, 182,1.0)', 'rgba(44, 62, 80,1.0)']
      }
    }
  ]
}

const AnimatedSlideBackgroundColor = AnimatedComponent(SlideBackgroundColor, slideBackgroundColorAnimations)

class SlideSvg extends Component {
  render () {
    return (
      <div className='slide-wrapper'>
        <div className='slide-container'>
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#222'}}>Static Slide</h2>
          <div className='simple-container'>
            <p>
              Use your fantasy... the library (should) animate all the numeric CSS properties: <br />
              colors in <strong>RGB/RGBA</strong>, <strong>transform</strong> (you can use matrixes for very nice effects), <strong>SVG</strong> properties...
            </p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const slideSvgAnimations = {<br />    svgAnim: [<br />        {<br />            start:0,<br />            end: 25,<br />            style: {<br />                strokeDashoffset: [1403, 1403],<br />                fillOpacity: [0,0],<br />            }<br />        },<br />        {<br />            start:25,<br />            end: 66,<br />            style: {<br />                strokeDashoffset: [1403, 0],<br />                fillOpacity: [0,1],<br />            }<br />        },<br />        {<br />            start:66,<br />            end: 100,<br />            style: {<br />                strokeDashoffset: [0, 0],<br />                fillOpacity: [1,1],<br />            }<br />        }<br />    ]<br />}'}} />
            <br />
            <pre className='prettyprint lang-html'>
              <span className='comment'>...</span>
              <br />
              {'<svg id=\'svg1\' data-animation ref=\'svgAnim\'>...</svg>'}
              <br />
              <span className='comment'>...</span>
            </pre>
          </div>
          <div className='simple-container'>
            <h1 style={{position: 'absolute', marginTop: '-290px'}}><span>Svg</span></h1><br />
            <svg id='svg1' data-animation ref='svgAnim'>
              <path fill='none' stroke='#ffffff' strokeWidth='20' strokeLinejoin='round' strokeMiterlimit='10' d='M390.7,532.8v58.6h-186 v-58.6 M483.7,354.4v102.3c0,41-33.4,74.4-74.4,74.4H186c-41,0-74.4-33.4-74.4-74.4v-86.2 M482.3,374.4c0-46,20-120.9-54.4-120.9 c-69.2,0-148.8,37.2-223.2,37.2c-37.2,0-45.8-5.3-64.4-14.6c0,74.4-35.2,107.6-35.2,107.6s-30.6-25.2-30.6-74.4 c0-114.7,98.1-204.6,223.2-204.6s223.2,89.9,223.2,204.6C520.9,365.1,482.3,374.4,482.3,374.4z' />
              <circle fill='#ffffff' cx='363.4' cy='365.1' r='15.6' />
              <path fill='none' stroke='#ffffff' strokeWidth='20' strokeMiterlimit='10' d='M216.7,433' />
              <path fill='none' stroke='#ffffff' strokeWidth='20' strokeLinecap='round' strokeMiterlimit='10' d='M234.5,446.1 c15.2,19.5,38.2,30.6,63.2,30.6s48-11.2,63.2-30.6' />
              <g display='none'>
                <g display='inline'>
                  <path d='M92.3,393c-2.7-0.2-5.2-1.6-6.8-3.8c-0.8-1.1-20.4-28.3-20.4-79.9c0-120,102.1-213.9,232.5-213.9 c130.4,0,232.5,94,232.5,213.9c0,58.6-19.8,71.4-23.7,73.4c-1.3,0.7-2.7,1-4.2,1c-1.7,0-3.4-0.5-4.9-1.4c-2.7-1.7-4.4-4.7-4.4-7.9 c0-58.8-5-111.6-65.1-111.6c-32.9,0-68.1,8.7-105.4,17.8c-38.8,9.5-78.8,19.4-117.8,19.4c-30.7,0-49.6-6.1-65.6-13.3 c-4.4,67.7-37.9,102.1-39.5,103.6c-1.8,1.7-4.1,2.7-6.6,2.7C92.8,393,92.5,393,92.3,393z' />
                  <path d='M297.6,104.7c125.2,0,223.2,89.9,223.2,204.6c0,55.8-18.6,65.1-18.6,65.1c0-46,0-120.9-74.4-120.9 c-69.2,0-148.8,37.2-223.2,37.2c-37.2,0-55.8-9.3-74.4-18.6c0,74.4-37.2,111.6-37.2,111.6s-18.6-25.2-18.6-74.4 C74.4,194.6,172.5,104.7,297.6,104.7 M297.6,86.1C162,86.1,55.8,184.2,55.8,309.3c0,53.7,20,82.4,22.2,85.4 c3.2,4.4,8.2,7.1,13.6,7.5c0.5,0,0.9,0.1,1.4,0.1c4.9,0,9.7-1.9,13.2-5.4c1.5-1.5,33.3-34,41-96.8c14.5,5.3,32.4,9.2,57.5,9.2 c40.1,0,80.8-10,120.1-19.6c36.7-9,71.4-17.6,103.2-17.6c46.9,0,55.8,36,55.8,102.3c0,6.4,3.3,12.4,8.8,15.8 c3,1.8,6.4,2.8,9.8,2.8c2.8,0,5.7-0.7,8.3-2c6.8-3.4,28.9-19.3,28.9-81.7C539.5,184.2,433.2,86.1,297.6,86.1L297.6,86.1z' />
                </g>
              </g>
              <path fill='none' stroke='#ffffff' strokeWidth='20' strokeLinejoin='round' strokeMiterlimit='10' d='M390.7,588.4' />
              <path fill='none' stroke='#ffffff' strokeWidth='20' strokeMiterlimit='10' d='M260.4,588.4' />
              <circle fill='#ffffff' cx='226.2' cy='365.1' r='15.6' />
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

const slideSvgAnimations = {
  svgAnim: [
    {
      start: 0,
      end: 25,
      style: {
        strokeDashoffset: [1403, 1403],
        fillOpacity: [0, 0]
      }
    },
    {
      start: 25,
      end: 66,
      style: {
        strokeDashoffset: [1403, 0],
        fillOpacity: [0, 1]
      }
    },
    {
      start: 66,
      end: 100,
      style: {
        strokeDashoffset: [0, 0],
        fillOpacity: [1, 1]
      }
    }
  ]
}

const AnimatedSlideSvg = AnimatedComponent(SlideSvg, slideSvgAnimations)

class SlideParallax extends Component {
  render () {
    return (
      <div className='slide-wrapper'>
        <div className='slide-container'>
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#222'}}>Floating Slide</h2>
          <div className='simple-container'>
            <p style={{color: '#333'}}>
              Finally remember that 0 represents the first moment when the slide is viewable and 100 the last before disappearing.<br />
              You don't need to alternate StaticSlides and FloatingSlides. You can use them in the order you prefer
            </p>
            <pre className='prettyprint lang-js' dangerouslySetInnerHTML={{__html: 'const slideColorAnimations = {<br /> colorAnim: [<br /> {<br /> start:0,<br />            end: 100,<br />            style: {<br />                color: [\'rgba(192, 57, 43,1.0)\', \'rgba(44, 62, 80,1.0)\']<br />            }<br />        }<br />    ],<br />    opacityAnim: [<br />        {<br />            start:0,<br />            end: 100,<br />            style: {<br />opacity: [0,1]<br />}<br />}<br />]<br />}<br />'}} />
            <br />
            <pre className='prettyprint lang-html'>
              <span className='comment'>...</span>
              <br />
              {'<span data-animation ref=\'par1\'>Parallax</span>'}
              <br />
              {'<span data-animation ref=\'par2\'>Parallax</span>'}
              <br />
              {'<br />'}
              <br />
              {'<span data-animation ref=\'par3\'>Parallax</span>'}
              <br />
              {'</h1>'}
              <span className='comment'>...</span>
            </pre>
          </div>
          <div className='simple-container'>
            <div style={{position: 'relative'}}>
              <h1 className='specialTitle'>
                <span data-animation ref='par1'>Parallax</span>
                <span data-animation ref='par2'>Parallax</span>
                <span data-animation ref='par3'>Parallax</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const slideParallaxAnimations = {
  par1: [
    {
      start: 0,
      end: 100,
      style: {
        transform: ['translate3d(0%,-180%,0)', 'translate3d(0%,180%,0)']
      }
    }
  ],
  par2: [
    {
      start: 0,
      end: 100,
      style: {
        transform: ['translate3d(0%,-100%,0)', 'translate3d(0%,100%,0)']
      }
    }
  ],
  par3: [
    {
      start: 0,
      end: 100,
      style: {
        transform: ['translate3d(0%,-50%,0)', 'translate3d(0%,50%,0)']
      }
    }
  ]
}

const AnimatedSlideSlideParallax = AnimatedComponent(SlideParallax, slideParallaxAnimations)

class SlideIntro extends Component {
  render () {
    return (
      <div className='slide-wrapper'>
        <div className='slide-container'>
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#ccc'}}>react-scroll-animation</h2>
          <div className='simple-container'>
            <div data-animation ref='left' dangerouslySetInnerHTML={{__html: '<div class="CodeMirror-lines"><div style="position: relative; outline: none;"><div class="CodeMirror-measure"></div><div class="CodeMirror-measure"></div><div style="position: relative; z-index: 1;"></div><div class="CodeMirror-cursors" style="visibility: hidden;"><div class="CodeMirror-cursor" style="left: 142.641px; top: 325px; height: 13px;">&nbsp;</div></div><div class="CodeMirror-code     "><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">1</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-keyword">import</span> <span class="cm-variable">React</span>, {<span class="cm-variable">Component</span>} <span class="cm-variable">from</span> <span class="cm-string">\'react\'</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">2</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-keyword">import</span> {<span class="cm-variable">AnimatedComponent</span>, <span class="cm-variable">AnimatedSlidesContainer</span>, </span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">3</div></div><pre class=""><span style="padding-right: 0.1px;">        <span class="cm-variable">StaticSlide</span>, <span class="cm-variable">FloatingSlide</span>} <span class="cm-keyword">from</span> <span class="cm-string">\'react-scroll-animation\'</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">4</div></div><pre class=""><span style="padding-right: 0.1px;">  </span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">5</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-keyword">class</span> <span class="cm-variable">Demo</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">6</div></div><pre class=""><span style="padding-right: 0.1px;"><span>&#8203;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">7</div></div><pre><span style="padding-right: 0.1px;">    <span class="cm-property">constructor</span>(props){</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">8</div></div><pre class=""><span style="padding-right: 0.1px;">        <span class="cm-keyword">super</span>(props)</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">9</div></div><pre class=""><span style="padding-right: 0.1px;">    }</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">10</div></div><pre class=""><span style="padding-right: 0.1px;"><span>&#8203;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">11</div></div><pre><span style="padding-right: 0.1px;">    <span class="cm-property">render</span>(){</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">12</div></div><pre class=""><span style="padding-right: 0.1px;">        <span class="cm-keyword">return</span>(</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">13</div></div><pre class=""><span style="padding-right: 0.1px;">            <span class="cm-operator">&lt;</span><span class="cm-variable">div</span><span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">14</div></div><pre><span style="padding-right: 0.1px;">                <span class="cm-operator">&lt;</span><span class="cm-variable">AnimatedSlidesContainer</span> <span class="cm-variable">heightFactor</span><span class="cm-operator">=</span>{<span class="cm-number">3</span>} <span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">15</div></div><pre class=""><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-variable">FloatingSlide</span> <span class="cm-variable">style</span><span class="cm-operator">=</span>{{<span class="cm-variable">backgroundColor</span>: <span class="cm-string">\'rgba(44, 62, 80,1.0)\'</span>}}<span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">16</div></div><pre class=""><span style="padding-right: 0.1px;">                        <span class="cm-operator">&lt;</span><span class="cm-variable">SlideIntro</span><span class="cm-operator">/&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">17</div></div><pre class=""><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-string-2">/FloatingSlide&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">18</div></div><pre><span style="padding-right: 0.1px;">          <span class="cm-tab">  </span><span class="cm-tab">    </span><span class="cm-tab">    </span>{<span class="cm-comment">/*... other slides ...*/</span>}</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">19</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-variable">StaticSlide</span> <span class="cm-variable">style</span><span class="cm-operator">=</span>{{<span class="cm-variable">backgroundColor</span>: <span class="cm-string">\'rgba(22, 160, 133,1.0)\'</span>}}<span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">20</div></div><pre><span style="padding-right: 0.1px;">                        <span class="cm-operator">&lt;</span><span class="cm-variable">AnimatedSlideSvg</span><span class="cm-operator">/&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">21</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-string-2">/StaticSlide&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">22</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-variable">FloatingSlide</span> <span class="cm-variable">style</span><span class="cm-operator">=</span>{{<span class="cm-variable">backgroundColor</span>: <span class="cm-string">\'rgba(241, 196, 15,1.0)\'</span>}}<span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">23</div></div><pre><span style="padding-right: 0.1px;">                        <span class="cm-operator">&lt;</span><span class="cm-variable">AnimatedSlideTransform</span><span class="cm-operator">/&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">24</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-string-2">/FloatingSlide&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">25</div></div><pre><span style="padding-right: 0.1px;">                <span class="cm-operator">&lt;</span><span class="cm-string-2">/AnimatedSlidesContainer&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">26</div></div><pre><span style="padding-right: 0.1px;">            <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">27</div></div><pre><span style="padding-right: 0.1px;">        )</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">28</div></div><pre><span style="padding-right: 0.1px;">    }</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">29</div></div><pre><span style="padding-right: 0.1px;">}</span></pre></div></div></div></div>'}} />
          </div>
          <div className='simple-container'>
            <div data-animation ref='right' dangerouslySetInnerHTML={{__html: '<div class="CodeMirror-lines"><div style="position: relative; outline: none;"><div class="CodeMirror-measure"></div><div class="CodeMirror-measure"></div><div style="position: relative; z-index: 1;"></div><div class="CodeMirror-cursors"><div class="CodeMirror-cursor" style="left: 471.391px; top: 351px; height: 13px;">&nbsp;</div></div><div class="CodeMirror-code        "><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">1</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-keyword">class</span> <span class="cm-variable">SlideTransform</span> <span class="cm-keyword">extends</span> <span class="cm-variable">Component</span> {</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">2</div></div><pre class=""><span style="padding-right: 0.1px;">    <span class="cm-property">constructor</span>(<span class="cm-def">props</span>) {</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">3</div></div><pre class=""><span style="padding-right: 0.1px;">        <span class="cm-keyword">super</span>(<span class="cm-variable-2">props</span>)</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">4</div></div><pre class=""><span style="padding-right: 0.1px;">    }</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">5</div></div><pre class=""><span style="padding-right: 0.1px;"><span>&#8203;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">6</div></div><pre class=""><span style="padding-right: 0.1px;">    <span class="cm-property">render</span>() {</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">7</div></div><pre class=""><span style="padding-right: 0.1px;">        <span class="cm-keyword">return</span> (</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">8</div></div><pre class=""><span style="padding-right: 0.1px;">            <span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable">className</span><span class="cm-operator">=</span><span class="cm-string">\'slide-wrapper\'</span><span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">9</div></div><pre class=""><span style="padding-right: 0.1px;">                <span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable">className</span><span class="cm-operator">=</span><span class="cm-string">\'slide-container\'</span><span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">10</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-variable">h2</span><span class="cm-operator">&gt;</span><span class="cm-variable">Floating</span> <span class="cm-variable">Slide</span><span class="cm-operator">&lt;</span><span class="cm-string-2">/h2&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">11</div></div><pre class=""><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable">className</span><span class="cm-operator">=</span><span class="cm-string">\'simple-container\'</span><span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">12</div></div><pre><span style="padding-right: 0.1px;">          <span class="cm-tab">  </span><span class="cm-tab">    </span><span class="cm-tab">    </span>{<span class="cm-comment">/*... content ...*/</span>}</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">13</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">14</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-variable">div</span> <span class="cm-variable">className</span><span class="cm-operator">=</span><span class="cm-string">\'simple-container\'</span><span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">15</div></div><pre class=""><span style="padding-right: 0.1px;">                        <span class="cm-operator">&lt;</span><span class="cm-variable">h1</span> <span class="cm-variable">data</span><span class="cm-operator">-</span><span class="cm-variable">animation</span> <span class="cm-variable">ref</span><span class="cm-operator">=</span><span class="cm-string">\'transfAnim\'</span><span class="cm-operator">&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">16</div></div><pre class=""><span style="padding-right: 0.1px;">          <span class="cm-tab">  </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-variable">Transform</span><span class="cm-operator">&lt;</span><span class="cm-variable">br</span><span class="cm-operator">/&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">17</div></div><pre class=""><span style="padding-right: 0.1px;">          <span class="cm-tab">  </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-variable">Animation</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">18</div></div><pre><span style="padding-right: 0.1px;">          <span class="cm-tab">  </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-tab">    </span><span class="cm-operator">&lt;</span><span class="cm-string-2">/h1&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">19</div></div><pre><span style="padding-right: 0.1px;">                    <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">20</div></div><pre><span style="padding-right: 0.1px;">                <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">21</div></div><pre><span style="padding-right: 0.1px;">            <span class="cm-operator">&lt;</span><span class="cm-string-2">/div&gt;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">22</div></div><pre><span style="padding-right: 0.1px;">        )</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">23</div></div><pre><span style="padding-right: 0.1px;">    }</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">24</div></div><pre><span style="padding-right: 0.1px;">}</span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">25</div></div><pre class=""><span style="padding-right: 0.1px;"><span>&#8203;</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">26</div></div><pre><span style="padding-right: 0.1px;"><span class="cm-comment">// see in the next slide how \'slideTransformAnimations\' is made</span></span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">27</div></div><pre class=""><span style="padding-right: 0.1px;"><span class="cm-keyword">const</span> <span class="cm-variable">AnimatedSlideTransform</span> <span class="cm-operator">=</span> </span></pre></div><div style="position: relative;"><div class="CodeMirror-gutter-wrapper" style="position: absolute; left: -25px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 16px;">28</div></div><pre class=""><span style="padding-right: 0.1px;">      <span class="cm-variable">AnimatedComponent</span>(<span class="cm-variable">SlideTransform</span>,<span class="cm-variable">slideTransformAnimations</span>)</span></pre></div></div></div></div>'}} />
          </div>
          <div ref='bottom' data-animation style={{display: 'block', width: '100%', color: 'white', fontSize: '18px', textAlign: 'center', lineHeight: '1.2'}}>
            Please note the <strong>data-animation</strong> attribute and the <strong>ref</strong>, which must be equal to the name of the property defining the animations in the animations' object. See in the next slide how slideTransformAnimations is made. The library uses the <strong>React's HOC</strong> tecnique to make components animated
          </div><br />
          <h2 style={{display: 'block', width: '100%', textAlign: 'center', color: '#222', marginTop: '20px'}}>scroll...</h2>
        </div>
      </div>
    )
  }
}

const slideIntroAnimations = {
  left: [
    {
      start: 10,
      end: 100,
      style: {
        transform: ['translate3d(0%,0%,0)', 'translate3d(-30%,0%,0)'],
        opacity: [1, 0.5]
      }
    }
  ],
  right: [
    {
      start: 10,
      end: 100,
      style: {
        transform: ['translate3d(0%,0%,0)', 'translate3d(30%,0%,0)'],
        opacity: [1, 0.5]
      }
    }
  ],
  bottom: [
    {
      start: 5,
      end: 100,
      style: {
        transform: ['translate3d(0%,0%,0)', 'translate3d(0%,50%,0)'],
        opacity: [1, 0.5]
      }
    }
  ]
}

const AnimatedSlideIntro = AnimatedComponent(SlideIntro, slideIntroAnimations)

class Demo extends Component {
  render () {
    return (
      <div>
        <AnimatedSlidesContainer heightFactor={3}>
          <FloatingSlide style={{backgroundColor: 'rgba(44, 62, 80,1.0)'}}>
            <AnimatedSlideIntro />
          </FloatingSlide>
          <FloatingSlide style={{backgroundColor: '#e74c3c'}}>
            <AnimatedSlideTransform />
          </FloatingSlide>
          <StaticSlide style={{backgroundColor: '#e67e22'}}>
            <AnimatedSlideColor />
          </StaticSlide>
          <FloatingSlide style={{backgroundColor: 'rgba(41, 128, 185,1.0)'}}>
            <AnimatedSlideBackgroundColor />
          </FloatingSlide>
          <StaticSlide style={{backgroundColor: 'rgba(22, 160, 133,1.0)'}}>
            <AnimatedSlideSvg />
          </StaticSlide>
          <FloatingSlide style={{backgroundColor: 'rgba(241, 196, 15,1.0)'}}>
            <AnimatedSlideSlideParallax />
          </FloatingSlide>
        </AnimatedSlidesContainer>
      </div>
    )
  }
}

export default Demo
