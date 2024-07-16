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
//import { eventData } from "./volunteerHistoryData";
import { eventData } from "./eventData";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {'&.Mui-focused': {color: 'white',},},
      },
    },
  },
});

function getEventNames() {
    let eventNames = []
    eventNames.push("All");
    for (let index = 0; index < eventData.length; index++) {
        const eventName = eventData[index].name;
        eventNames.push(eventName);        
    }

    return eventNames;
}

// From https://mui.com/material-ui/react-autocomplete/ to allow for easy search of events
function ComboBox({ onChange }) {
  let events = getEventNames();

  const handleChange = (event, value) => {
    onChange(value);
  };

  return (
    <ThemeProvider theme={theme}>
        <Autocomplete
        onChange={handleChange}
        disablePortal
        id="combo-box-demo"
        options={events}
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
            modify: false,
            confirm: false,
            search: "",
            selectedRowData: null,
        }
    }
    
    handleClickEvent = ( type, eventData = null ) => {
        // Remove the create / modify buttons
        // Get type (create or modify) and render correct page
        if (type === "create") {
            this.setState({ create: true, modify: false, confirm: false, selectedRowData: null });
        }
        else if (type === "modify") {
            this.setState({ create: false, modify: true, confirm: false, selectedRowData: eventData });
        }
        else if (type === "back") {
            this.setState({ create: false, modify: false, confirm: false, selectedRowData: null });            
        }
        else if (type === "confirm") {
            if (type === "confirm") {                
                // Transform eventData to match the expected shape in CreateEvent
                const transformedEventData = {
                    eventId: eventData.id,
                    eventName: eventData.name,
                    eventAdministrator: eventData.administrator,
                    eventDescription: eventData.description,
                    eventAddress: eventData.address,
                    eventCity: eventData.city,
                    eventState: eventData.state,
                    eventZip: eventData.zip,
                    eventDate: new Date(eventData.date).toISOString().split('T')[0],
                    eventStart: eventData.time,
                    eventDuration: eventData.duration,
                    eventSkills: eventData.skills.split(", "),
                    eventUrgency: eventData.urgency,
                };
                this.setState({ create: false, modify: false, confirm: true, selectedRowData: transformedEventData });
            }     
        }
        else {
            console.log("Other");
        }
    }

    handleSearchInputChange = (newValue) => {
        this.setState({ search: newValue });
    };

    filterEventsBySearch = ( searchBar ) => {
        let events = [];
        // No Search
        if (searchBar === "" || searchBar === "All" || searchBar === null) {
            return eventData;
        }

        for (let index = 0; index < eventData.length; index++) {
            const eventName = eventData[index].name;
            // If eventName not like searchBar, continue; else add it to events and once loop is done return events
            if (eventName !== null && eventName.toLowerCase().includes(searchBar.toLowerCase())) {
                events.push(eventData[index]);
            }
        }

        return events;
    };

    render() {
        const filteredRows = this.filterEventsBySearch( this.state.search );

        return (
            <>
            {/* Three Buttons: Create, Modify and Back. Selecting Create or Modify hides those and renders their corresponding page. Back resets to the default page [rendered only when one of the other buttons have been clicked].  */}
            {!this.state.create && !this.state.modify && (
                <>
                <StyledButton type="submit" onClick={() => {this.handleClickEvent("create")}} >Create A New Event</StyledButton>
                <StyledButton type="submit" onClick={() => {this.handleClickEvent("modify", this.state.selectedRowData)} } >Modify An Existing Event</StyledButton>
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
                                    <ComboBox onChange={this.handleSearchInputChange} />
                                </Item>
                            </div>
                        
                            <div>
                            {this.state.selectedRowData !== null && (
                                <StyledButton type="submit" onClick={() => {this.handleClickEvent("confirm", this.state.selectedRowData)} } >Confirm</StyledButton>
                            )}
                            </div>
                        </div>
                    </Grid>
                    
                    <div style={{ marginTop: '20px', height: 400, width: "95%", height: "90%" }}>
                        <DataGrid
                            rows={filteredRows}
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
                            onRowSelectionModelChange={(newSelection) => {
                                const selectedId = newSelection[0];
                                const selectedEvent = eventData.find(event => event.id === selectedId);
                                this.setState({ selectedRowData: selectedEvent });
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

                    {this.state.selectedRowData && (
                        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <h3>Selected Event Details:</h3>
                            <ul>
                                {Object.keys(this.state.selectedRowData).map((key, index) => (
                                    <li key={index}>{`${key}: ${this.state.selectedRowData[key]}`}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
            {/* Confirm Selected: Render the modify event page (create event with parameters passed) */}
            {this.state.confirm  && (
                <>
                    <StyledButton type="submit" onClick={() => {this.handleClickEvent("back")}}>Back</StyledButton>
                    <CreateEvent prefilledData={this.state.selectedRowData} />
                </>
            )}

            {/* Create Selected: Render the create event page */}
            {(this.state.create && !this.state.modify) && (
                <>
                    <StyledButton type="submit" onClick={() => {this.handleClickEvent("back")}}>Back</StyledButton>
                    <CreateEvent prefilledData={null} />
                </>
            )}
            </>
        );
    }
}