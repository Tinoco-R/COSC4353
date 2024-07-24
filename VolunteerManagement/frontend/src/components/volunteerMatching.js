// DataTable Below from https://mui.com/material-ui/react-table/
import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { eventData } from "./eventAdminMatchingCardData.js";
import VolunteerDetailsAdmin from "./table/volunteer";
import { eventMatchingColumns } from "./columns.js";

export default class VolunteerMatching extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedSkills: "",
          selectedEvent: "",
          selectedEventName: "",
        };
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
                          rows={eventData}
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
                              const selectedEvent = eventData.find(event => event.id === selectedRowId);

                              this.state.selectedEvent = selectedRowId;
                              if (selectedEvent && selectedEvent.name) {
                                this.state.selectedEventName = selectedEvent.name;
                              }
                              else {
                                this.state.selectedEventName = "";
                              }
                              
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
                    </div>
                    <div style={{ flex: 1 }}>
                        <VolunteerDetailsAdmin selectedSkills={this.convertSelectedSkillsToStringArray(this.state.selectedSkills)} selectedEvent={this.state.selectedEvent} selectedEventName={this.state.selectedEventName} />
                    </div>
                </div>
            </>
        );
    }
}