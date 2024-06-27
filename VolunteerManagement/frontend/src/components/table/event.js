// Below from https://mui.com/material-ui/react-table/
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'date', headerName: 'Date', width: 100 },
  { field: 'administrator', headerName: 'Administrator', width: 100 },
  { field: 'urgency', headerName: 'Urgency', width: 100,},
  { field: 'volunteers', headerName: 'Volunteers', width: 100,},
  { field: 'skills', headerName: 'Skills', width: 150 },
];

const rows = [
  { id: 1, name: "House Upgrade"     , date: '12/8/1290' , administrator: 'Jon'     , urgency: 'low'   , volunteers: '12/40' , skills: 'Paint, Move, Fix' },
  { id: 2, name: "Warehouse Building", date: '5/2/2173'  , administrator: 'Cersei'  , urgency: 'low'   , volunteers: '23/40' , skills: 'Mpve, Build, Fix' },
  { id: 3, name: "Brick Laying"      , date: '9/10/1864' , administrator: 'Jaime'   , urgency: 'medium', volunteers: '9/15'  , skills: 'Build, Strength' },
  { id: 4, name: "Scaffold Setting"  , date: '3/17/2573' , administrator: 'Arya'    , urgency: 'high'  , volunteers: '18/20' , skills: 'Build' },
  { id: 5, name: "Gardening"         , date: '7/15/2835' , administrator: 'Daenerys', urgency: 'medium', volunteers: '19/35' , skills: 'Plant, Care' },
  { id: 6, name: "Box Building"      , date: '8/18/1396' , administrator:  null     , urgency: 'high'  , volunteers: '40/40' , skills: 'Tape, Boxes' },
  { id: 7, name: "Litter Collecting" , date: '7/1/353'   , administrator: 'Ferrara' , urgency: 'high'  , volunteers: '16/25' , skills: '' },
  { id: 8, name: "Food Preperation"  , date: '11/16/1778', administrator: 'Rossini' , urgency: 'low'   , volunteers: '48/50' , skills: 'Cook, Food-prep' },
  { id: 9, name: "Clothing Giveaway" , date: '9/14/2657' , administrator: 'Harvey'  , urgency: 'medium', volunteers: '1/10'  , skills: '' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '55%', height: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableSelectionOnClick
        checkboxSelection
        disableMultipleSelection
      />
    </div>
  );
}