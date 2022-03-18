import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Grid,
  Modal,
  Snackbar,
  Typography,
  TextField,
} from "@mui/material";
import { StyledTextField, StyledButton } from "../../assets/styles";
import { Edit } from "@mui/icons-material";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  AddInvThunk,
  GetAllInvThunk,
  clearError,
  clearSuccess,
} from "../../redux/slices/InventorySlice";
import Delete from "../../components/Layouts/Dialogs/Delete";
import EditInventory from "../Admin/AdminCRUD/EditInventory";
import moment from "moment";

const Inventory = () => {
  const { inventory, loading, errors, success } = useSelector(
    (state) => state.inventory
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [values, setvalues] = useState({
    brand_name: "",
    generic_name: "",
    batch_no: "",
    stock: "",
    exp_date: new Date(),
  });
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand_name", values.brand_name);
    formData.append("generic_name", values.generic_name);
    formData.append("batch_no", values.batch_no);
    formData.append("stock", values.stock);
    formData.append("exp_date", values.exp_date);
    formData.append("clinic", user.clinic);
    dispatch(AddInvThunk({ data: formData }));
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  useEffect(() => {
    //console.log(user._id);
    dispatch(GetAllInvThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user]);

  //Datagrid
  const columns = [
    {
      field: "brand_name",
      headerName: "Brand Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "generic_name",
      headerName: "Generic Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batch_no",
      headerName: "Batch No.",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "exp_date",
      headerName: "Expiration Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return moment(cellValues.row.exp_date).format("MMM. DD, YYYY");
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <EditInventory
            id={inventory.id}
            data={cellValues.row}
            startIcon={<Edit style={{ color: "#ff8a80" }} />}
          />
        );
      },
      sortable: false,
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Delete
            id={inventory._id}
            //name={"this entry"}
            collection="bitecases"
            data={cellValues.row}
          />
        );
      },
    },
  ];
  const handleCellClick = (param, e) => {
    e.stopPropagation();
  };
  const handleRowClick = (param, e) => {
    e.stopPropagation();
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
      }}
    >
      <PersistentDrawerLeft />
      <CssBaseline />
      <Container maxWidth="xl">
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={onClose}
            name="sucess"
          >
            <Alert severity="success" variant="filled">
              <AlertTitle>Success</AlertTitle>
              {success}
            </Alert>
          </Snackbar>
        )}
        {errors && (
          <Snackbar
            open={errors}
            autoHideDuration={3000}
            onClose={onClose}
            name="error"
          >
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              {errors}
            </Alert>
          </Snackbar>
        )}
        <Grid
          container
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Inventory
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              id="outlined-basic"
              label="Search Here..."
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <StyledButton onClick={handleOpen} margin="10">
              Add Item
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>

        <Grid item xs container flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,

              "& .restock": {
                backgroundColor: "#ff8a80",
                color: "#000",
              },
              "& .clear": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            <div style={{ height: 525, width: "auto" }}>
              {!loading && inventory && (
                <DataGrid
                  rows={inventory}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: GridToolbar }}
                  getCellClassName={(params) => {
                    if (params.field.stock === "stock") {
                      return "";
                    }
                    return params.value <= 5 ? "restock" : "clear";
                  }}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        justifyContent="center"
        transform="translate(-50%, -50%)"
        top="50%"
        position="absolute"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h4"
              color="text.primary"
              marginBottom={2}
            >
              Add Item in Inventory
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="brand_name"
                  label="Brand Name"
                  name="brand_name"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="generic_name"
                  label="Generic Name"
                  name="generic_name"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="batch_no"
                  label="Batch No."
                  name="batch_no"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="stock"
                  label="Stock"
                  name="stock"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    label="Expiration Date"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={moment(values.exp_date)}
                    name="exp_date"
                    InputProps={{ readOnly: true }}
                    onChange={(newDate) =>
                      setvalues({
                        ...values,
                        exp_date: newDate.toDate().toISOString(),
                      })
                    }
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        fullWidth
                        required
                        size="small"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <StyledButton
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Modal>
      <Footer />
    </Box>
  );
};

export default Inventory;
