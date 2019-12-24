import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { map } from "lodash";
import Dropzone from "react-dropzone";

// function Basic(props) {
//   const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
//     disabled: true
//   });

//   const files = acceptedFiles.map(file => (
//     <li key={file.name}>
//       {file.name} - {file.size} bytes
//     </li>
//   ));

//   return (
//     <section className="container">
//       <div {...getRootProps({className: 'dropzone disabled'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// }

const Playground = ({ drawWidth, open, uploadedFiles, firebase }) => {
  // Uploads files and push's objects containing metadata to database at dbPath
  const useStyles = makeStyles(theme => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    subNav: {
      marginBottom: "20px",
      padding: "0"
    }
  }));

  const classes = useStyles();

  const onFilesDrop = files => {
    // uploadFiles(storagePath, files, dbPath)
    // return firebase.uploadFiles("testFolder", files, filesPath);
    return firebase
      .storage()
      .refFromURL("gs://tedtestproject-236308.appspot.com/testFolder")
      .put(files);
  };

  // Deletes file and removes metadata from database
  const onFileDelete = (file, key) => {
    // deleteFile(storagePath, dbPath)
    return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  };

  const addTestFile = () => {
    const storage = firebase.storage();
    const storageRef = storage().ref();
    const fileRef = storageRef.child("test.txt");
    return fileRef
      .putString("Some File Contents")
      .then(snap => console.log("upload successful", snap))
      .catch(err => console.error("error uploading file", err));
  };
  (() => {
    // console.log(firebase.storage().ref().child("testFolder"));
    console.log(
      firebase
        .storage()
        .refFromURL("gs://tedtestproject-236308.appspot.com/testFolder")
        .fullPath
    );
  })();
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open
      })}
    >
      <div className={classes.drawerHeader} />

      <Dropzone onDrop={onFilesDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles, (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
              <button onClick={() => onFileDelete(file, key)}>
                Delete File
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

const filesPath = "TedTestProject";

const mapStateToProps = state => {
  // console.log(state);
  return {
    uploadedFiles: state.firebase.data[filesPath]
  };
};
// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedFiles
export default compose(
  firebaseConnect(["testFolder"]),
  connect(mapStateToProps)

  // firebaseConnect((props, store) => {
  //   console.log(store.firebase.storage)
  //   return [
  //     `TedTestProject/${store.getState().firebase.auth.uid}`
  //   ]
  // })
)(Playground);
