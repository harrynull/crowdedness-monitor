import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function DensityProgressBar () {
  const {classes} = this.props;
  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        color={this.props.color}
        value={this.props.density}/>
    </div>
  );
}
