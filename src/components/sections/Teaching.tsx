import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface TeachingEntry {
  course: string;
  institution: string;
  period: string;
  details: string[];
  skills: string[];
}

export const teachingData: TeachingEntry[] = [
  {
    course: "Introduction to EDA",
    institution: "USC Jumpstart Summer Program",
    period: "May 2023, July 2024",
    details: [
      "Curated an original tutorial on data collection, data cleaning and explanatory data analysis for aspiring undergraduate students looking to apply for PhD programs",
      "Jupyter Notebook available at: https://github.com/yiqiushen/USC-Jumpstart-Summer-2023-EDA-tutorial"
    ],
    skills: ["Data Analysis", "Python", "Jupyter", "EDA", "Data Cleaning", "Teaching"]
  },
  {
    course: "Introduction to Business Analytics",
    institution: "USC Marshall School of Business",
    period: "Fall 2022 (TA) and Spring 2023 (Instructor)",
    details: [
      "Worked with a total of 10 sessions and over 450 students and used large, real corporate datasets to teach concepts of A/B testing, KPIs and dashboards, classification and clustering and their application to business decision making",
      "Collaborated with an instructor team of 7 people to create a compact and sufficient lesson plan; implemented a novel flip-classroom setting that allows flexibility for senior students"
    ],
    skills: ["Business Analytics", "A/B Testing", "KPIs", "Classification", "Clustering", "Teaching", "Curriculum Development"]
  },
  {
    course: "Deep Learning and Business Application",
    institution: "USC Marshall School of Business",
    period: "Spring 2020",
    details: [
      "Instructed Python and R tutorials on implementing SGD, PCA, MLP classifier manually and creating CNN and RNN via Tensorflow and Keras",
      "Showcased various deep learning applications on subjects above"
    ],
    skills: ["Deep Learning", "Python", "R", "TensorFlow", "Keras", "SGD", "PCA", "CNN", "RNN", "Teaching"]
  },
  {
    course: "Introduction to MATLAB",
    institution: "USC Viterbi School of Engineering",
    period: "Spring and Fall 2017",
    details: [
      "Provided in-and-after-class support on MATLAB learning experience and engineering projects"
    ],
    skills: ["MATLAB", "Engineering", "Teaching", "Technical Support"]
  }
];

const Teaching: React.FC = () => {
  const navigate = useNavigate();

  const handleSkillClick = (skill: string) => {
    navigate('/skills', { state: { selectedSkill: skill } });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Teaching
      </Typography>
      {teachingData.map((teaching, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`teaching-content-${index}`}
            id={`teaching-header-${index}`}
          >
            <Box>
              <Typography variant="h6">{teaching.course}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {teaching.institution}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {teaching.period}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ mt: 0 }}>
              {teaching.details.map((detail, idx) => (
                <Typography component="li" key={idx} sx={{ mb: 1 }}>
                  {detail}
                </Typography>
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {teaching.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSkillClick(skill)}
                    sx={{
                      m: 0.5,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'white'
                      }
                    }}
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

export default Teaching;
