export const createCreative = creative => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("creatives")
      .add({
        ...creative,
        _author: `${profile.firstName} ${profile.lastName}`,
        _authorId: authorId,
        _createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "CREATE_CREATIVE",
          creative
        });
      })
      .catch(err => {
        dispatch({ type: "CREATE_CREATIVE_ERROR", err });
      });
  };
};
