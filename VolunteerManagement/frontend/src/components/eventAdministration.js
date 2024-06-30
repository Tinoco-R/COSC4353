import React, { Children, Component } from "react";
import Button from '@mui/material/Button';
import CreateEvent from "./createEvent";
import ModifyEvent from "./modifyEvent";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { Item, StyledLabel } from "./item";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { eventModificationColumns } from "./columns";
import { eventData } from "./volunteerHistoryData";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {'&.Mui-focused': {color: 'white',},},
      },
    },
  },
});

// From https://mui.com/material-ui/react-autocomplete/ to allow for easy search of events
function ComboBox() {
  return (
    <ThemeProvider theme={theme}>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => (
            <TextField
            {...params}
            label="Event Name"
            InputProps={{
            ...params.InputProps,
                sx: {
                    '.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': { color: 'white!important',},
                    '&.MuiInputLabel-outlined': { color: 'white',},
                    '&.MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white',},
                    '&:hover fieldset': { borderColor: 'white',},
                    '&.Mui-focused fieldset': { borderColor: 'white',},
                },
                },
            }}
            />
        )}
        />
    </ThemeProvider>
  );
}

const top100Films = ['1', '2', '3']

const StyledButton = ({ children,...props}) => {
    return (
        <Button
            {...props}
            style={{
                backgroundColor: "#86C232",
                fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
            }}
            variant="contained"
            sx={{ mx: 1, width: '350px', height: '72px', fontSize: '24px' }}
        >
            {children}
        </Button>
    );
}

export default class EventAdministration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false,
            modify: false
        }
    }
    
    handleClickEvent = ( type ) => {
        // Remove the create / modify buttons
        // Get type (create or modify) and render correct page
        if (type === "create") {
            console.log("Creating");
            this.setState({ create: true, modify: false });
        }
        else if (type === "modify" ) {
            console.log("Modifying");
            this.setState({ create: false, modify: true });
        }
        else {
            console.log("Back");
            this.setState({ create: false, modify: false });            
        }
    }

    render() {
        return (
            <>
            {/* Three Buttons: Create, Modify and Back. Selecting Create or Modify hides those and renders their corresponding page. Back resets to the default page [rendered only when one of the other buttons have been clicked].  */}
            {!this.state.create && !this.state.modify && (
                <>
                <StyledButton type="submit" onClick={() => {this.handleClickEvent("create")}} >Create A New Event</StyledButton>
                <StyledButton type="submit" onClick={() => {this.handleClickEvent("modify")} } >Modify An Existing Event</StyledButton>
                </>
            )}
            
            {/* Modify Selected: Render a table with event information, and a search bar */}
            {(!this.state.create && this.state.modify) && (
                <>
                    <Grid container spacing={4} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '32px', marginTop: '32px' }}>
                            <div>
                                <StyledButton type="submit" onClick={() => {this.handleClickEvent("back")}}>Back</StyledButton>
                            </div>
                            
                            <div style={{ marginTop: '-8px'}}>
                                <Item type="lime">
                                    <ComboBox />
                                </Item>
                            </div>
                        </div>
                    </Grid>
                    
                    <div style={{ marginTop: '20px', height: 400, width: "95%", height: "90%" }}>
                        <DataGrid
                            rows={eventData}
                            columns={eventModificationColumns}
                            initialState={{
                                pagination: { paginationModel: { page: 0, pageSize: 20 } },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                            disableSelectionOnClick
                            checkboxSelection
                            disableMultipleSelection
                            disableMultipleRowSelection
                            selectionType="single"
                            // Get the list of skills for the selected row on the data table
                            onRowSelectionModelChange={(selectionModel) => {
                                let selectedRowId = selectionModel[0];
                                if (selectedRowId!== undefined) {
                                    const rowSkills = eventData[selectedRowId - 1].skills;
                                    this.setState({ selectedSkills: rowSkills });
                                }
                            }}
                            sx={{
                                ".MuiDataGrid-row.Mui-selected:hover": { backgroundColor: "rgb(97 137 47 / 15%)", },
                                ".MuiDataGrid-row.Mui-selected": { backgroundColor: "rgb(134 194 50 / 15%)", },
                                ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked": { color: "#86C232", },
                                ".MuiTablePagination-selectIcon": { color: "white", },
                                ".MuiTablePagination-actions-root": { color: "white", },
                                ".MuiDataGrid-footerContainer": { color: "white", },
                                ".MuiDataGrid-root": { color: "white", },
                                ".css-rtrcn9-MuiTablePagination-root": { color: "white", },
                                ".css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": { color: "white", },
                                "MuiDataGrid-cellCheckbox": { color: "white", },
                                ".MuiDataGrid-cell": { color: "white", },
                                ".MuiDataGrid-row": { "&.MuiDataGrid-cell": { color: "white", }, },
                            }}
                        />
                    </div>
                </>
            )}

            {/* Create Selected: Render the create event page */}
            {(this.state.create && !this.state.modify) && (
                <>
                    <StyledButton type="submit" onClick={() => {this.handleClickEvent("back")}}>Back</StyledButton>
                    <CreateEvent />
                </>
            )}
            </>
        );
    }
}