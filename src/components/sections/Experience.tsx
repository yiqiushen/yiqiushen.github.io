import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface ExperienceEntry {
  company: string;
  position: string;
  period: string;
  details: string[];
  skills: string[];
}

export const experienceData: ExperienceEntry[] = [
  {
    company: "Delphire Inc., Los Angeles, California",
    position: "Data Scientist Intern - Modeling",
    period: "May 2023 - Aug 2023",
    details: [
      "Utilized Pandas, Numpy and Seaborn to model and visualize potential association with aspects of wildfires and number of properties affected, from real historical fire incident report data from 1990 to 2020",
      "Created spatial indexes for Microsoft Building Footprints data set via PostGIS, joined the building data and Zillow housing price data to estimate monetary damage for a certain wildfire",
      "Operated specialized softwares such as FlamMap and WindNinja to calculate perimeter of an imaginary fire, combined with the above database and estimated reduction that can be achieved by deploying our Sentinel unit"
    ],
    skills: ["Python", "Pandas", "Numpy", "Seaborn", "PostGIS", "PostgreSQL", "FlamMap", "WindNinja"]
  }
];

const Experience: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Experience
      </Typography>
      {experienceData.map((exp, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`experience-content-${index}`}
            id={`experience-header-${index}`}
          >
            <Box>
              <Typography variant="h6">{exp.company}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {exp.position}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {exp.period}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ mt: 0 }}>
              {exp.details.map((detail, idx) => (
                <Typography component="li" key={idx} sx={{ mb: 1 }}>
                  {detail}
                </Typography>
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {exp.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Experience;
