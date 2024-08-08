// DataTable Below from https://mui.com/material-ui/react-table/
import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
//import { volunteerHistoryData } from "./volunteerHistoryData";
import { volunteerViewColumns } from "./columns";
import { fetchVolunteerHistory } from "./eventData";
import Button from '@mui/material/Button';

export default class ViewVolunteers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            selectedId: "",
            volunteer: "",
            attended: "",
            finalSelection: "",
            items: 0
        }
    }

    componentDidMount() {
        // Get all events from the database
        fetchVolunteerHistory().then(history => {
            this.setState({
                history: history
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            console.log("New selectiuon:", this.state);
            
            const jsonData = JSON.stringify({ Event_ID: this.state.selectedId, Volunteer: this.state.volunteer, Attended: this.state.attended })
            console.log("Data in update:", jsonData);

            fetchVolunteerHistory().then(history => {
                this.setState({
                    history: history,
                    finalSelection: jsonData
                });
            });
        }
    }

    alterStatus() {
        let jsonData = this.state.finalSelection;
        console.log("Final:", jsonData);
        
   
            fetch('http://localhost:8000/api/updateVolunteerHistory/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response data:', data);
                if (data.message) {
                    console.log('Server message:', data.message);
                }
                if (data.non_field_errors) {
                    console.log('Validation errors:', data.non_field_errors);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div style={{ height: 400, width: "95%", height: "90%" }}>
                <DataGrid
                    rows={this.state.history}
                    columns={volunteerViewColumns}
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 20 } },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    checkboxSelection
                    selectionType="multiple"
                    // Get the list of skills for the selected row on the data table
                    onRowSelectionModelChange={(selectionModel) => {
                        const selectedItemsCount = selectionModel.length;

                        console.log("Selections:", selectionModel);
                        
                        selectionModel.forEach(selectedRowId => {
                            const selectedEvent = this.state.history.find(event => event.id === selectedRowId);

                            console.log("selectedEvent", selectedEvent);

/*                             // Skip empty data
                            if (!selectedEvent || !selectedEvent.Event_ID || !selectedEvent.Volunteer || selectedEvent.Attended === undefined) {
                                return;
                            } */

                            this.setState({ selectedId: selectedEvent.Event_ID });
                            this.setState({ volunteer: selectedEvent.Volunteer });
                            this.setState({ attended: selectedEvent.Attended });
                            this.setState({ items: selectedItemsCount });

                            const jsonData = JSON.stringify({ Event_ID: this.state.selectedId, Volunteer: this.state.volunteer, Attended: this.state.attended })
                            
                            this.setState({ finalSelection: jsonData });
                            console.log("Data:", jsonData);

                            // Update attendance 
                            fetch('http://localhost:8000/api/updateVolunteerHistory/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: jsonData
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Response data:', data);
                                if (data.message) {
                                    console.log('Server message:', data.message);
                                }
                                if (data.non_field_errors) {
                                    console.log('Validation errors:', data.non_field_errors);
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                        })
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
                <br></br>
                <Button style={{backgroundColor: "#86C232"}} onClick={() => {this.alterStatus()}} variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Alter Attended Status</Button>
            </div>
        );
    }
}