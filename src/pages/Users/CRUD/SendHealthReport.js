import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { SendHealthReportThunk } from "../../../redux/slices/VaccineSlice";
// import { addPerson, getAllPerson } from "../../redux/action/PersonActions";

const SendHealthReport = () => {
  const { user } = useSelector((state) => state.user);
  const { bites, input_errors } = useSelector((state) => state.vaccine);
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);

  const [values, setvalues] = useState({
    bite_case: bites[0]._id,
    user: user._id,
    clinic: bites[0].clinic,
    type: "",
    desc: "",
  });

  // const onChange = (e) => {
  //   console.log(e.target.files);
  //   const files = Array.from(e.target.files);
  //   setimagePreview([]);
  //   setImages([]);
  //   console.log(files[0]);
  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setimagePreview((oldArray) => [...oldArray, reader.result]);
  //         setImages((oldArray) => [...oldArray, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  const onInputChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();

    formData.append("user", values.user);
    formData.append("clinic", values.clinic);
    formData.append("bitecase", values.bite_case);
    formData.append("type", values.type);
    formData.append("description", values.desc);
    // formData.append("age", values.age);
    // formData.append("owner", user._id);
    // images.forEach((image) => {
    //   /**
    //    * Use append() here instead of set(). in order not replace the current value of the image...
    //    */
    //   formData.append("images", image);
    // }
    // );
    dispatch(SendHealthReportThunk(formData));
    // setopen(false);
    // setvalues({
    //   bite_case: bites._id,
    //   user: user._id,
    //   clinic: bites.clinic,
    //   type: "",
    //   desc: "",
    // });
    // setimagePreview([]);
    // setImages([]);
  };

  const handleClose = () => {
    setopen(false);
    setvalues({
      bite_case: bites[0]._id,
      user: user._id,
      clinic: bites[0].clinic,
      type: "",
      desc: "",
    });
    // setimagePreview([]);
    // setImages([]);
  };
  const handleOpen = () => {
    setopen(true);
    console.log(values);
  };
  return (
    //   Render Block
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={<Add />}>
        Send Health Report
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Send Health Report</DialogTitle>

        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <DialogContent>
            <Typography variant="body1" marginBottom={3}>
              <i>
                Note: Health Reports cannot be deleted once it was submitted. We
                in ARIS take every health reports seriously. Please be cautious
                of your reports and send rabies-related reports only.
              </i>
            </Typography>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12}>
                <FormControl
                  error={input_errors && input_errors.type ? true : false}
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Report Type:
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="type"
                    value={values.type}
                    onChange={onInputChange}
                  >
                    <FormControlLabel
                      value="Death of Animal"
                      control={<Radio />}
                      label="Death of Animal"
                    />
                    <FormControlLabel
                      value="Reactions to Vaccine"
                      control={<Radio />}
                      label="Reactions to the Vaccine"
                    />
                    <FormControlLabel
                      value="Others"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                  {input_errors && input_errors.type ? (
                    <FormHelperText>{input_errors.type}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  multiline
                  rows={4}
                  label="Short Description"
                  size="small"
                  id="outlined-multiline-static"
                  fullWidth
                  name="desc"
                  onChange={onInputChange}
                  value={values.desc}
                  error={
                    input_errors && input_errors.description ? true : false
                  }
                  helperText={
                    input_errors && input_errors.description
                      ? input_errors.description
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SendHealthReport;
