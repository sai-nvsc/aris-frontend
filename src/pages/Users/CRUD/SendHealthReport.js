import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { SendHealthReportThunk } from "../../../redux/slices/VaccineSlice";
// import { addPerson, getAllPerson } from "../../redux/action/PersonActions";

const SendHealthReport = () => {
  const { user } = useSelector((state) => state.user);
  const { bites, vaxx } = useSelector((state) => state.vaccine);
  const dispatch = useDispatch();
  const [imagePreview, setimagePreview] = useState([]);
  const [images, setImages] = useState([]);
  const [open, setopen] = useState(false);
  
  const [values, setvalues] = useState({
    bite_case: bites[0]._id,
    user: user._id,
    clinic: bites[0].clinic,
    type: "",
    desc: "",
  });

  const onChange = (e) => {
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    setimagePreview([]);
    setImages([]);
    console.log(files[0]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagePreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

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
    setimagePreview([]);
    setImages([]);
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
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12}>
                <FormControl>
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
                ></StyledTextField>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  <input
                    type="file"
                    name="report_image"
                    accept="images/*"
                    multiple
                    onChange={onChange}
                    hidden
                  />
                  Upload Pictures
                </Button>
              </Grid>
            </Grid>
            <ImageList cols={6} rowHeight={100}>
              {imagePreview.map((img) => (
                <ImageListItem key={img}>
                  <img
                    src={img}
                    key={img}
                    alt="things to be uploaded"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
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
