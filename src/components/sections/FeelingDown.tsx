import React from 'react';
import { Box, Typography, Paper, Grid, Link } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface MentalHealthResource {
  name: string;
  contact: string;
  url: string;
}

const mentalHealthResources: MentalHealthResource[] = [
  {
    name: "National Suicide Prevention Lifeline",
    contact: "988",
    url: "https://988lifeline.org/"
  },
  {
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    url: "https://www.crisistextline.org/"
  },
  {
    name: "SAMHSA's National Helpline",
    contact: "1-800-662-4357",
    url: "https://www.samhsa.gov/find-help/national-helpline"
  }
];

const FeelingDown: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Feeling Down?
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FavoriteIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h5">Mental Health Resources</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              I care about mental health. Here are some valuable resources you can reach out to when things are hard:
            </Typography>
            <Box sx={{ pl: 2 }}>
              {mentalHealthResources.map((resource, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" component="div" fontWeight="bold">
                    <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                      {resource.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {resource.contact}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
              Remember: It's okay to ask for help. Your mental health matters.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeelingDown;
