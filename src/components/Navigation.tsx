import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemButton, Typography, Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../ThemeContext';

const drawerWidth = 240;

interface Section {
  title: string;
  path: string;
}

const sections: Section[] = [
  { title: 'Home', path: '/' },
  { title: 'Education', path: '/education' },
  { title: 'Experience', path: '/experience' },
  { title: 'Publications', path: '/publications' },
  { title: 'Projects', path: '/projects' },
  { title: 'Skills', path: '/skills' },
  { title: 'Teaching', path: '/teaching' },
  { title: 'Awards', path: '/awards' },
  { title: 'Sports & Data', path: '/sports-and-data' },
  { title: 'Feeling Down?', path: '/feeling-down' }
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: isDarkMode ? 'background.paper' : '#1976d2',
          color: 'common.white',
        },
      }}
    >
      <Box sx={{ p: 2, pt: 3, color: 'common.white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            Yiqiu Shen
          </Typography>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ 
              ml: 1,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
      <List>
        {sections.map((section) => (
          <ListItem key={section.path} disablePadding>
            <ListItemButton
              selected={location.pathname === section.path}
              onClick={() => navigate(section.path)}
              sx={{
                color: 'common.white',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemText primary={section.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigation;
