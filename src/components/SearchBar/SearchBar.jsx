import React from 'react';
import { 
  Box, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  OutlinedInput,
  TextField 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchTerm, setSearchTerm, startYear, setStartYear, endYear, setEndYear }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      
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
            }
          }}
        />
      </FormControl>

      <TextField
        label="Ano de Início"
        type="number"
        variant="outlined"
        value={startYear}
        onChange={(e) => setStartYear(e.target.value)}
        sx={{ width: '150px' }}
      />
      <TextField
        label="Ano de Fim"
        type="number"
        variant="outlined"
        value={endYear}
        onChange={(e) => setEndYear(e.target.value)}
        sx={{ width: '150px' }}
      />
    </Box>
  );
};

export default SearchBar;