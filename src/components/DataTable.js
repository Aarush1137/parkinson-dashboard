import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ maxHeight: '300px', maxWidth: '100%', overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Gyroscope X</TableCell>
            <TableCell>Gyroscope Y</TableCell>
            <TableCell>Gyroscope Z</TableCell>
            <TableCell>Accelerometer X</TableCell>
            <TableCell>Accelerometer Y</TableCell>
            <TableCell>Accelerometer Z</TableCell>
            <TableCell>Progression</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.patientId}</TableCell>
              <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
              <TableCell>{entry.gyroscope.x}</TableCell>
              <TableCell>{entry.gyroscope.y}</TableCell>
              <TableCell>{entry.gyroscope.z}</TableCell>
              <TableCell>{entry.accelerometer.x}</TableCell>
              <TableCell>{entry.accelerometer.y}</TableCell>
              <TableCell>{entry.accelerometer.z}</TableCell>
              <TableCell>{entry.diseaseProgression}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
