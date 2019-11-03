import React, {Component} from 'react';
import {XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Bar, BarChart} from 'recharts';

function myFormatter (value, name, props) {
  return name.localeCompare("Density") ? value : value + "%";
}

export default class TrendChart extends Component {

  render() {
    return (
      <React.Fragment>
        <ResponsiveContainer>
          <BarChart
            data={this.props.data}
            margin={{
              top: 30,
              bottom: 0,
              left: 20,
            }}
          >
            <XAxis dataKey="time"
                   // interval={this.props.interval}
            />
            <YAxis hide={true}
                   type="number" domain={[0, 100]}/>
            <CartesianGrid
              vertical={false}
              stroke="#e0e0e0"/>
            <Tooltip formatter={myFormatter}/>
            <Bar type="monotone" dataKey="Density" fill="#556CD6"/>
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
