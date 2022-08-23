import { useState } from "react";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import {
  StyledTextField,
  StyledButton,
  EditButton,
} from "../../../assets/styles";
import { useDispatch, useSelector } from "react-redux";
import { EditAccountSuperAdminThunk } from "../../../redux/slices/AdminSlices";

const EditAcc = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [values, setvalues] = useState({
    admin_name: data.admin_name,
    role: data.role,
    email: data.email,
    username: data.username,
    clinic:data.clinic
  });

  const onInputChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("admin_name", values.admin_name);
    formData.append("role", values.role);
    formData.append("clinic", user.clinic);
    formData.append("email", values.email);
    formData.append("username", values.username);

    dispatch(EditAccountSuperAdminThunk({ data: formData, id: data._id }));

    setOpen(false);
    setvalues({
      admin_name: data.admin_name,
      role: data.role,
      email: data.email,
      username: data.username,
      clinic:data.clinic
    });
  };

  const handleClose = () => {
    setOpen(false);
    setvalues({
      admin_name: data.admin_name,
      role: data.role,
      email: data.email,
      username: data.username,
      clinic:data.clinic
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <EditButton onClick={handleOpen} startIcon={<Edit />}></EditButton>

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
                Edit Account
              </Typography>

              <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="admin_name"
                    label="admin_name"
                    name="admin_name"
                    size="small"
                    value={values.admin_name}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="role"
                      name="role"
                      id="role"
                      value={values.role}
                      onChange={onInputChange}
                    >
                       <MenuItem value="superadmin" disabled="true">
                        superadmin
                      </MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                      <MenuItem value="vaccinator">vaccinator</MenuItem>
                      <MenuItem value="inventory">inventory</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="clinic"
                    label="Clinic"
                    name="clinic"
                    size="small"
                    value={values.clinic}
                    disabled="true"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    size="small"
                    value={values.email}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    size="small"
                    value={values.username}
                    onChange={onInputChange}
                  />
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

export default EditAcc;
