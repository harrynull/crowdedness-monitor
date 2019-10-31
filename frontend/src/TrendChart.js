import React from 'react';
import {XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Bar, BarChart} from 'recharts';

function createData (time, Density) {
  return {time, Density: Density};
}

const data = [
  createData('03:00', 0),
  createData('04:00', 0),
  createData('05:00', 0),
  createData('06:00', 0),
  createData('07:00', 0),
  createData('08:00', 10),
  createData('09:00', 20),
  createData('10:00', 50),
  createData('11:00', 80),
  createData('12:00', 60),
  createData('13:00', 90),
  createData('14:00', 80),
  createData('15:00', 70),
  createData('16:00', 50),
  createData('17:00', 60),
  createData('18:00', 40),
  createData('19:00', 60),
  createData('20:00', 50),
  createData('21:00', 30),
  createData('22:00', 20),
  createData('23:00', 10),
];

function myFormatter (value, name, props) {
  return name.localeCompare("Density") ? value : value + "%";
}

export default function TrendChart () {
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time"/>
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
