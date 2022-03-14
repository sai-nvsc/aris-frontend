import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { EditPetsThunk } from "../../../redux/slices/PetSlice";
// import { addPerson, getAllPerson } from "../../redux/action/PersonActions";

const EditPet = ({ petToEdit }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imagePreview, setimagePreview] = useState(petToEdit.images);
  const [imageChanged, setimageChanged] = useState(false);
  const [images, setImages] = useState([]);
  const [open, setopen] = useState(false);

  const [values, setvalues] = useState({
    name: petToEdit.name,
    species: petToEdit.species,
    breed: petToEdit.breed,
    age: petToEdit.age,
    gender: petToEdit.gender,
    color: petToEdit.color,
  });

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setimageChanged(true);
    setimagePreview([]);
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

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("species", values.species);
    formData.append("breed", values.breed);
    formData.append("gender", values.gender);
    formData.append("color", values.color);
    formData.append("age", values.age);
    formData.append("owner", user._id);
    if (imageChanged) {
      images.forEach((image) => {
        /**
         * Use append() here instead of set(). in order not replace the current value of the image...
         */
        formData.append("images", image);
      });
    }

    dispatch(EditPetsThunk({ data: formData, id: petToEdit._id }));
    setopen(false);
    setvalues({
      name: petToEdit.name,
      species: petToEdit.species,
      breed: petToEdit.breed,
      age: petToEdit.age,
      gender: petToEdit.gender,
      color: petToEdit.color,
    });
    setimagePreview(petToEdit.images);
    setImages([]);
  };

  const handleClose = () => {
    setopen(false);
    setvalues({
      name: petToEdit.name,
      species: petToEdit.species,
      breed: petToEdit.breed,
      age: petToEdit.age,
      gender: petToEdit.gender,
      color: petToEdit.color,
    });
    setimagePreview(petToEdit.images);
    setImages([]);
  };
  const handleOpen = () => {
    setopen(true);
  };
  return (
    //   Render Block
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<Edit />}>
        Edit Pet
      </Button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit {petToEdit.name}</DialogTitle>

        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <DialogContent>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={6}>
                <StyledTextField
                  name="name"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  value={values.name}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  size="small"
                  margin="normal"
                  sx={{ backgroundColor: "white" }}
                >
                  <InputLabel>Sex</InputLabel>
                  <Select
                    label="Gender"
                    onChange={onInputChange}
                    name="gender"
                    value={values.gender}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  size="small"
                  margin="normal"
                  sx={{ backgroundColor: "white" }}
                >
                  <InputLabel>Specie</InputLabel>
                  <Select
                    label="Species"
                    onChange={onInputChange}
                    name="species"
                    value={values.species}
                  >
                    <MenuItem value="Dog">Dog</MenuItem>
                    <MenuItem value="Cat">Cat</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  name="age"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  label="Age in months"
                  value={values.age}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  name="color"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  label="Color"
                  value={values.color}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledTextField
                  name="breed"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  label="Breed"
                  value={values.breed}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  <input
                    type="file"
                    name="avatar"
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
                <ImageListItem key={img.public_id ? img.public_id : img}>
                  <img
                    src={img.url ? img.url : img}
                    key={img.public_id ? img.public_id : img}
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

export default EditPet;
