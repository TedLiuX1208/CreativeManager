import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Paper,
  Container,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormHelperText,
  ButtonBase,
  Divider
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { createCreative } from "../../../client/store/actions/creativeActions";
// import moduleSchema from "./moduleSchema.json";
import uuid from "uuid";
import dayjs from "dayjs";

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const moduleSchema = [
  {
    moduleName: "Video-In-Banner",
    imageAsset: ["Background Image"],
    imageFormat: "JPG/PNG/GIF",
    videoAsset: ["Main Video"],
    videoFormat: "MP4",
    landingUrl: ["https://"],
    dimension: ["300x250", "320x480", "970x250"]
  },
  {
    moduleName: "Video Ads",
    imageAsset: [],
    imageFormat: "JPG/PNG/GIF",
    videoAsset: ["Main Video"],
    videoFormat: "MP4",
    landingUrl: ["https://"],
    dimension: ["300x250", "320x480"]
  },
  {
    moduleName: "Parallax Video-In-Banner",
    imageAsset: ["Background Image"],
    imageFormat: "JPG/PNG/GIF",
    videoAsset: ["Main Video"],
    videoFormat: "MP4",
    landingUrl: ["https://"],
    dimension: ["300x250", "320x480"]
  },
  {
    moduleName: "Flip Video Ads",
    imageAsset: [],
    imageFormat: "JPG/PNG/GIF",
    videoAsset: ["Main Video"],
    videoFormat: "MP4",
    landingUrl: ["https://"],
    dimension: ["300x250"]
  }
];

