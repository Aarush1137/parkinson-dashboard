import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Import PapaParse
import Navbar from './components/Navbar';
import DataTable from './components/DataTable';
import DataVisualization from './components/DataVisualization';
import './index.css'; // Import CSS file for styling

const App = () => {
  const [data, setData] = useState([]);
  const [progressionScore, setProgressionScore] = useState(0); // State to store progression score

  useEffect(() => {
    // Load the CSV file from the public folder
    fetch('/data.csv')
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const parsedData = result.data.map((row) => ({
              patientId: row['Patient ID'],
              timestamp: row.Timestamp,
              gyroscope: {
                x: row['Gyroscope X'],
                y: row['Gyroscope Y'],
                z: row['Gyroscope Z'],
              },
              accelerometer: {
                x: row['Accelerometer X'],
                y: row['Accelerometer Y'],
                z: row['Accelerometer Z'],
              },
              sessionId: row['Session ID'],
              diseaseProgression: row['Disease Progression'],
            }));

            setData(parsedData);

            // Filter out invalid or missing progression values
            const validProgressionValues = parsedData
              .filter((row) => typeof row.diseaseProgression === 'number' && !isNaN(row.diseaseProgression))
              .map((row) => row.diseaseProgression);

            // Calculate the average progression score if valid values exist
            if (validProgressionValues.length > 0) {
              const totalProgression = validProgressionValues.reduce((sum, value) => sum + value, 0);
              const avgProgression = totalProgression / validProgressionValues.length;
              setProgressionScore(avgProgression.toFixed(2)); // Set the average score rounded to 2 decimals
            } else {
              setProgressionScore('N/A'); // If no valid data, show 'N/A'
            }
          },
        });
      });
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* Display Progression Score */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Progression Score: {progressionScore}</h1>
        <p style={{ fontStyle: 'italic', color: 'gray' }}>The higher the score, the higher the progression</p>
      </div>

      {/* Graph comes next */}
      <h2>Data Visualization</h2>
      <DataVisualization data={data} className="data-visualization" />

      {/* Table comes below */}
      <h2>Data Table</h2>
      <DataTable data={data} />
    </div>
  );
};

export default App;
