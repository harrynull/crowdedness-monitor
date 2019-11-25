import React, {Component} from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart
} from 'recharts';

function myFormatter (value, name) {
  return name.localeCompare("Density") && name.localeCompare("Prediction") ? value : value + "%";
}

export default class TrendChart extends Component {

  render () {
    return (
      <React.Fragment>
        <ResponsiveContainer>
          <BarChart
            data={this.props.data}
            margin={{top: 30, bottom: 0, left: 20,}}
          >
            <XAxis dataKey="time"/>
            <YAxis hide={true} type="number" domain={[0, 100]}/>
            <CartesianGrid vertical={false} stroke="#e0e0e0"/>
            <Tooltip formatter={myFormatter}/>
            <Bar type="monotone" dataKey="Density" fill="#556CD6"/>
            <Bar hide={!this.props.hasCluster}
                 type="monotone"
                 dataKey="Prediction"
                 fill="#64b5f6"/>
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
