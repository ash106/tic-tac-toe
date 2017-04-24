import React from 'react';

const Square = (props, _railsContext) => (
  <button className={"square " + props.highlightClass} onClick={() => props.onClick()}>
    {props.value}
  </button>
);

export default Square;
