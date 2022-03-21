import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetVaxxPerBiteCasThunk} from "../../../redux/slices/VaccineSlice";
import moment from "moment";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Grid, 
    Typography } from "@mui/material";
const Certificate = () => {
const { user } = useSelector((state) => state.user);
const { bites, loading, reports, vaxx } = useSelector((state) => state.vaccine);
const dispatch = useDispatch();
const params = useParams();

useEffect(() => {
    dispatch(GetVaxxPerBiteCasThunk({ id: params.id }));
    return () => {};
  }, [dispatch, params]);

//Datagrid
const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      valueGetter: (cellValues) => {
        return (
          cellValues.row.user[0].first_name +
          " " +
          cellValues.row.user[0].last_name
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "exposure_category",
      headerName: "Cat.",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 60,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.history_of_exposure.date).format("MMM. DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "source_of_exposure",
      headerName: "Source",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      valueGetter: (cellValues) => {
        return cellValues.row.history_of_exposure.source_of_exposure;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "type_of_exposure",
      headerName: "Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      renderCell: (cellValues) => {
        return cellValues.row.history_of_exposure.type_of_exposure;
      },
    },
    {
      field: "vaccine",
      headerName: "Vaccine",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "status_of_vaccination",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
    },
    
  ];
  const handleCellClick = (param, e) => {
    e.stopPropagation();
  };
  const handleRowClick = (param, e) => {
    e.stopPropagation();
  };

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

 return (
        <><Button
         variant="contained"
         sx={{
             float: "center",
             size: "small",
         }}
         onClick={handleOpen}
     >
         Print Certificate
     </Button>
     <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Appointment Details</DialogTitle>
             <DialogContent>
                <div style={{ height: 525, width: "auto" }}>
                {!loading && bites && (
                    <DataGrid
                        rows={bites}
                        columns={columns}
                        getRowId={(row) => row._id}
                        onCellClick={handleCellClick}
                        onRowClick={handleRowClick}
                        components={{ Toolbar: GridToolbar }} />
                )}
                </div>
             </DialogContent>
             <DialogActions>
                 <Button
                     variant="outlined"
                     sx={{ mt: 3, mb: 2 }}
                     onClick={handleClose}
                 >
                     Close
                 </Button>
             </DialogActions>
         </Dialog></>
 );
}
export default Certificate;
