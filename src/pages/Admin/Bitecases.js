import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDelete from "../../components/Layouts/Dialogs/AdminDelete";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Chip,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { StyledTextField, StyledLink } from "../../assets/styles";

import moment from "moment";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import {
  GetAllCaseThunk,
  clearError,
  clearSuccess,
} from "../../redux/slices/BiteCaseSlice";
import EditBiteCase from "./AdminCRUD/EditBiteCase";
import AddBiiteCase from "./AdminCRUD/AddBiiteCase";

const Bitecases = () => {
  const { bitecase, loading, errors, success } = useSelector(
    (state) => state.bitecase
  );
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [values, setvalues] = useState({
    search: "",
  });
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(GetAllCaseThunk({ id: user.clinic }));
    return () => {};
  }, [dispatch, user]);

  //modals

  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  //Datagrid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
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
      field: "sex",
      headerName: "Sex",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      valueGetter: (cellValues) => {
        return cellValues.row.user[0].sex;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "address",
      headerName: "Add.",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 160,
      valueGetter: (cellValues) => {
        return cellValues.row.user[0].address;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "date",
      headerName: "When",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.history_of_exposure.date).format("MMM. DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "place",
      headerName: "Where",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      valueGetter: (cellValues) => {
        return cellValues.row.history_of_exposure.place;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
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
      valueGetter: (cellValues) => {
        return cellValues.row.history_of_exposure.type_of_exposure;
      },
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
      minWidth: 110,
      renderCell: (cellValues) => {
        if (cellValues.row.status_of_vaccination === "On-going") {
          return (
            <Chip
              color="primary"
              label={cellValues.row.status_of_vaccination}
            ></Chip>
          );
        } else if (cellValues.row.status_of_vaccination === "Cleared") {
          return (
            <Chip
              color="success"
              label={cellValues.row.status_of_vaccination}
            ></Chip>
          );
        } else if (cellValues.row.status_of_vaccination === "Untracked") {
          return <Chip label={cellValues.row.status_of_vaccination}></Chip>;
        }
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 240,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              component={StyledLink}
              to={`/admin/bitecase/print/${cellValues.row._id}`}
            >
              <PrintIcon style={{ fontSize: "medium", color: "#000" }} />
            </Button>
            <Button
              component={StyledLink}
              to={`/admin/bitecase/get/${cellValues.row._id}`}
            >
              <VisibilityIcon style={{ fontSize: "medium", color: "#000" }} />
            </Button>
            <EditBiteCase
              id={bitecase.id}
              data={cellValues.row}
              startIcon={<Edit style={{ color: "#ff8a80" }} />}
            />
            <AdminDelete
              id={cellValues.id}
              collection="bitecases"
              data={cellValues.row}
            />
          </>
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

  const PressedEnter = (e) => {
    if (e.code === "Enter" && e.target.value !== "") {
      window.location.assign(`/admin/bitecase/get/${e.target.value}`);
    }
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <PersistentDrawerLeft title="Bite Cases" />
      <CssBaseline />
      <Container maxWidth="xl">
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={onClose}
            name="success"
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
              color="text.primary"
              gutterBottom
            >
              Bite Cases
            </Typography>
          </Grid>

          <Grid item>
            <Typography component="span">
              Scan Bite Case QR Code:{" "}
              <StyledTextField
                size="small"
                name="search"
                value={values.search}
                label="Press 'Enter' After Scan"
                onChange={handleChange}
                onKeyUp={PressedEnter}
              />
            </Typography>
          </Grid>

          <Grid item>
            <AddBiiteCase />
          </Grid>
        </Grid>
        <Grid item sm flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 2,
              pb: 6,

              "& .On-going": {
                backgroundColor: "#ebebeb",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#fff",
                },
              },
              "& .Cleared": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            <div style={{ height: 520, width: "100%" }}>
              {!loading && bitecase && (
                <DataGrid
                  rows={bitecase}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: GridToolbar }}
                  loading
                  {...bitecase}
                  getCellClassName={(params) => {
                    if (
                      params.field.status_of_vaccination ===
                      "status_of_vaccination"
                    ) {
                      return "";
                    }
                    return params.value === "On-going" ? "On-going" : "Cleared";
                  }}
                  sx={{
                    boxShadow: 2,
                    "& .MuiDataGrid-cell:hover": {
                      color: "#f32727",
                    },
                  }}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Bitecases;
