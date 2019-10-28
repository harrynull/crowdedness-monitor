import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function DensityProgressBar (props) {
  return (
    <LinearProgress
      style={{height: props.height}}
      variant="determinate"
      className={props.class}
      color={props.color}
      value={props.density}/>
  );
}
