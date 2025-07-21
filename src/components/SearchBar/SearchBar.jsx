import React from 'react';
import { 
  Box, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  OutlinedInput,
  TextField,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 150 }, (_, i) => `${currentYear - i}`);

const SearchBar = ({ searchTerm, setSearchTerm, startYear, setStartYear, endYear, setEndYear }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      <FormControl 
        variant="outlined" 
        sx={{
          flexGrow: 1,
          minWidth: '300px',
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fafafa', 
          },
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

      <Autocomplete
        freeSolo
        options={years}
        value={startYear}
        onChange={(_, newValue) => setStartYear(newValue || '')}
        inputValue={startYear}
        onInputChange={(_, newInputValue) => setStartYear(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ano de Início"
            variant="outlined"
            sx={{
              width: '150px',
              backgroundColor: '#fafafa',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fafafa',
              },
            }}
          />
        )}
        sx={{
          '& .MuiAutocomplete-option:hover': {
            backgroundColor: '#fb923c', 
            color: '#fff',
          },
        }}
      />

      <Autocomplete
        freeSolo
        options={years}
        value={endYear}
        onChange={(_, newValue) => setEndYear(newValue || '')}
        inputValue={endYear}
        onInputChange={(_, newInputValue) => setEndYear(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ano de Fim"
            variant="outlined"
            sx={{
              width: '150px',
              backgroundColor: '#fafafa',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fafafa',
              },
            }}
          />
        )}
        sx={{
          '& .MuiAutocomplete-option:hover': {
            backgroundColor: '#fb923c', // laranja
            color: '#fff',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;