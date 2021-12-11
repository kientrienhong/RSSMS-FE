import React, { useState, useEffect } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  ViewDirective,
  ViewsDirective,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import { Grid, Box, Button, Typography, Modal } from "@material-ui/core";
import Order from "./component/Order";
import OrderAssignModal from "./component/OrderAssignModal";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { getOrder, getListUser, getSchedule } from "../../apis/Apis";
import moment from "moment";
import {
  isDateBefore,
  isDateAfter,
  getTimeStart,
  getTimeEnd,
} from "../../utils/DateUtils";
import { ORDER_STATUS } from "../../constant/constant";
import { STYLE_MODAL } from "../../constant/style";

const styleModal = {
  ...STYLE_MODAL,
  width: "80%",
};

function Shedule({ showLoading, hideLoading, userState }) {
  const [listShowStaffAssigned, setListShowStaffAssigned] = React.useState([]);
  const [listShowStaffUnAssigned, setListShowStaffUnAssigned] = React.useState(
    []
  );
  const [openListSchedule, setOpenListSchedule] = React.useState(false);
  const [listSchedule, setListSchedule] = React.useState([]);
  const [currentListSchedule, setCurrentListSchedule] = React.useState({});
  const [currentOrder, setCurrentOrder] = React.useState({});
  const [listStaffAssigned, setListStaffAssigned] = React.useState([]);
  const [startOfWeek, setStartOfWeek] = React.useState();
  const [endOfWeek, setEndOfWeek] = React.useState();

  const [listStaffUnAssigned, setListStaffUnAssigned] = React.useState([]);

  const [open, setOpen] = useState(false);

  const handleOpenListSchedule = () => {
    setOpenListSchedule(true);
  };

  const handleCloseListSchedule = () => {
    setOpenListSchedule(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const getData = async (startOfWeek, endOfWeek) => {
    try {
      showLoading();

      let response = await getOrder(
        "",
        "",
        "",
        startOfWeek.toISOString().split("T")[0],
        endOfWeek.toISOString().split("T")[0],
        userState.idToken
      );
      let result = [];
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
      setListSchedule(result);

      try {
        let responseSchedule = await getSchedule(
          startOfWeek.toISOString().split("T")[0],
          endOfWeek.toISOString().split("T")[0],
          userState.idToken
        );

        if (responseSchedule.data.data) {
          responseSchedule.data.data.forEach((schedule) => {
            result.forEach((e) => {
              let index = e.ListOrder.findIndex(
                (ele) => ele.id === schedule.orderId
              );
              e.ListOrder[index] = {
                ...e.ListOrder[index],
                listStaffDelivery: schedule.users,
              };
            });
          });
          setListSchedule(result);
        }
      } catch (exception) {
        console.log(exception.response);
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const onDragStart = (dragEventArgs) => {
    dragEventArgs.enable = false;
  };

  const buildListOrder = (listOrder, props) =>
    listOrder?.map((e, index) => (
      <Grid item xs={3} key={index}>
        <Order
          order={{ ...props, order: e }}
          setCurrentListSchedule={setCurrentListSchedule}
          handleOpen={handleOpen}
          setCurrentOrder={setCurrentOrder}
        />
      </Grid>
    ));

  const eventTemplate = (props) => {
    return (
      <div
        id="schedule__order__outsite"
        onClick={() => {
          setCurrentListSchedule(props);
          handleOpenListSchedule();
        }}
      >
        <p
          style={{
            display: "inline-block",
          }}
        >
          {props.ListOrder?.length} x Schedule
        </p>
      </div>
    );
  };

  const buildModalListOrder = () => (
    <Modal
      open={openListSchedule}
      onClose={handleCloseListSchedule}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            marginBottom: "2%",
            textAlign: "left",
          }}
        >
          List schedule
        </Typography>
        <Grid container spacing={2}>
          {buildListOrder(currentListSchedule.ListOrder, currentListSchedule)}
        </Grid>
      </Box>
    </Modal>
  );

  const onNavigatingEvent = async (navigatingEventArgs) => {
    let curr = new Date(navigatingEventArgs.currentDate);
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

    setStartOfWeek(currentMoment.startOf("week").toDate());
    setEndOfWeek(currentMoment.endOf("week").toDate());
    await getData(startOfWeekLocal, endOfWeekLocal);
  };
  const handleFormatDate = (date, result, order, value) => {
    let time = order[value].split("-");
    let currentScheduleStartDateTime = new Date(
      date.getTime() + getTimeStart(time[0]) * 3600000
    );
    let currentSheduleEndDateTime = new Date(
      date.getTime() + getTimeEnd(time[1]) * 3600000
    );

    let currentSchedule = result.find((ele) => {
      if (
        ele.StartTime.toISOString() ===
          currentScheduleStartDateTime.toISOString() &&
        ele.EndTime.toISOString() === currentSheduleEndDateTime.toISOString()
      ) {
        return true;
      }
    });
    if (currentSchedule) {
      currentSchedule.ListOrder.push(order);
    } else {
      result.push({
        Id: result.length,
        StartTime: currentScheduleStartDateTime,
        EndTime: currentSheduleEndDateTime,
        ListOrder: [order],
      });
    }
  };

  const onPopupOpen = (args) => {
    args.cancel = true;
  };

  useEffect(() => {
    const loadUnassignStaff = async () => {
      try {
        showLoading();
        let listUserNotAssigned = await getListUser(
          "",
          1,
          -1,
          userState.idToken,
          undefined,
          "Delivery Staff",
          currentOrder.id
        );
        setListShowStaffUnAssigned(listUserNotAssigned.data.data);
        setListStaffUnAssigned(listUserNotAssigned.data.data);
        setListStaffAssigned(currentOrder.listStaffDelivery ?? []);
        setListShowStaffAssigned(currentOrder.listStaffDelivery ?? []);
      } catch (e) {
        console.log(e.response);
      } finally {
        hideLoading();
      }
    };
    loadUnassignStaff();
  }, [open]);

  useEffect(() => {
    const getData = async (dateStart, dateEnd) => {
      try {
        showLoading();
        let response = await getOrder(
          "",
          "",
          "",
          dateStart,
          dateEnd,
          userState.idToken
        );

        return response.data.data;
      } catch (e) {
        console.log(e.response);
      } finally {
        hideLoading();
      }
    };

    const getScheduleEffect = async (dateStart, dateEnd) => {
      try {
        showLoading();
        let response = await getSchedule(dateStart, dateEnd, userState.idToken);

        return response.data.data;
      } catch (e) {
        console.log(e.response);
      } finally {
        hideLoading();
      }
    };

    const firstCall = async () => {
      try {
        let startOfWeek = moment().startOf("week").toDate();
        let endOfWeek = moment().endOf("week").toDate();
        showLoading();
        let result = [];

        let response = await getData(
          startOfWeek.toISOString().split("T")[0],
          endOfWeek.toISOString().split("T")[0]
        );
        response
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
        setListSchedule(result);

        try {
          let responseSchedule = await getScheduleEffect(
            startOfWeek.toISOString().split("T")[0],
            endOfWeek.toISOString().split("T")[0],
            userState.idToken
          );

          if (responseSchedule.data.data) {
            responseSchedule.data.data.forEach((schedule) => {
              result.forEach((e) => {
                let index = e.ListOrder.findIndex(
                  (ele) => ele.id === schedule.orderId
                );
                e.ListOrder[index] = {
                  ...e.ListOrder[index],
                  listStaffDelivery: schedule.users,
                };
              });
            });
            setListSchedule(result);
          }
        } catch (exception) {
          console.log(exception.response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
    setListShowStaffUnAssigned(listStaffUnAssigned);
  }, []);
  const todaySplited = new Date().toISOString().split("T")[0].split("-");
  let stringToday = `${todaySplited[0]}/${todaySplited[1]}/${todaySplited[2]}`;

  return (
    <ScheduleComponent
      currentView="Week"
      selectedDate={new Date(stringToday)}
      eventSettings={{
        dataSource: listSchedule,
        template: eventTemplate.bind(this),
      }}
      popupOpen={onPopupOpen.bind(this)}
      dragStart={onDragStart.bind(this)}
      navigating={onNavigatingEvent.bind(this)}
      allowResizing={false}
      showQuickInfo={false}
      openEditor={false}
    >
      {buildModalListOrder()}
      <OrderAssignModal
        currentOrder={currentOrder}
        handleClose={handleClose}
        open={open}
        currentListSchedule={currentListSchedule}
        removeAssignStaff={removeAssignStaff}
        addAssignStaff={addAssignStaff}
        handleChangeSearchAssigned={handleChangeSearchAssigned}
        handleChangeSearchUnAssigned={handleChangeSearchUnAssigned}
        listStaffAssigned={listStaffAssigned}
        listStaffUnAssigned={listStaffUnAssigned}
        listShowStaffAssigned={listShowStaffAssigned}
        listShowStaffUnAssigned={listShowStaffUnAssigned}
        getData={getData}
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
      />
      <ViewsDirective>
        <ViewDirective option="Day"></ViewDirective>
        <ViewDirective option="Week"></ViewDirective>
        <ViewDirective option="Agenda"></ViewDirective>
      </ViewsDirective>
      <Inject services={[Day, Week, Agenda]} />
    </ScheduleComponent>
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
export default connect(mapStateToProps, mapDispatchToProps)(Shedule);
