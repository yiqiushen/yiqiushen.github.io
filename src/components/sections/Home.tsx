import React, { useState } from 'react';
import headshot from '../../photos/headshot.jpg';
import marathon from '../../photos/marathon.JPG';
import { Box, Typography, Paper, Link, Container, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Accordion, AccordionSummary, AccordionDetails, Stack, Card, CardActionArea, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Tooltip from '@mui/material/Tooltip';
import { skillsData } from '../sections/Skills';
import { projectsData } from '../sections/Projects';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Home: React.FC = () => {
  const [showMarathon, setShowMarathon] = useState<boolean>(false);
  const [randomSkill, setRandomSkill] = useState<string>('');
  const [showSkill, setShowSkill] = useState<boolean>(false);
  const [showSkillDetails, setShowSkillDetails] = useState<boolean>(false);
  const [showResume, setShowResume] = useState<boolean>(false);

  const getRandomSkill = () => {
    const allSkills = Object.values(skillsData).flat() as string[];
    const randomIndex = Math.floor(Math.random() * allSkills.length);
    const skill = allSkills[randomIndex];
    setRandomSkill(skill);
    setShowSkill(true);
  };

  const handleSkillClick = () => {
    setShowSkillDetails(true);
  };

  const handleCloseSkillDetails = () => {
    setShowSkillDetails(false);
  };

  const handleImageClick = (): void => {
    setShowMarathon(!showMarathon);
  };

  return (
    <Box>
      <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'stretch', height: '100%' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', height: '100%' }}>
  <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        Yiqiu Shen
        <Link href="mailto:yiqiushe@usc.edu" underline="hover">
          <EmailIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
        </Link>
        <Link href="https://www.linkedin.com/in/yiqiu-shen-b6a1901b6/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
        </Link>
        <Link href="https://github.com/yiqiushen" target="_blank" rel="noopener noreferrer">
          <GitHubIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
        </Link>
        <Tooltip title="Los Angeles, CA" arrow>
          <LocationOnIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
        </Tooltip>
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        (first name pronounced "i-chi-oo")
      </Typography>
    </Paper>

    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        I obtained my Ph.D. in Statistics at the Department of Data Sciences and Operations at Marshall School of Business at USC. My research interests are in high-dimensional statistics and statistical learning theory. My advisor is Dr. Stanislav Minsker. If you are interested in my projects or my work at Delphire, please feel free to send me an email.
      </Typography>
      <Typography variant="body1" paragraph>
        Prior to graduate school, I obtained my bachelor's degree in Applied and Computational Mathematics at USC. 
      </Typography>
      <Typography variant="body1" paragraph>
        <Link href="#" onClick={(e) => { e.preventDefault(); setShowResume(true); }} sx={{ cursor: 'pointer' }}>
          Click here for my resume
        </Link>
      </Typography>
    </Paper>

    <Dialog
      open={showResume}
      onClose={() => setShowResume(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>My Resume</DialogTitle>
      <DialogContent>
        <iframe 
          src="/cv.pdf" 
          width="100%" 
          height="600px"
          style={{ border: 'none' }}
          title="Resume"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowResume(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  </Box>
</Box>


          <Box sx={{ width: '300px', flex: '0 0 auto' }}>
            <Paper
              elevation={1}
              sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '300px', // Fixed height container
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={handleImageClick}
              >
                <Box
                  component="img"
                  src={showMarathon ? marathon : headshot}
                  alt={showMarathon ? "Marathon photo" : "Headshot"}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              </Box>
              <Typography 
                variant="caption" 
                sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}
              >
                {showMarathon ? "Click to see headshot" : "Click for bonus photo"}
              </Typography>
            </Paper>

            <Paper 
              elevation={1}
              sx={{ 
                p: 3,
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                Discover My Skills
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AutoAwesomeIcon />}
                onClick={getRandomSkill}
                fullWidth
              >
                I am Feeling Lucky
              </Button>
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                <Link href="skills" color="primary">
                  View full skills list
                </Link>
              </Typography>
              {showSkill && (
                <>
                  <Chip
                    label={randomSkill}
                    onClick={handleSkillClick}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'text.primary'
                      }
                    }}
                    variant="outlined"
                  />
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    Click on the skill to see related projects!
                  </Typography>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={showSkillDetails}
        onClose={handleCloseSkillDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Projects, Experience, and Teaching using {randomSkill}
        </DialogTitle>
        <DialogContent>
          {projectsData.filter(project => project.skills.includes(randomSkill)).length > 0 ? (
            projectsData
              .filter(project => project.skills.includes(randomSkill))
              .map((project, index) => (
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
              ))
          ) : (
            <Typography>
              This skill is part of my daily toolkit; relevant projects and examples are being curated.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSkillDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </Box>
  );
};

export default Home;
