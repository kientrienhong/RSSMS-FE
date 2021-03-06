import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import {Box, Typography, Button} from "@material-ui/core";
import moment from "moment";
import {useForm} from "react-hook-form";
import ListDateComponent from "./components/ListDateComponent";
import {LIST_TIME, TYPE_SCHEDULE} from "../../constant/constant";
import RequestModal from "../../components/RequestModal";
import {
  getSchedule,
  getRequestToScheduleNew,
  getListDeliveryStaff,
} from "../../apis/Apis";
import {TYPE_REQUEST_DELIVERY_TAKE} from "../../constant/constant";
import ScheduleArea from "./components/ScheduleArea";
import {useParams} from "react-router-dom";

import OrderAssignModal from "./components/OrderAssignModal";
import OrderModal from "../../components/OrderModal";
import {ErrorHandle} from "../../utils/ErrorHandle";
function NewSchedule({
  showLoading,
  hideLoading,
  userState,
  isLoadingSchedule,
  showSnackbar,
  handleExtendSession,
}) {
  const [listShowStaffAssigned, setListShowStaffAssigned] = React.useState([]);
  const [listShowStaffUnAssigned, setListShowStaffUnAssigned] = React.useState(
    []
  );
  const [listStaffAssigned, setListStaffAssigned] = React.useState([]);
  const [listStaffUnAssigned, setListStaffUnAssigned] = React.useState([]);
  const {scheduleDate} = useParams();
  const [listDateAWeek, setListDateAWeek] = useState([]);
  const [currentIndexDate, setCurrentIndexDate] = useState(-1);
  const [listSelectedOrder, setListSelectedOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState({});
  const [open, setOpen] = useState(false);
  const [openAssignStaff, setOpenAssignStaff] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const {handleSubmit, control, reset} = useForm();
  const [startOfWeek, setStartOfWeek] = React.useState();
  const [endOfWeek, setEndOfWeek] = React.useState();
  const [listScheduleWholeWeek, setListScheduleWholeWeek] = useState([]);
  const [listScheduleCurrentDate, setListScheduleCurrentDate] = useState([]);
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleOpenOrderModal = () => {
    setOpenOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setOpenOrderModal(false);
  };

  const handleOpenAssignStaff = () => {
    setOpenAssignStaff(true);
  };

  const handleCloseAssignStaff = () => {
    setOpenAssignStaff(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeCheckBox = (schedule, value) => {
    let listSelectedOrderTemp = [...listSelectedOrder];
    let indexFound = listSelectedOrderTemp.findIndex((e) => {
      if (e["deliveryTime"] === schedule["deliveryTime"]) {
        if (schedule.id === e.id) {
          schedule = {
            ...schedule,
            isSelected: false,
          };
          return true;
        }
      }
    });
    if (value) {
      if (indexFound === -1) {
        schedule = {
          ...schedule,
          isSelected: true,
        };
        listSelectedOrderTemp.push({
          ...schedule,
          listStaffAttain:
            listScheduleCurrentDate["listSchedule"].get(schedule.deliveryTime)[
              "listStaffAttend"
            ][schedule.storageId] === undefined
              ? []
              : listScheduleCurrentDate["listSchedule"].get(
                  schedule.deliveryTime
                )["listStaffAttend"][schedule.storageId],
        });
        console.log(listSelectedOrderTemp);
      }
      setListSelectedOrder(listSelectedOrderTemp);
    } else {
      if (indexFound !== -1) {
        listSelectedOrderTemp.splice(indexFound, 1);
      }
      setListSelectedOrder(listSelectedOrderTemp);
    }
  };

  const handleFormatDate = (date, result, order) => {
    if (order.type === TYPE_REQUEST_DELIVERY_TAKE) {
      order = {...order, isDelivery: true};
    } else {
      order = {...order, isDelivery: false};
    }
    order = {...order, isSelected: false};
    let currentDate = Object.keys(result)?.find((e) => {
      return e === date.toLocaleDateString("en-US");
    });
    result[currentDate].listSchedule
      .get(order.deliveryTime)
      ["listSchedule"].push(order);
    result[currentDate].amountNotAssignStaff += 1;
  };

  const handleFormatRequestSchedule = (date, result, request) => {
    try {
      let currentDate = Object.keys(result)?.find((e) => {
        return e === date.toLocaleDateString("en-US");
      });

      let indexFound = result[currentDate].listSchedule
        .get(request["scheduleTime"])
        ["listSchedule"].findIndex((e) => e.id === request.requestId);
      let currentRequest = result[currentDate].listSchedule.get(
        request["scheduleTime"]
      )["listSchedule"][indexFound];

      currentRequest.listStaffDelivery = request.accounts;
      if (
        result[currentDate].listSchedule.get(request["scheduleTime"])[
          "listStaffAttend"
        ][currentRequest.storageId]
      ) {
        if (request.accounts) {
          result[currentDate].listSchedule.get(request["scheduleTime"])[
            "listStaffAttend"
          ][currentRequest.storageId] = result[currentDate].listSchedule
            .get(request["scheduleTime"])
            ["listStaffAttend"][currentRequest.storageId].concat(
              ...request.accounts.map((e) => e.id)
            );
        }
      } else {
        result[currentDate].listSchedule.get(request["scheduleTime"])[
          "listStaffAttend"
        ][currentRequest.storageId] =
          request.accounts === undefined
            ? []
            : request.accounts.map((e) => e.id);
      }

      result[currentDate].amountNotAssignStaff -= 1;
    } catch (error) {
      console.log(error);
    }
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

  const formatListStaffAttain = () => {
    let listScheduleCurrentDateTemp = {...listScheduleCurrentDate};
    if (listScheduleCurrentDateTemp) {
      if (listScheduleCurrentDateTemp["listSchedule"]) {
        for (const entry of listScheduleCurrentDateTemp[
          "listSchedule"
        ]?.entries()) {
          Object.keys(entry[1]["listStaffAttend"]).forEach((e) => {
            entry[1]["listStaffAttend"][e] =
              entry[1]["listStaffAttend"][e].sort();
          });
        }
      }
      setListScheduleCurrentDate(listScheduleCurrentDateTemp);
    }
  };

  const getData = async (startOfWeek, endOfWeek, currentSchedule) => {
    let result = {};
    let currentIndexDateLocal = 0;
    try {
      showLoading();
      let currStr = new Date().toLocaleDateString("en-US");
      currentSchedule = new Date(currentSchedule).toLocaleDateString("en-US");
      if (startOfWeek.toLocaleDateString("en-US") === currStr) {
        currentIndexDateLocal = 0;
      } else if (startOfWeek.toLocaleDateString("en-US") === currentSchedule) {
        currentIndexDateLocal = 0;
      }

      let listDateAWeekTemp = [];
      for (let i = 0; i < 7; i++) {
        let date = addDays(startOfWeek, i);
        let dateStr = date.toLocaleDateString("en-US");
        let listTime = new Map();
        LIST_TIME.forEach((e) =>
          listTime.set(e["name"], {listSchedule: [], listStaffAttend: {}})
        );
        result[dateStr] = {};
        result[dateStr].listSchedule = listTime;
        result[dateStr].amountNotAssignStaff = 0;
        if (
          (dateStr === currStr && currentSchedule === "Invalid Date") ||
          dateStr === currentSchedule
        ) {
          setCurrentIndexDate(i);
          currentIndexDateLocal = i;
        }
        listDateAWeekTemp.push(date);
      }
      setListDateAWeek(listDateAWeekTemp);

      let response = await getRequestToScheduleNew(
        addDays(startOfWeek, 1).toISOString().split("T")[0],
        endOfWeek.toISOString().split("T")[0],
        userState.idToken
      );

      response?.data?.data
        .filter(
          (e) =>
            (e.isCustomerDelivery === false &&
              e.typeOrder === 1 &&
              e.status !== 0) ||
            (e.type === 4 && e.status !== 0)
        )
        .forEach((e) => {
          handleFormatDate(new Date(e.deliveryDate), result, e);
        });
      try {
        let responseRequest = await getSchedule(
          startOfWeek.toLocaleDateString("en-US"),
          endOfWeek.toLocaleDateString("en-US"),
          userState.idToken
        );
        responseRequest.data.data.forEach((e) => {
          handleFormatRequestSchedule(new Date(e.scheduleDay), result, e);
        });
      } catch (error) {
        // ErrorHandle.handle(error, showSnackbar, handleExtendSession);

        console.log(error.response);
      } finally {
      }
    } catch (e) {
      // ErrorHandle.handle(e, showSnackbar, handleExtendSession);

      console.log(e);
      console.log(e.response);
    } finally {
      hideLoading();
      setListScheduleWholeWeek(result);
      setCurrentIndexDate(currentIndexDateLocal);

      setListScheduleCurrentDate(
        result[Object.keys(result)[currentIndexDateLocal]]
      );
    }
  };

  useEffect(() => {
    formatListStaffAttain();
  }, [currentIndexDate]);

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
          return e["deliveryTime"];
        });

        listSelectedTime = listSelectedTime.join("&deliveryTimes=");
        let storageId;

        if (listSelectedOrder?.length > 0) {
          storageId = listSelectedOrder[0].storageId;
        }

        try {
          showLoading();
          let listUserNotAssigned = await getListDeliveryStaff(
            storageId,
            listDateAWeek[currentIndexDate].toLocaleDateString("en-US"),
            `&deliveryTimes=${listSelectedTime}`,
            "Delivery Staff",
            userState.idToken
          );
          setListShowStaffUnAssigned(
            listUserNotAssigned.data.length === 0
              ? []
              : listUserNotAssigned.data
          );
          setListStaffUnAssigned(
            listUserNotAssigned.data.length === 0
              ? []
              : listUserNotAssigned.data
          );
          setListStaffAssigned(listSelectedOrder[0]?.listStaffDelivery ?? []);
          setListShowStaffAssigned(
            listSelectedOrder[0]?.listStaffDelivery ?? []
          );
        } catch (e) {
          console.log(e);
          console.log(e.response);
          setListShowStaffUnAssigned([]);
          setListStaffUnAssigned([]);
          setListStaffAssigned(listSelectedOrder[0]?.listStaffDelivery ?? []);
          setListShowStaffAssigned(
            listSelectedOrder[0]?.listStaffDelivery ?? []
          );
        } finally {
          hideLoading();
        }
      }
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

        await getData(startOfWeekLocal, endOfWeekLocal, scheduleDate);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  useEffect(() => {
    getData(startOfWeek, endOfWeek, scheduleDate);
  }, [startOfWeek, endOfWeek]);
  useEffect(() => {
    getData(startOfWeek, endOfWeek, scheduleDate);
  }, [isLoadingSchedule]);
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        overflow: "scroll",
        py: 3,
      }}
    >
      <OrderAssignModal
        open={openAssignStaff}
        listScheduleWholeWeek={listScheduleWholeWeek}
        handleClose={handleCloseAssignStaff}
        removeAssignStaff={removeAssignStaff}
        addAssignStaff={addAssignStaff}
        setListSelectedOrder={setListSelectedOrder}
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
      <OrderModal
        open={openOrderModal}
        reset={reset}
        handleClose={handleCloseOrderModal}
        handleSubmit={handleSubmit}
        control={control}
        currentOrder={currentOrder}
        // getData={getData}
        page={1}
        searchId={""}
        isView={userState.roleName === "Admin"}
      />
      <RequestModal
        open={open}
        handleClose={handleClose}
        currentOrder={currentOrder}
        control={control}
        isView={true}
        reset={reset}
      />
      <ListDateComponent
        setListSelectedOrder={setListSelectedOrder}
        listScheduleWholeWeek={listScheduleWholeWeek}
        currentIndex={currentIndexDate}
        setListScheduleCurrentDate={setListScheduleCurrentDate}
        listDateAWeek={listDateAWeek}
        setCurrentIndexDate={setCurrentIndexDate}
        setEndOfWeek={setEndOfWeek}
        setStartOfWeek={setStartOfWeek}
      />
      <Box
        sx={{
          margin: "1% 0%",
          marginLeft: "15%",
          display: "flex",
          width: "80%",
          flexDirection: "row",
          justifyContent: "space-between",
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
          Ph??n l???ch cho nh??n vi??n
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <ScheduleArea
          listScheduleCurrentDate={listScheduleCurrentDate}
          listGroup={listScheduleCurrentDate}
          setCurrentOrder={setCurrentOrder}
          handleOpenOrderModal={handleOpenOrderModal}
          handleOpen={handleOpen}
          onChangeCheckBox={onChangeCheckBox}
          listSelectedOrder={listSelectedOrder}
          listTime={LIST_TIME}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
  isLoadingSchedule: state.order.isLoadingSchedule,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    handleExtendSession: (isOpen) =>
      dispatch(action.handleExtendSession(isOpen)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewSchedule);
