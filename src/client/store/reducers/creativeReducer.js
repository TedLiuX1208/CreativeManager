const initState = {
  creatives: [
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "1",
    //   stack: false
    // },
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "2",
    //   stack: false
    // },
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "3",
    //   stack: false
    // },
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "4",
    //   stack: false
    // },
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "5",
    //   stack: true
    // },
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "6",
    //   stack: true
    // },
    // {
    //   advertiser: "MC",
    //   campaign: "MC_PMP_1121",
    //   startDate: "2019/11/21",
    //   endDate: "2020/12/21",
    //   dimension: "300x250",
    //   id: "7",
    //   stack: true
    // }
  ]
};

const creativeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_CREATIVE":
      console.log("create creative", action.creative);
      return state;
    case "CREATE_CREATIVE_ERROR":
      console.log("error", action.err);
      return state;
    default:
      return state;
  }
};

export default creativeReducer;
