import React from 'react'
import SampleWrapped from "../higherordercomp/SampleWrappedComp";

const About = () => {
  return (
    <div className="container">
      <h4 className="center">About</h4>
      <p>This is the text for About.  The color will vary randomly on each load because</p>
      <p>this component is wrapped in another that contols the color.</p>
    </div>
  )
}

export default SampleWrapped(About);
