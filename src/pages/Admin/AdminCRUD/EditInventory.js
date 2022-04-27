import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { Box, Container, Dialog, Grid, Typography } from "@mui/material";
import {
  StyledTextField,
  StyledButton,
  EditButton,
} from "../../../assets/styles";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { clearError, EditInvThunk } from "../../../redux/slices/InventorySlice";
import moment from "moment";
import { clearSuccess } from "../../../redux/slices/AppointmentSlice";

const EditInventory = ({ data, id }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { add_errors } = useSelector((state) => state.inventory);
  const [values, setvalues] = useState({
    brand_name: data.brand_name,
    generic_name: data.generic_name,
    batch_no: data.batch_no,
    stock: data.stock,
    delivery_date: data.delivery_date,
    exp_date: data.exp_date,
  });

  const onInputChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("brand_name", values.brand_name);
    formData.append("generic_name", values.generic_name);
    formData.append("batch_no", values.batch_no);
    formData.append("stock", values.stock);
    formData.append("exp_date", values.exp_date);
    formData.append("clinic", user.clinic);
    formData.append("delivery_date", values.delivery_date);

    dispatch(EditInvThunk({ data: formData, id: data._id }));
  };

  const handleClose = () => {
    setOpen(false);
    setvalues({
      brand_name: data.brand_name,
      generic_name: data.generic_name,
      batch_no: data.batch_no,
      stock: data.stock,
      delivery_date: data.delivery_date,
      exp_date: data.exp_date,
    });
    dispatch(clearError());
    dispatch(clearSuccess());
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <EditButton onClick={handleOpen} startIcon={<Edit />}></EditButton>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
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
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h4"
              color="text.primary"
              marginBottom={3}
            >
              Edit Item
            </Typography>

            <Grid container spacing={3}>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="Brand Name"
                  name="brand_name"
                  size="small"
                  value={values.brand_name}
                  onChange={onInputChange}
                  error={add_errors && add_errors.brand_name ? true : false}
                  helperText={
                    add_errors && add_errors.brand_name
                      ? add_errors.brand_name
                      : ""
                  }
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="Generic Name"
                  name="generic_name"
                  size="small"
                  value={values.generic_name}
                  onChange={onInputChange}
                  error={add_errors && add_errors.generic_name ? true : false}
                  helperText={
                    add_errors && add_errors.generic_name
                      ? add_errors.generic_name
                      : ""
                  }
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="Batch No."
                  name="batch_no"
                  size="small"
                  value={values.batch_no}
                  onChange={onInputChange}
                  error={add_errors && add_errors.batch_no ? true : false}
                  helperText={
                    add_errors && add_errors.batch_no ? add_errors.batch_no : ""
                  }
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  label="Stock"
                  name="stock"
                  size="small"
                  value={values.stock}
                  onChange={onInputChange}
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

              <Grid item sm={12} md={6}>
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
                        exp_date: newDate.startOf("day").toDate(),
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
                flexDirection: "row",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledButton
                type="submit"
                variant="contained"
                onClick={formHandler}
              >
                Edit
              </StyledButton>
              <StyledButton
                variant="outlined"
                //sx={{ mt: 3, mb: 2 }}
                onClick={handleClose}
              >
                Cancel
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};

export default EditInventory;
