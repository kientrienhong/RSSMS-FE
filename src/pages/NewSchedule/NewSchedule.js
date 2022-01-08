import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { Grid, Box, Typography, Modal } from "@material-ui/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import ListDateComponent from "./components/ListDateComponent";
import ListItemSidebar from "./components/ListItemSidebar";
import { LIST_TIME } from "../../constant/constant";
import OrderModal from "../../components/OrderModal";
import {
  getTimeEnd,
  getTimeStart,
  isDateAfter,
  isDateBefore,
} from "../../utils/DateUtils";
import { getOrder, getSchedule } from "../../apis/Apis";
import ScheduleArea from "./components/ScheduleArea";

function NewSchedule({ showLoading, hideLoading, userState }) {
  const [listDateAWeek, setListDateAWeek] = useState([]);
  const [currentIndexDate, setCurrentIndexDate] = useState(-1);
  const [currentIndexGroup, setCurrentIndexGroup] = useState(0);
  const [listSelectedOrder, setListSelectedOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, watch } = useForm();

  const [listOrderNotAssignedReturnTime, setListOrderNotAssignedReturnTime] =
    React.useState([]);
  const [listScheduleWholeWeek, setListScheduleWholeWeek] = useState([]);
  const [listScheduleCurrentDate, setListScheduleCurrentDate] = useState([]);
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormatDate = (date, result, order, value) => {
    if (value === "returnTime" && order[value] === null) {
      let listOrderNotAssignedTemp = [...listOrderNotAssignedReturnTime];
      listOrderNotAssignedTemp.push(order);
      setListOrderNotAssignedReturnTime(listOrderNotAssignedTemp);
      return;
    }

    if (value === "returnTime") {
      order = { ...order, isDelivery: false };
    } else {
      order = { ...order, isDelivery: true };
    }
    // if (Object.keys(result).length > 0) {
    let currentDate = Object.keys(result)?.find((e) => {
      if (e === date.toLocaleDateString("en-US")) {
        return true;
      }
    });
    // }
    // if (currentDate) {
    result[currentDate].get(order[value]).push(order);
    // } else {
    // let listTime = {};

    // LIST_TIME.forEach((e) => (listTime[e.name] = []));
    // result[date.toLocaleDateString("en-US")] = listTime;
    // result[date.toLocaleDateString("en-US")][order[value]].push(order);
    // }
  };

  const getData = async (startOfWeek, endOfWeek) => {
    try {
      showLoading();
      let currStr = new Date().toLocaleDateString("en-US");

      let result = {};
      let currentIndexDateLocal = 0;
      if (startOfWeek.toLocaleDateString("en-US") === currStr) {
        setCurrentIndexDate(0);
      }

      let listDateAWeekTemp = [];
      for (let i = 0; i < 7; i++) {
        let date = addDays(startOfWeek, i);
        let dateStr = date.toLocaleDateString("en-US");
        let listTime = new Map();

        LIST_TIME.forEach((e) => listTime.set(e["name"], []));
        result[dateStr] = listTime;
        if (dateStr === currStr) {
          setCurrentIndexDate(i);
          currentIndexDateLocal = i;
        }
        listDateAWeekTemp.push(date);
      }
      setListDateAWeek(listDateAWeekTemp);

      let response = await getOrder(
        "",
        "",
        "",
        startOfWeek.toISOString().split("T")[0],
        endOfWeek.toISOString().split("T")[0],
        userState.idToken,
        "OrderStatuses=2&OrderStatuses=3&OrderStatuses=4"
      );
      response?.data?.data
        ?.filter((e) => e.status !== 0)
        ?.forEach((e) => {
          let dateDelivery = new Date(e.deliveryDate);
          let dateReturn = new Date(e.returnDate);
          if (
            isDateBefore(dateReturn, endOfWeek) === true &&
            isDateAfter(dateReturn, startOfWeek) === true
          ) {
            handleFormatDate(dateReturn, result, e, "returnTime");
          } else {
            handleFormatDate(dateDelivery, result, e, "deliveryTime");
          }
        });
      setListScheduleWholeWeek(result);
      setListScheduleCurrentDate(
        result[Object.keys(result)[currentIndexDateLocal]]
      );
      return result;
      // try {
      //   let responseSchedule = await getSchedule(
      //     startOfWeek.toISOString().split("T")[0],
      //     endOfWeek.toISOString().split("T")[0],
      //     userState.idToken
      //   );

      //   if (responseSchedule.data.data) {
      //     responseSchedule.data.data.forEach((schedule) => {
      //       result.forEach((e) => {
      //         let index = e.ListOrder.findIndex(
      //           (ele) => ele.id === schedule.orderId
      //         );
      //         e.ListOrder[index] = {
      //           ...e.ListOrder[index],
      //           listStaffDelivery: schedule.users,
      //         };
      //       });
      //     });
      //     console.log(result);
      //     setListSchedule(result);
      //   }
      // } catch (exception) {
      //   console.log(exception.response);
      // }
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        let curr = new Date();

        if (curr.getDate() === 6) {
          curr.setDate(curr.getDate() - 2);
        } else if (curr.getDate() === 0) {
          curr.setDate(curr.getDate() + 2);
        }
        curr = curr.toISOString().split("T")[0]; // get current date
        let dateSplit = curr.split("-");
        let currentMoment = moment().set({
          year: parseInt(dateSplit[0]),
          month: parseInt(dateSplit[1]) - 1,
          date: parseInt(dateSplit[2]),
        });
        let startOfWeek = currentMoment.startOf("week").toDate();
        let endOfWeek = currentMoment.endOf("week").toDate();

        // setStartOfWeek(startOfWeek);
        // setEndOfWeek(endOfWeek);

        showLoading();

        let result = await getData(startOfWeek, endOfWeek);

        // let currentListDateAWeek = listDateAWeekTemp[currentIndexDateLocal];

        // Object.keys(result).find((e) => e === currentListDateAWeek.toLocaleDateString("en-US"));

        // try {
        //   let responseSchedule = await getScheduleEffect(
        //     startOfWeek.toISOString().split("T")[0],
        //     endOfWeek.toISOString().split("T")[0],
        //     userState.idToken
        //   );

        //   if (responseSchedule.data.data) {
        //     responseSchedule.data.data.forEach((schedule) => {
        //       result.forEach((e) => {
        //         let index = e.ListOrder.findIndex(
        //           (ele) => ele.id === schedule.orderId
        //         );
        //         e.ListOrder[index] = {
        //           ...e.ListOrder[index],
        //           listStaffDelivery: schedule.users,
        //         };
        //       });
        //     });
        //   }
        // } catch (exception) {
        //   console.log(exception.response);
        // }
        // setListSchedule(result);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        overflowX: "scroll",
        overflowY: "hidden",
        py: 3,
      }}
    >
      <OrderModal
        open={open}
        handleClose={handleClose}
        currentOrder={currentOrder}
        control={control}
        isView={true}
      />
      <ListDateComponent
        listScheduleWholeWeek={listScheduleWholeWeek}
        currentIndex={currentIndexDate}
        setListScheduleCurrentDate={setListScheduleCurrentDate}
        listDateAWeek={listDateAWeek}
        setCurrentIndexDate={setCurrentIndexDate}
      />
      <Box
        sx={{
          margin: "1% 4%",
          display: "flex",
          width: "90%",
          justifyContent: "right",
        }}
      >
        <Typography
          onClick={() => {
            setCurrentIndexGroup(0);
          }}
          style={{
            cursor: "pointer",
            marginRight: "2%",
          }}
          color={currentIndexGroup === 0 ? "primary" : "black"}
          variant="h2"
        >
          Group by time
        </Typography>
        <Typography
          onClick={() => {
            setCurrentIndexGroup(1);
          }}
          style={{
            cursor: "pointer",
          }}
          color={currentIndexGroup === 1 ? "primary" : "black"}
          variant="h2"
        >
          Group by staff
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ListItemSidebar listTime={LIST_TIME} />
        <ScheduleArea
          listGroup={listScheduleCurrentDate}
          setCurrentOrder={setCurrentOrder}
          handleOpen={handleOpen}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewSchedule);