const CreateCreative = ({ createCreative }) => {
  const useStyles = makeStyles(theme => ({
    subNav: {
      marginBottom: "20px",
      padding: "0"
    },
    uploadInput: {
      display: "none"
    }
  }));

  const [ownerState, setOwnerState] = useState({
    campaign: "",
    advertiser: "",
    startDate: new Date(),
    endDate: new Date(),
    module: "Video-In-Banner",
    dimension: "300x250",
    landingUrl: "",
    id: uuid(),
    stack: false
  });
  const handleOwnerChange = e => {
    setOwnerState({
      ...ownerState,
      [e.target.name]: e.target.value
    });
    // console.log(ownerState)
  };

  const handleStartDate = date => {
    setOwnerState({
      ...ownerState,
      startDate: date
    });
  };

  const handleEndDate = date => {
    setOwnerState({
      ...ownerState,
      endDate: date
    });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { startDate, endDate, ...rem } = ownerState;
    const newState = {
      ...rem,
      startDate: dayjs(startDate).format("YYYY/MM/DD"),
      endDate: dayjs(endDate).format("YYYY/MM/DD")
    };
    createCreative({
      ...newState
    });
    setOwnerState({
      ...ownerState,
      campaign: "",
      advertiser: "",
      startDate: new Date(),
      endDate: new Date(),
      landingUrl: "",
      module: "Video-In-Banner",
      dimension: "300x250",
      landing: ""
    });

    // console.log(ownerState);
  };

  const classes = useStyles();
  (() => {
    // console.log(createCreative);
  })();
  return (
    <div>
      <Container maxWidth={false} className={classes.subNav}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          add Creative
        </Button>
      </Container>
      <Dialog
        open={open}
        maxWidth="lg"
        scroll="paper"
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Campaign Settings
          </DialogTitle>
          <DialogContent
            style={{ paddingBottom: "30px", boxSizing: "border-box" }}
          >
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here.
              We will send updates occasionally.
            </DialogContentText> */}
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  id="Campaign Name"
                  label="Campaign Name"
                  style={{ margin: 8 }}
                  placeholder=""
                  helperText=""
                  fullWidth
                  name="campaign"
                  value={ownerState["campaign"]}
                  onChange={handleOwnerChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="Advertiser Name"
                  label="Advertiser Name"
                  style={{ margin: 8 }}
                  placeholder=""
                  helperText=""
                  fullWidth
                  name="advertiser"
                  value={ownerState["advertiser"]}
                  onChange={handleOwnerChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="startTime"
                    label="Start Time"
                    value={ownerState["startDate"]}
                    onChange={handleStartDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="endTime"
                    label="End Time"
                    value={ownerState["endDate"]}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Creative Settings
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="module">
                    Module
                  </InputLabel>
                  <Select
                    labelId="module"
                    id="demo-simple-select-placeholder-label"
                    inputProps={{
                      name: "module"
                    }}
                    value={ownerState["module"]}
                    onChange={handleOwnerChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="Video-In-Banner">Video-In-Banner</MenuItem>
                    <MenuItem value="Video Ads">Video Ads</MenuItem>
                    <MenuItem value="Parallax Video-In-Banner">
                      Parallax Video-In-Banner
                    </MenuItem>
                    <MenuItem value="Flip Video Ads">Flip Video Ads</MenuItem>
                  </Select>
                  {/* <FormHelperText>Label + placeholder</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="dimension">
                    Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="dimension"
                    inputProps={{
                      name: "dimension"
                    }}
                    value={ownerState["dimension"]}
                    onChange={handleOwnerChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    {moduleSchema
                      .filter(
                        item => item.moduleName == ownerState["module"]
                      )[0]
                      ["dimension"].map(item => {
                        return (
                          <MenuItem value={item} key={uuid()}>
                            {item}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {/* <FormHelperText>Label + placeholder</FormHelperText> */}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {moduleSchema
                  .filter(item => item.moduleName == ownerState["module"])[0]
                  ["videoAsset"].map((item, index) => {
                    return (
                      <div key={uuid()}>
                        <p>{`Upload the ${item} `}</p>
                        <p>{`Format : ${
                          moduleSchema.filter(
                            item => item.moduleName == ownerState["module"]
                          )[0]["videoFormat"]
                        }`}</p>
                        <input
                          accept="image/*"
                          className={classes.uploadInput}
                          id="videoFile"
                          // multiple
                          type="file"
                        />
                        <label htmlFor="videoFile">
                          <Button variant="outlined" component="span">
                            Video Upload
                          </Button>
                        </label>
                      </div>
                    );
                  })}
              </Grid>
              <Grid item xs={12}>
                {moduleSchema
                  .filter(item => item.moduleName == ownerState["module"])[0]
                  ["imageAsset"].map((item, index) => {
                    return (
                      <div key={uuid()}>
                        <p>{`Upload the ${item} `}</p>
                        <p>{`Format : ${
                          moduleSchema.filter(
                            item => item.moduleName == ownerState["module"]
                          )[0]["imageFormat"]
                        }`}</p>
                        <input
                          accept="image/*"
                          className={classes.uploadInput}
                          id="videoFile"
                          // multiple
                          type="file"
                        />
                        <label htmlFor="videoFile">
                          <Button variant="outlined" component="span">
                            image Upload
                          </Button>
                        </label>
                      </div>
                    );
                  })}
              </Grid>
              <Grid item xs={12}>
                {moduleSchema
                  .filter(item => item.moduleName == ownerState["module"])[0]
                  ["landingUrl"].map((item, index) => {
                    return (
                      <div key={`landingUrl${index}`}>
                        <TextField
                          id={`landingUrl${index}`}
                          label={`landingUrl${index + 1}`}
                          style={{ margin: 8 }}
                          placeholder={item}
                          helperText=""
                          fullWidth
                          margin="normal"
                          name="landingUrl"
                          value={ownerState["landingUrl"]}
                          onChange={handleOwnerChange}
                          InputLabelProps={{
                            shrink: true
                          }}
                        />
                      </div>
                    );
                  })}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "flex-end" }}>
            <Button
              onClick={handleClose}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createCreative: creative => dispatch(createCreative(creative))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateCreative);
