import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface Project {
  title: string;
  details: string[];
  skills: string[];
}

export const projectsData: Project[] = [
  {
    title: "Ultrasound Image Classification Project",
    details: [
      "Designed a deep learning pipeline using PyTorch to classify and segment breast ultrasound images",
      "Fine-tuned ResNet and CLIP models with linear probing and compared their performance against custom CNNs",
      "Demonstrated model comparisons and pipeline details for educational purposes"
    ],
    skills: ["Python", "PyTorch", "ResNet", "CLIP", "CNN", "Deep Learning", "Neural Networks"]
  },
  {
    title: "Membership Identification in Large Scaled Sparse Networks",
    details: [
      "Implemented SIMPLE in R and Python",
      "Applied it to web-scraped S&P1000 company data to identify clusters within networks",
      "Improved calculation efficiency by utilizing parallel computation"
    ],
    skills: ["R", "Python", "Web Scraping", "Parallel Computing"]
  },
  {
    title: "High Dimensional Classification via Spiked Eigenvalue Theory",
    details: [
      "Implemented a novel classification method based on spiked eigenvalue theory and dimension reduction theory in Python",
      "Applied it to identifying viruses and bacteria given codon information separated from their genetic sequence data"
    ],
    skills: ["Python", "Eigenvalue Theory", "Dimension Reduction"]
  },
  {
    title: "Pairwise Relationship Identification via Mixed Neural Networks",
    details: [
      "Constructed a novel combination of CNN and RNN in Tensorflow",
      "Incorporated NLP methods and applied them to identify virus and host relationships",
      "Achieved 87% accuracy on test set"
    ],
    skills: ["Tensorflow", "CNN", "RNN", "NLP", "Deep Learning", "Neural Networks"]
  }
];

const Projects: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      {projectsData.map((project, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`project-content-${index}`}
            id={`project-header-${index}`}
          >
            <Typography variant="h6">{project.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Box component="ul" sx={{ mt: 0, mb: 2 }}>
                {project.details.map((detail, idx) => (
                  <Typography component="li" key={idx} sx={{ mb: 1 }}>
                    {detail}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {project.skills.map((skill, idx) => (
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
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Projects;
