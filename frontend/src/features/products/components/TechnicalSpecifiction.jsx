import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

const parseTabSeparatedSpecs = (str) => {
  const lines = str.trim().split(/\r?\n/); // Split lines
  const data = [];

  let currentTitle = "";
  let currentContent = [];

  const push = () => {
    if (currentTitle) {
      data.push({
        title: currentTitle,
        content: currentContent.join("<br/>"),
      });
    }
    currentTitle = "";
    currentContent = [];
  };

  lines.forEach((line) => {
    const [title, value] = line.split("\t");

    if (value !== undefined) {
      push();
      currentTitle = title.trim();
      currentContent.push(value.trim());
    } else if (line.startsWith("\t")) {
      // Handle continuation lines
      currentContent.push(line.trim());
    } else {
      // If line is malformed or has no tab, just skip or handle accordingly
    }
  });

  push();
  return data;
};

const TechnicalSpecification = ({ specStr }) => {
  const specs = parseTabSeparatedSpecs(specStr);

  return (
    <Table sx={{ border: "1px solid #ccc", width: "100%", mt: 2 }}>
      <TableBody>
        {specs.map((row, index) => (
          <TableRow
            key={index}
            sx={{
              "& td": {
                borderBottom: "1px solid #e0e0e0",
                verticalAlign: "top",
                padding: "12px 16px",
              },
            }}
          >
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                width: "30%",
                fontSize: "15px",
              }}
            >
              {row.title}
            </TableCell>
            <TableCell
              sx={{
                whiteSpace: "normal",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
              dangerouslySetInnerHTML={{ __html: row.content }}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TechnicalSpecification;
