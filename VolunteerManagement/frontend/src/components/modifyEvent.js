/* import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { eventModificationColumns } from "./columns";
import { eventData } from "./volunteerHistoryData";

export default class ModifyEvent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: 400, width: "95%", height: "90%" }}>
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
        );
    }
} */