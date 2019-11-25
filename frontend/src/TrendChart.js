import React, {Component} from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell
} from 'recharts';

function myFormatter (value, name, props) {
  if (props.payload.isPrediction) return [value.toString() + "%", "Prediction"];
  return name.localeCompare("Density") && name.localeCompare("Prediction")
    ? value.toString : value.toString() + "%";
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
            <Bar type="monotone"
                 dataKey="Density">
              {this.props.data ? this.props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isPrediction ? "#64b5f6" : "#556CD6"}/>
                )) : null}
            </Bar>
            <Bar hide={!this.props.hasCluster}
                 type="monotone"
                 dataKey="Prediction">
              {this.props.data ? this.props.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={"#64b5f6"}/>
                )) : null}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
