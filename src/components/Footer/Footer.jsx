import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright'; 

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: '0 -1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <CopyrightIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
          {'Desafio Técnico desenvolvido para o processo seletivo da V-lab © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;