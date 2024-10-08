/* // Below from https://mui.com/material-ui/react-table/
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { eventData } from "../eventAdminMatchingCardData.js";

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'date', headerName: 'Date', width: 100 },
  { field: 'administrator', headerName: 'Administrator', width: 100 },
  { field: 'urgency', headerName: 'Urgency', width: 100 },
  { field: 'volunteers', headerName: 'Volunteers', width: 100 },
  { field: 'skills', headerName: 'Skills', width: 750 },
];

export default function DataTable( onSkillSelect ) {
  return (
    <div style={{ height: 400, width: '85%', height: '90%' }}>
      <DataGrid
        rows={eventData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
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
          if (selectedRowId !== undefined) {
            const selectedSkills = eventData[selectionModel[0] - 1].skills;
            console.log(selectedSkills);
          }
        }}
        sx={{
          '.MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: 'rgb(97 137 47 / 8%)',
          },
          '.MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgb(134 194 50 / 8%)',
          },
          '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
            color: '#86C232',
          },
          '.MuiTablePagination-selectIcon': {
            color: 'white',
          },
          '.MuiTablePagination-actions-root': {
            color: 'white',
          },
          '.MuiDataGrid-footerContainer': {
            color: 'white',
          },
          '.MuiDataGrid-root': {
            color: 'white',
          },
          '.css-rtrcn9-MuiTablePagination-root': {
            color: 'white',
          },
          '.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root': {
            color: 'white',
          },
          'MuiDataGrid-cellCheckbox': {
            color: 'white',
          },
          '.MuiDataGrid-cell': {
            color: 'white',
          },
          '.MuiDataGrid-row': {
            '&.MuiDataGrid-cell': {
              color: 'white',
            },
          },
        }}
      />
    </div>
  );
} */