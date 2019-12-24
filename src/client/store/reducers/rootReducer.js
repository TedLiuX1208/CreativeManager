import authReducer from "./authReducer";
import creativeReducer from "./creativeReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  creative: creativeReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
