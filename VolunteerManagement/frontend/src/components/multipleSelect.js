import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import colors from 'react-multi-date-picker/plugins/colors';

// Below code adapted from https://mui.com/material-ui/react-select/ [Labels and helper text]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
        backgroundColor: '#222629',
        color: '#86C232',
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },
  },
};

function getStyles(data, choice, theme) {
  return {
    fontWeight:
      choice.indexOf(data) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    backgroundColor:
        choice.indexOf(data)!== -1
         ? '#61892F' // Background color for selected items
          : 'transparent', // No background color for unselected items
      color: choice.indexOf(data)=== -1? 'white' : 'black', // Text color
  };
}

// Pass a list of data to populate the select
export default function MultipleSelect( { dataValues, isMulti = true, helpfulLabel, value = [], onChange } ) {
  const theme = useTheme();
  const [choice, setData] = React.useState([]);

  useEffect(() => {
    setData(value || []);
  }, [value]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setData(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label" sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }} >{helpfulLabel}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple={isMulti}
          value={choice}
          onChange={handleChange}
          input={<OutlinedInput label={helpfulLabel} />}
          MenuProps={MenuProps}
          sx={{
            '&.MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                    borderColor: 'white', // Hover border color
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white', // Focus border color
                },
            },
          }}
        >
          {dataValues.map((data) => (
            <MenuItem
              key={data}
              value={data}
              style={getStyles(data, choice, theme)}
            >
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}