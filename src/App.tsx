import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from './ThemeContext';
import { lightTheme, darkTheme } from './theme';
import { useTheme } from './ThemeContext';
import Navigation from './components/Navigation';
import Home from './components/sections/Home';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Publications from './components/sections/Publications';
import Projects from './components/sections/Projects';
import Awards from './components/sections/Awards';
import Skills from './components/sections/Skills';
import Teaching from './components/sections/Teaching';
import SportsAndData from './components/sections/SportsAndData';
import FeelingDown from './components/sections/FeelingDown';

const AppContent: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navigation />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/sports-and-data" element={<SportsAndData />} />
            <Route path="/feeling-down" element={<FeelingDown />} />
          </Routes>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppWithRedirectHandler />
      </Router>
    </ThemeProvider>
  );
};

const AppWithRedirectHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.redirect;
    if (redirectPath) {
      delete sessionStorage.redirect;
      navigate(redirectPath);
    }
  }, [navigate]);

  return <AppContent />;
};

export default App;
