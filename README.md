## react-scroll-animation library

This is a library for realizing animated slides with animated content as react components using CSS properties.

Animations are performed progressively with the page scroll.


Are supported all numeric CSS properties (such as rgb/rgba colors, transform, opacity, SVG properties...)

#Library is still under development and i'm writing the doc... Use it carefully...


[Live demo and some doc](http://getapper.com/demo)


[Example 1](http://getapper.com/)


Here's the project where the lib was born

[Example 2](https://eduscopio.it/percorso-studenti-scelta-scuola-superiore)


## Install
just clone the git repo where you prefer... Even if server-side rendering is possible, it is not currently possible to include it as npm module (see the roadmap)

### Import
```
import {AnimatedComponent, AnimatedSlidesContainer, StaticSlide, FloatingSlide} from '<checkout-path>react-scroll-animation'
```

## Usage
(See the demo code for details and examples)


Code a normal react component. For elements you want to animate add a ref and the attribute data-animation.

eg:
```
...
<span data-animation ref='colorAnim'>Color</span>
<br />
<span data-animation ref='opacityAnim'>Opacity</span>
...
```

Define your animations as an object.
the name of the object which defines an animation must be equal to the ref's value.

### Timeline:
• 0 represents the first instant in which a slide is displayed

• 100 represents the last instant in which a slide is displayed


Each element inside the slide is animated between those two values (start and end).

Currently a time/animation span for an element cannot cross any of its other time/animations spans


WRONG: start: 0, end: 50 ; start: 40, end 100

OK: start: 0, end: 50 ; start: 50, end 100


Inside the style array the initial and the end of the css animayed properties should be defined


eg:
```
const slideColorAnimations = {
       colorAnim: [
           {
               start:0,
               end: 100,
               style: {
                   color: ['rgba(192, 57, 43,1.0)', 'rgba(44, 62, 80,1.0)']
               }
           }
       ],
       opacityAnim: [
           {
               start:0,
               end: 50,
               style: {
                   opacity: [0,1]
               }
           },
           {
               start:50,
               end: 66,
               style: {
                   opacity: [1,1]
               }
           },
           {
               start:66,
               end: 100,
               style: {
                   opacity: [1,0]
               }
           },
       ]
   }
```

Using react HOC technique we get a new enhanced animated component

```
const AnimatedSlideColor = AnimatedComponent(SlideColor,slideColorAnimations)
```

Now the slides...

the prop heightFactor of AnimatedSlidesContainer represents the how much the user have to scroll (in terms of viewport height) before reach completely the following or preceding slide.

To understand the FloatingSlide and StaticSlide behaviour see the demo.
```
class Demo extends Component {
​
    render(){
        return(
            <div>
                <AnimatedSlidesContainer heightFactor={3} >
                    <FloatingSlide style={{backgroundColor: 'rgba(44, 62, 80,1.0)'}}>
                        <AnimatedSlideColor/>
                    </FloatingSlide>
                    {/*... other slides ...*/}
                    <StaticSlide style={{backgroundColor: 'rgba(22, 160, 133,1.0)'}}>
                        <AnimatedSlideSvg/>
                    </StaticSlide>
                    <FloatingSlide style={{backgroundColor: 'rgba(241, 196, 15,1.0)'}}>
                        <AnimatedSlideTransform/>
                    </FloatingSlide>
                </AnimatedSlidesContainer>
            </div>
        )
    }
}
```

#For the moment that's all folks...

### Roadmap

• npm module

• document nested animated components

• re-enable hidden features:

  - triggers

  - adaptive strategy for static vs animated version

  - force animate / stop animate for certain elements

  - dock feature / component

  - some minor features

• extend doc

• a lot of bug-fixing

• some performance improvements to test and include

• smooth mouse wheel plugin (?)


