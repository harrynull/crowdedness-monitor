import React from 'react';
import {Tooltip, XAxis, YAxis, Bar, BarChart, ResponsiveContainer} from 'recharts';

function createData (Floor, Density) {
  return {Floor, Density};
}

const data = [
  createData('B1', 59),
  createData('1', 68),
  createData('2', 90),
  createData('3', 80),
  createData('4', 90),
  createData('5', 40),
  createData('6', 15),
  createData('7', 10),
  createData('8', 20),
];

function myFormatter (value, name, props) {
  return name.localeCompare("Density") ? value : value + "%";
}

export default function FloorChart () {
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <BarChart data={data} padding={0}>
          <XAxis axisLine={false} tickLine={false} dataKey="Floor"/>
          <YAxis hide={true} type="number" domain={[0, 100]}/>
          <Tooltip formatter={myFormatter}/>
          <Bar dataKey="Density" fill="#556CD6"/>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
