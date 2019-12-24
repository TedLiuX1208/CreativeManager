import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%"
  },
  card: {
    minWidth: "300px",
    maxWidth: "450px",
    flexBasis: "auto",
    flexGrow: "1",
    margin: "0 25px 25px 0",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      minWidth: "280px",
      maxWidth: "280px",
      flexBasis: "auto",
      flexGrow: "1",
      margin: "0 25px 25px 0",
      position: "relative"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  btn: {
    displa: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  hide: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      opacity: "0"
    }
  },
  edit: {
    position: "absolute",
    right: "0"
  }
}));
export default ({ creative, id }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.card, creative.stack && classes.hide)}>
      {/* <CardHeader
        action={
          <IconButton aria-label="settings">
            <EditIcon />
          </IconButton>
        }
      /> */}
      <IconButton className={classes.edit}>
        <EditIcon fontSize="large" color="action" />
      </IconButton>

      <CardMedia
        className={classes.media}
        image="https://material-ui.com/static/images/cards/live-from-space.jpg"
        title="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Advertiser : {creative.advertiser}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          CampaignName : {creative.campaign}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {creative.startDate} - {creative.endDate}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {creative.dimension}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.btn}>
        <IconButton aria-label="download">
          <GetAppIcon />
        </IconButton>
        <IconButton aria-label="preview">
          <VisibilityIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
