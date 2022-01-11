import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { Box, Typography, Button, Badge } from "@material-ui/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import ListDateComponent from "./components/ListDateComponent";
import ListItemSidebar from "./components/ListItemSidebar";
import { LIST_TIME, TYPE_SCHEDULE } from "../../constant/constant";
import OrderModal from "../../components/OrderModal";
import { isDateAfter, isDateBefore } from "../../utils/DateUtils";
import { getOrder, getListUser, getSchedule } from "../../apis/Apis";
import ScheduleArea from "./components/ScheduleArea";
import ListUnassignOrderModal from "./components/ListUnassignOrderModal";
import OrderAssignTimeModal from "./components/OrderAssignTimeModal";
import OrderAssignModal from "./components/OrderAssignModal";
function NewSchedule({ showLoading, hideLoading, userState }) {
  const [listShowStaffAssigned, setListShowStaffAssigned] = React.useState([]);
  const [listShowStaffUnAssigned, setListShowStaffUnAssigned] = React.useState(
    []
  );
  const [listStaffAssigned, setListStaffAssigned] = React.useState([]);
  const [listStaffUnAssigned, setListStaffUnAssigned] = React.useState([]);

  const [listDateAWeek, setListDateAWeek] = useState([]);
  const [currentIndexDate, setCurrentIndexDate] = useState(-1);
  const [currentIndexGroup, setCurrentIndexGroup] = useState(0);
  const [listSelectedOrder, setListSelectedOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [open, setOpen] = useState(false);
  const [openAssignStaff, setOpenAssignStaff] = useState(false);
  const [openAssignTime, setOpenAssignTime] = useState(false);
  const { handleSubmit, control, watch } = useForm();
  const [startOfWeek, setStartOfWeek] = React.useState();
  const [endOfWeek, setEndOfWeek] = React.useState();
  const [openAssignReturnTime, setOpenAssignReturnTime] = useState(false);

  const [listOrderNotAssignedReturnTime, setListOrderNotAssignedReturnTime] =
    React.useState([]);
  const [listScheduleWholeWeek, setListScheduleWholeWeek] = useState([]);
  const [listScheduleCurrentDate, setListScheduleCurrentDate] = useState([]);
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleOpenAssignStaff = () => {
    setOpenAssignStaff(true);
  };

  const handleCloseAssignStaff = () => {
    setOpenAssignStaff(false);
  };

  const handleOpenAssignTime = () => {
    setOpenAssignTime(true);
  };

  const handleCloseAssignTime = () => {
    setOpenAssignTime(false);
  };

  const handleOpenAssignReturnTime = () => {
    setOpenAssignReturnTime(true);
  };

  const handleCloseAssignReturnTime = () => {
    setOpenAssignReturnTime(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeCheckBox = (schedule) => {
    let listSelectedOrderTemp = [...listSelectedOrder];
    let timeString = schedule.isDelivery ? "deliveryTime" : "returnTime";
    let indexFound = listSelectedOrderTemp.findIndex((e) => {
      let timeStringElement = e.isDelivery ? "deliveryTime" : "returnTime";

      if (e[timeStringElement] === schedule[timeString]) {
        if (schedule.id === e.id) {
          schedule = { ...schedule, isSelected: false };
          return true;
        }
      }
    });

    if (indexFound !== -1) {
      listSelectedOrderTemp.splice(indexFound, 1);
    } else {
      schedule = { ...schedule, isSelected: true };
      listSelectedOrderTemp.push(schedule);
    }

    setListSelectedOrder(listSelectedOrderTemp);
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
    order = { ...order, isSelected: false };
    // if (Object.keys(result).length > 0) {
    let currentDate = Object.keys(result)?.find((e) => {
      if (e === date.toLocaleDateString("en-US")) {
        return true;
      }
    });
    // }
    // if (currentDate) {
    result[currentDate].listSchedule.get(order[value]).push(order);
    result[currentDate].amountNotAssignStaff += 1;
    // } else {
    // let listTime = {};

    // LIST_TIME.forEach((e) => (listTime[e.name] = []));
    // result[date.toLocaleDateString("en-US")] = listTime;
    // result[date.toLocaleDateString("en-US")][order[value]].push(order);
    // }
  };

  const mapListNote = () =>
    TYPE_SCHEDULE.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "4px",
        }}
      >
        <Box
          sx={{
            width: "24px",
            height: "24px",
            marginRight: "8px",
            backgroundColor: e.color,
          }}
        ></Box>
        <Typography color="black" variant="h2">
          {e.name}
        </Typography>
      </Box>
    ));

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
        result[dateStr] = {};
        result[dateStr].listSchedule = listTime;
        result[dateStr].amountNotAssignStaff = 0;
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

      // return result;
      try {
        let responseSchedule = await getSchedule(
          startOfWeek.toISOString().split("T")[0],
          endOfWeek.toISOString().split("T")[0],
          userState.idToken
        );

        if (responseSchedule.data.data) {
          responseSchedule.data.data.forEach((schedule) => {
            Object.keys(result).forEach((resultKey) => {
              for (const entry of result[resultKey].listSchedule?.entries()) {
                if (entry[1]?.length > 0) {
                  let index = entry[1].findIndex(
                    (order) => order.id === schedule.orderId
                  );
                  if (index !== -1) {
                    result[resultKey].listSchedule.get(entry[0])[index] = {
                      ...result[resultKey].listSchedule.get(entry[0])[index],
                      listStaffDelivery: schedule.users,
                    };
                    result[resultKey].amountNotAssignStaff -= 1;
                  }
                }
              }
            });

            // result.forEach((e) => {
            //   let index = e.ListOrder.findIndex(
            //     (ele) => ele.id === schedule.orderId
            //   );
            //   e.ListOrder[index] = {
            //     ...e.ListOrder[index],
            //     listStaffDelivery: schedule.users,
            //   };
            // });
          });
          // setListSchedule(result);
          setListScheduleWholeWeek(result);
          setListScheduleCurrentDate(
            result[Object.keys(result)[currentIndexDateLocal]]
          );
        }
      } catch (exception) {
        console.log(exception.response);
        setListScheduleWholeWeek(result);
        setListScheduleCurrentDate(
          result[Object.keys(result)[currentIndexDateLocal]]
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  const handleChangeSearchUnAssigned = (event) => {
    let listStaffUnAssignedTemp = [...listStaffUnAssigned];
    listStaffUnAssignedTemp = listStaffUnAssignedTemp.filter((e) =>
      e.name.includes(event.target.value)
    );
    setListShowStaffUnAssigned(listStaffUnAssignedTemp);
  };

  const handleChangeSearchAssigned = (event) => {
    let listShowStaffAssignedTemp = [...listStaffAssigned];
    listShowStaffAssignedTemp = listShowStaffAssignedTemp.filter((e) =>
      e.name.includes(event.target.value)
    );

    setListShowStaffAssigned(listShowStaffAssignedTemp);
  };

  const addAssignStaff = (staff) => {
    let listShowStaffAssignedTemp = [...listShowStaffAssigned];
    let listShowStaffUnAssignedTemp = [...listShowStaffUnAssigned];

    let listStaffAssignedTemp = [...listStaffAssigned];
    let listStaffUnAssignedTemp = [...listStaffUnAssigned];

    listStaffAssignedTemp.push(staff);
    listStaffUnAssignedTemp = listStaffUnAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    listShowStaffAssignedTemp.push(staff);
    listShowStaffUnAssignedTemp = listShowStaffUnAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    setListStaffAssigned(listStaffAssignedTemp);
    setListStaffUnAssigned(listStaffUnAssignedTemp);
    setListShowStaffAssigned(listShowStaffAssignedTemp);
    setListShowStaffUnAssigned(listShowStaffUnAssignedTemp);
  };

  const removeAssignStaff = (staff) => {
    let listShowStaffAssignedTemp = [...listShowStaffAssigned];
    let listShowStaffUnAssignedTemp = [...listShowStaffUnAssigned];

    let listStaffAssignedTemp = [...listStaffAssigned];
    let listStaffUnAssignedTemp = [...listStaffUnAssigned];

    listStaffUnAssignedTemp.push(staff);
    listStaffAssignedTemp = listStaffAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    listShowStaffUnAssignedTemp.push(staff);
    listShowStaffAssignedTemp = listShowStaffAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    setListStaffAssigned(listStaffAssignedTemp);
    setListStaffUnAssigned(listStaffUnAssignedTemp);
    setListShowStaffAssigned(listShowStaffAssignedTemp);
    setListShowStaffUnAssigned(listShowStaffUnAssignedTemp);
  };

  useEffect(() => {
    const process = async () => {
      if (openAssignStaff === true) {
        let listSelectedTime = listSelectedOrder?.map((e) => {
          if (e.isDelivery) {
            return e["deliveryTime"];
          } else {
            return e["returnTime"];
          }
        });

        listSelectedTime = listSelectedTime.join("&DeliveryTimes=");
        let storageId;

        if (listSelectedOrder?.length > 0) {
          storageId = listSelectedOrder[0].storageId;
        }
        try {
          showLoading();
          let listUserNotAssigned = await getListUser(
            "",
            1,
            -1,
            userState.idToken,
            storageId,
            listDateAWeek[currentIndexDate].toISOString(),
            `&DeliveryTimes=${listSelectedTime}`,
            "Delivery Staff"
          );
          setListShowStaffUnAssigned(
            listUserNotAssigned.data.data.length === 0
              ? []
              : listUserNotAssigned.data.data
          );
          setListStaffUnAssigned(
            listUserNotAssigned.data.data.length === 0
              ? []
              : listUserNotAssigned.data.data
          );
          setListStaffAssigned(currentOrder.listStaffDelivery ?? []);
          setListShowStaffAssigned(currentOrder.listStaffDelivery ?? []);
        } catch (e) {
          console.log(e);
          console.log(e.response);
          setListShowStaffUnAssigned([]);
          setListStaffUnAssigned([]);
          setListStaffAssigned(currentOrder.listStaffDelivery ?? []);
          setListShowStaffAssigned(currentOrder.listStaffDelivery ?? []);
        } finally {
          hideLoading();
        }
      }
      //   const loadUnassignStaff = async () => {
      // try {
      //   showLoading();
      //   let listUserNotAssigned = await getListUser(
      //     "",
      //     1,
      //     -1,
      //     userState.idToken,
      //     undefined,
      //     "Delivery Staff",
      //     currentOrder.id
      //   );
      //   setListShowStaffUnAssigned(
      //     listUserNotAssigned.data.data.length === 0
      //       ? []
      //       : listUserNotAssigned.data.data
      //   );
      //   setListStaffUnAssigned(
      //     listUserNotAssigned.data.data.length === 0
      //       ? []
      //       : listUserNotAssigned.data.data
      //   );
      //   setListStaffAssigned(currentOrder.listStaffDelivery ?? []);
      //   setListShowStaffAssigned(currentOrder.listStaffDelivery ?? []);
      // } catch (e) {
      //   console.log(e);
      //   console.log(e.response);
      //   setListShowStaffUnAssigned([]);
      //   setListStaffUnAssigned([]);
      //   setListStaffAssigned(currentOrder.listStaffDelivery ?? []);
      //   setListShowStaffAssigned(currentOrder.listStaffDelivery ?? []);
      // } finally {
      //   hideLoading();
      // }
      //   };
      //   loadUnassignStaff();
    };
    process();
  }, [openAssignStaff]);

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
        let startOfWeekLocal = currentMoment.startOf("week").toDate();
        let endOfWeekLocal = currentMoment.endOf("week").toDate();

        setStartOfWeek(startOfWeekLocal);
        setEndOfWeek(endOfWeekLocal);

        showLoading();

        let result = await getData(startOfWeekLocal, endOfWeekLocal);

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
        py: 3,
      }}
    >
      <OrderAssignModal
        open={openAssignStaff}
        handleClose={handleCloseAssignStaff}
        removeAssignStaff={removeAssignStaff}
        addAssignStaff={addAssignStaff}
        listShowStaffAssigned={listShowStaffAssigned}
        listShowStaffUnAssigned={listShowStaffUnAssigned}
        listStaffUnAssigned={listStaffUnAssigned}
        listStaffAssigned={listStaffAssigned}
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
        getData={getData}
        listSelectedOrder={listSelectedOrder}
        handleChangeSearchAssigned={handleChangeSearchAssigned}
        handleChangeSearchUnAssigned={handleChangeSearchUnAssigned}
      />
      <ListUnassignOrderModal
        open={openAssignReturnTime}
        listUnassignOrder={listOrderNotAssignedReturnTime}
        handleClose={handleCloseAssignReturnTime}
        setCurrentOrder={setCurrentOrder}
        handleOpenDetailOrder={handleOpen}
        handleOpenAssignTime={handleOpenAssignTime}
      />
      <OrderAssignTimeModal
        getData={getData}
        order={currentOrder}
        startOfWeek={startOfWeek}
        listOrderNotAssignedReturnTime={listOrderNotAssignedReturnTime}
        setListOrderNotAssignedReturnTime={setListOrderNotAssignedReturnTime}
        endOfWeek={endOfWeek}
        open={openAssignTime}
        handleClose={handleCloseAssignTime}
      />
      <OrderModal
        open={open}
        handleClose={handleClose}
        currentOrder={currentOrder}
        control={control}
        isView={true}
      />
      <ListDateComponent
        setListSelectedOrder={setListSelectedOrder}
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
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginRight: "2%",
          }}
        >
          {mapListNote()}
        </Box>
        <Badge
          color="error"
          badgeContent={listOrderNotAssignedReturnTime.length}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={async () => {
              handleOpenAssignReturnTime();
            }}
            color="success"
            variant="contained"
            type="submit"
          >
            Unassign return time order
          </Button>
        </Badge>

        <Button
          style={{
            height: "45px",
            paddingLeft: "16px",
            marginLeft: "2%",
            paddingRight: "16px",
          }}
          onClick={async () => {
            // handleOpenAssignReturnTime();
            handleOpenAssignStaff();
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Assign Delivery Staff
        </Button>

        <Typography
          onClick={() => {
            setCurrentIndexGroup(0);
          }}
          style={{
            cursor: "pointer",
            marginRight: "2%",
            marginLeft: "3%",
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
          onChangeCheckBox={onChangeCheckBox}
          listSelectedOrder={listSelectedOrder}
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
