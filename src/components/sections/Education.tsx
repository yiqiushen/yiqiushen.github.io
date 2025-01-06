import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  details: string[];
}

const educationData: EducationEntry[] = [
  {
    school: "University of Southern California, Los Angeles, California",
    degree: "Ph.D. Statistics",
    period: "Aug 2019 - Present, Expected May 2025",
    details: [
      "GPA: 3.96",
      "Field of Interest: High Dimensional and Robust Statistics, Statistical Learning Theory",
      "Advisor: Dr. Stanislav Minsker"
    ]
  },
  {
    school: "University of Southern California, Los Angeles, California",
    degree: "B.S. Applied and Computational Mathematics",
    period: "Aug 2016 - May 2019",
    details: [
      "GPA: 3.92",
      "Graduated summa cum laude"
    ]
  }
];

const Education: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Education
      </Typography>
      {educationData.map((edu, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`education-content-${index}`}
            id={`education-header-${index}`}
          >
            <Box>
              <Typography variant="h6">{edu.school}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {edu.degree}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {edu.period}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ mt: 0 }}>
              {edu.details.map((detail, idx) => (
                <Typography component="li" key={idx}>
                  {detail}
                </Typography>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Education;
