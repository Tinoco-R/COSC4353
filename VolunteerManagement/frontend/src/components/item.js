import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const StyledLabel = styled('label')({
    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
});

export const Item = styled(Paper)(({ theme, type }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  fontSize: '1.5rem',
  textAlign: 'center',
  color: "white",
  flexGrow: 1,
  backgroundColor: type === 'background'? '#61892F' :
                   type === 'inputItem'? '#61892F' : 
                   type === 'lime'? '#86C232' : '#000000'
}));