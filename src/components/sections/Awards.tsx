import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Award {
  title: string;
  details: string[];
}

const awardsData: Award[] = [
  {
    title: "Correlation One - Data Science for All Fellow",
    details: [
      "Selected as one of 500 fellows from over 10,000 applicants",
      "Completed 10-week intensive data science training program",
      "Worked on real-world data science projects with industry partners"
    ]
  },
  {
    title: "USC Marshall Graduate Assistantship and Fellowship",
    details: [
      "Awarded for academic excellence and research potential",
      "Provided full tuition coverage and stipend"
    ]
  },
  {
    title: "USC Dornsife Summer Undergraduate Research Fund",
    details: [
      "Grant awarded for summer research project in applied mathematics",
      "Developed statistical models for Knockoff Paper"
    ]
  }
];

const Awards: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Awards & Honors
      </Typography>
      {awardsData.map((award, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`award-content-${index}`}
            id={`award-header-${index}`}
          >
            <Typography variant="h6">{award.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Box component="ul" sx={{ m: 0 }}>
                {award.details.map((detail, idx) => (
                  <Typography component="li" key={idx} sx={{ mb: 1 }}>
                    {detail}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Awards;
