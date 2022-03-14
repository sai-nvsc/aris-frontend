import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import { Box, Container, Grid, Modal, Typography } from "@mui/material";
import {
  StyledTextField,
  StyledButton,
  EditButton,
} from "../../../assets/styles";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { EditInvThunk } from "../../../redux/slices/InventorySlice";
import moment from "moment";

const EditInventory = ({ data, id }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [values, setvalues] = useState({
    brand_name: data.brand_name,
    generic_name: data.generic_name,
    batch_no: data.batch_no,
    stock: data.stock,
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

    dispatch(EditInvThunk({ data: formData, id: data._id }));

    setOpen(false);
    setvalues({
      brand_name: data.brand_name,
      generic_name: data.generic_name,
      batch_no: data.batch_no,
      stock: data.stock,
      exp_date: data.exp_date,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setvalues({
      brand_name: data.brand_name,
      generic_name: data.generic_name,
      batch_no: data.batch_no,
      stock: data.stock,
      exp_date: data.exp_date,
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <EditButton
        onClick={handleOpen}
        startIcon={<Edit style={{ color: "#ff8a80" }} />}
      >
        Edit
      </EditButton>

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
        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
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
                  />
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
                  flexDirection: "row",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledButton type="submit" variant="contained">
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
        </form>
      </Modal>
    </>
  );
};

export default EditInventory;
