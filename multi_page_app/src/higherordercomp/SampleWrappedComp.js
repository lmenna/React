import React from 'react';

const SampleWrapped = (WrappedComponent) => {

  const colors = ['red', 'pink', 'orange', 'green', 'blue', 'violet'];
  const randomColor = colors[Math.floor(Math.random()*5)];
  const className = randomColor + '-text';

  return(props) => {
    return(
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    )
  }
}

export default SampleWrapped;
