import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1799 }, (_, i) => String(currentYear - i));

const SearchBar = ({ searchTerm, setSearchTerm, startYear, setStartYear, endYear, setEndYear }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {/* Campo de busca principal */}
      <FormControl
        variant="outlined"
        sx={{
          flexGrow: 1,
          minWidth: '300px',
        }}
      >
        <InputLabel htmlFor="search-input">Buscar por título ou autor</InputLabel>
        <OutlinedInput
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Buscar por título ou autor"
          sx={{
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            backgroundColor: '#fafafa',
          }}
        />
      </FormControl>

      {/* Filtro de ano */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: '#fb923c',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: '1.2rem' }} />
          Ano de Publicação
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            options={years}
            value={startYear || null}
            onChange={(_, newValue) => {
              setStartYear(newValue || '');
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="De:" 
                sx={{ width: 150, backgroundColor: '#fafafa' }} 
              />
            )}
            sx={{ flexShrink: 0 }}
          />
          <Autocomplete
            options={years}
            value={endYear || null}
            onChange={(_, newValue) => {
              setEndYear(newValue || '');
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Até:" 
                sx={{ width: 150, backgroundColor: '#fafafa' }} 
              />
            )}
            sx={{ flexShrink: 0 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;