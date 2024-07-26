// DataTable Below from https://mui.com/material-ui/react-table/
import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
//import { eventData } from "./eventAdminMatchingCardData.js";
import VolunteerDetailsAdmin from "./table/volunteer";
import { eventMatchingColumns, eventModificationColumns } from "./columns.js";
import { fetchEvents, fetchEventVolunteers } from "./eventData";

export default class VolunteerMatching extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedSkills: "",
          selectedEvent: "",
          selectedEventName: "",
          events: []
        };
    }

    componentDidMount() {
        // Get all events from the database
        fetchEvents().then(events => {
            this.setState({
                events: events
            });
        });
    }

    convertSelectedSkillsToStringArray = (selectedSkillsString) => {
      return selectedSkillsString.split(", ");
    };

    render() {
        const { selectedSkills } = this.state;

        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 2 }}><br></br>
                    <div style={{ height: 400, width: "95%", height: "90%" }}>
                      <DataGrid
                          rows={this.state.events}
                          columns={eventMatchingColumns}
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
                              // ID of selected Row
                              let selectedRowId = selectionModel[0];
                              
                              // Full data of row (just need Event Name for now)
                              const selectedEvent = this.state.events.find(event => event.Event_ID === selectedRowId);

                              this.state.selectedEvent = selectedRowId;
                              if (selectedEvent && selectedEvent.Name) {
                                this.state.selectedEventName = selectedEvent.Name;
                              }
                              else {
                                this.state.selectedEventName = "";
                              }
                              
                              if (selectedRowId !== undefined) {
                                  const rowSkills = selectedEvent.Skills;
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
                          getRowId={(row) => row.Event_ID}
                      />
                  </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <VolunteerDetailsAdmin selectedSkills={this.convertSelectedSkillsToStringArray(this.state.selectedSkills)} selectedEvent={this.state.selectedEvent} selectedEventName={this.state.selectedEventName} />
                    </div>
                </div>
            </>
        );
    }
}