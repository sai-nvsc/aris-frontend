import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Dialog,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
import AdminDelete from "../../components/Layouts/Dialogs/AdminDelete";
import EditInventory from "../Admin/AdminCRUD/EditInventory";
import moment from "moment";
import InventoryAlert from "../../helpers/InventoryAlerts";
import { CustomInventoryGrid } from "../../helpers/GridExport";
const Inventory = () => {
  const { inventory, loading, errors, success, add_errors } = useSelector(
    (state) => state.inventory
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [values, setvalues] = useState({
    brand_name: "",
    generic_name: "",
    batch_no: "",
    stock: "",
    exp_date: moment().startOf("day"),
    delivery_date: moment().startOf("day"),
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
    formData.append("delivery_date", values.delivery_date);
    formData.append("clinic", user.clinic);
    dispatch(AddInvThunk({ data: formData }));
    // setOpen(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setvalues({
      ...values,
      brand_name: "",
      generic_name: "",
      batch_no: "",
      stock: "",
      exp_date: moment().startOf("day"),
      delivery_date: moment().startOf("day"),
    });
    setOpen(false);
    dispatch(clearSuccess());
    dispatch(clearError());
  };
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
      minWidth: 115,
    },
    {
      field: "generic_name",
      headerName: "Generic Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 115,
    },
    {
      field: "batch_no",
      headerName: "Lot No.",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 65,
    },
    {
      field: "delivery_date",
      headerName: "Delivery Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.delivery_date).format("MMM. DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "exp_date",
      headerName: "Exp. Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.exp_date).format("MMM DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 85,
      renderCell: (cellValues) => {
        return (
          <>
            <EditInventory
              id={inventory.id}
              data={cellValues.row}
              startIcon={<Edit style={{ color: "#ff8a80" }} />}
            />
            <AdminDelete
              id={cellValues.row._id}
              //name={"this entry"}
              collection="inventory"
              data={cellValues.row}
            />
          </>
        );
      },
      sortable: false,
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
      }}
    >
      <PersistentDrawerLeft title="Clinic's Inventory" />
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
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Inventory
            </Typography>
          </Grid>

          <Grid item>
            <StyledButton
              onClick={handleOpen}
              margin="10"
              startIcon={<AddIcon />}
            >
              Add Item
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>

        <Grid item xs flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 3,
              pb: 17,

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
            <div style={{ height: 500, width: "auto" }}>
              {!loading && inventory && (
                <>
                  <InventoryAlert />
                  <DataGrid
                    rows={inventory}
                    columns={columns}
                    getRowId={(row) => row._id}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    components={{ Toolbar: CustomInventoryGrid }}
                    {...inventory}
                    getCellClassName={(params) => {
                      if (params.field.stock === "stock") {
                        return "";
                      }
                      return params.value <= 5 ? "restock" : "clear";
                    }}
                  />
                </>
              )}
            </div>
          </Box>
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
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
                  error={add_errors && add_errors.brand_name ? true : false}
                  helperText={
                    add_errors && add_errors.brand_name
                      ? add_errors.brand_name
                      : ""
                  }
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
                  error={add_errors && add_errors.generic_name ? true : false}
                  helperText={
                    add_errors && add_errors.generic_name
                      ? add_errors.generic_name
                      : ""
                  }
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
                  error={add_errors && add_errors.batch_no ? true : false}
                  helperText={
                    add_errors && add_errors.batch_no ? add_errors.batch_no : ""
                  }
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
                  error={add_errors && add_errors.brand_name ? true : false}
                  helperText={
                    add_errors && add_errors.stock ? add_errors.stock : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    label="Delivery Date"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={moment(values.delivery_date)}
                    name="delivery_date"
                    disableFuture={true}
                    InputProps={{ readOnly: true }}
                    onChange={(newDate) =>
                      setvalues({
                        ...values,
                        delivery_date: newDate.startOf("day").toDate(),
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

              <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    label="Expiration Date"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={moment(values.exp_date)}
                    name="exp_date"
                    disablePast={true}
                    InputProps={{ readOnly: true }}
                    onChange={(newDate) =>
                      setvalues({
                        ...values,
                        exp_date: newDate.startOf("day").toDate(),
                      })
                    }
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        fullWidth
                        required
                        size="small"
                        readOnly
                        error={add_errors && add_errors.exp_date ? true : false}
                        helperText={
                          add_errors && add_errors.exp_date
                            ? add_errors.exp_date
                            : ""
                        }
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
      </Dialog>
      <br />
      <Footer />
    </Box>
  );
};

export default Inventory;
