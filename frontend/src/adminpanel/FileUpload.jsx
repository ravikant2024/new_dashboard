import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const FileUpload = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setCsvData(results.data);
        }
      });
    }
  };

  const handleUpload = () => {
    // You can send `csvData` to your backend API here
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Product CSV
      </Typography>

      <Button variant="contained" component="label">
        Choose CSV File
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>

      {csvData.length > 0 && (
        <>
          <Box mt={3}>
            <Typography variant="h6">CSV Preview</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(csvData[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {csvData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, i) => (
                        <TableCell key={i}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box mt={2}>
            <Button variant="contained" color="success" onClick={handleUpload}>
              Upload Data
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FileUpload;
