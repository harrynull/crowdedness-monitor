import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function DensityProgressBar (props) {
  return (
    <div>
      <LinearProgress
        variant="determinate"
        color={props.color}
        value={props.density}/>
    </div>
  );
}
