import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { projectsData } from './Projects';
import { experienceData } from './Experience';
import { teachingData, TeachingEntry } from './Teaching';

interface Project {
  title: string;
  details: string[];
  skills: string[];
}

interface ExperienceEntry {
  company: string;
  position: string;
  period: string;
  details: string[];
  skills: string[];
}

interface SkillUsage {
  type: 'project' | 'experience' | 'teaching';
  title: string;
  details: string[];
}

export type SkillsData = {
  [category: string]: string[];
};

export const skillsData: SkillsData = {
  "Programming Languages": ["R", "Python", "MATLAB", "SQL", "Java"],
  "Frameworks, Libraries & Tools": ["PyTorch", "TensorFlow", "Keras", "BeautifulSoup", "Jupyter", "Plotly.js", "PostGIS", "FlamMap"],
  "Deep Learning Architectures": ["CNN", "RNN", "ResNet", "CLIP"],
  "Data Analysis & Visualization Tools": ["Microsoft Excel", "Tableau", "SAS JMP", "Mathematica", "PostgreSQL", "LATEX"],
  "Computing Skills": ["Web Scraping", "Parallel Computing"], 
  "Languages": ["English (Proficient)", "Japanese (Limited)", "Chinese (Native)"],
  "Teaching & Communication": ["Teaching", "Explaining technical concepts to non-technical audiences", "Curriculum Development"],
  "Business & Analytical Skills": ["A/B Testing", "KPIs", "Dashboards", "Experimental Design"]
}
;

const Skills: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillUsages, setSkillUsages] = useState<SkillUsage[]>([]);

  useEffect(() => {
    // Check if we have a selected skill from navigation
    const state = location.state as { selectedSkill?: string };
    if (state?.selectedSkill) {
      handleSkillClick(state.selectedSkill);
    }
  }, [location]);

  const handleSkillClick = (skill: string) => {
    const usages: SkillUsage[] = [];
    
    // Get projects using this skill
    projectsData.forEach((project: Project) => {
      if (project.skills.includes(skill)) {
        usages.push({
          type: 'project',
          title: project.title,
          details: project.details
        });
      }
    });

    // Get experiences using this skill
    experienceData.forEach((exp: ExperienceEntry) => {
      if (exp.skills.includes(skill)) {
        usages.push({
          type: 'experience',
          title: `${exp.position} at ${exp.company}`,
          details: exp.details
        });
      }
    });

    // Get teaching experiences using this skill
    teachingData.forEach((teaching: TeachingEntry) => {
      if (teaching.skills.includes(skill)) {
        usages.push({
          type: 'teaching',
          title: `${teaching.course} at ${teaching.institution}`,
          details: teaching.details
        });
      }
    });

    setSkillUsages(usages);
    setSelectedSkill(skill);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUsageIcon = (type: string) => {
    switch (type) {
      case 'project':
        return '🚀 Project: ';
      case 'experience':
        return '💼 Experience: ';
      case 'teaching':
        return '📚 Teaching: ';
      default:
        return '';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Skills
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(skillsData).map(([category, skills], index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom color="primary">
                {category}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    onClick={() => handleSkillClick(skill)}
                    sx={{
                      m: 0.5,
                      bgcolor: 'background.paper',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'text.primary'
                      }
                    }}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Projects, Experience, and Teaching using {selectedSkill}
        </DialogTitle>
        <DialogContent>
          {skillUsages.length > 0 ? (
            skillUsages.map((usage, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {getUsageIcon(usage.type)}{usage.title}
                </Typography>
                <Box component="ul" sx={{ mt: 0 }}>
                  {usage.details.map((detail, idx) => (
                    <Typography component="li" key={idx} sx={{ mb: 1 }}>
                      {detail}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))
          ) : (
            <Typography>
              This skill is part of my daily toolkit; relevant projects and examples are being curated.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Skills;
