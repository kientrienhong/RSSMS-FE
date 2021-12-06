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
import { getOrder } from "../../apis/Apis";
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
  let scheduleObj;
  const [listShowStaffAssigned, setListShowStaffAssigned] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [listShowStaffUnAssigned, setListShowStaffUnAssigned] = React.useState(
    []
  );
  const [openListSchedule, setOpenListSchedule] = React.useState(false);
  const [listSchedule, setListSchedule] = React.useState([]);
  const [currentListSchedule, setCurrentListSchedule] = React.useState({});

  const [listStaffAssigned, setListStaffAssigned] = React.useState([
    { id: 1, name: "Giang Thanh Dinh" },
    { id: 2, name: "Lam Nhut Phuc" },
  ]);

  const [listStaffUnAssigned, setListStaffUnAssigned] = React.useState([
    { id: 3, name: "Nguyen Dang Khoa" },
    { id: 4, name: "Tran The Dong Anh" },
  ]);

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
    } catch (e) {
      console.log(e);
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
    if (
      navigatingEventArgs.name !== "navigating" ||
      navigatingEventArgs.previousDate === navigatingEventArgs.currentDate
    ) {
      return;
    }
    let curr = new Date(navigatingEventArgs.currentDate);
    curr.setDate(curr.getDate() + 2);
    curr = curr.toISOString().split("T")[0]; // get current date
    let dateSplit = curr.split("-");
    let currentMoment = moment().set({
      year: parseInt(dateSplit[0]),
      month: parseInt(dateSplit[1]) - 1,
      date: parseInt(dateSplit[2]),
    });
    let startOfWeek = currentMoment.startOf("week").toDate();
    let endOfWeek = currentMoment.endOf("week").toDate();
    await getData(startOfWeek, endOfWeek);
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

    const firstCall = async () => {
      try {
        let startOfWeek = moment().startOf("week").toDate();
        let endOfWeek = moment().endOf("week").toDate();
        showLoading();
        let response = await getData(
          startOfWeek.toISOString().split("T")[0],
          endOfWeek.toISOString().split("T")[0]
        );
        let result = [];
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
      ref={(schedule) => (scheduleObj = schedule)}
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
        handleClose={handleClose}
        open={open}
        removeAssignStaff={removeAssignStaff}
        addAssignStaff={addAssignStaff}
        handleChangeSearchAssigned={handleChangeSearchAssigned}
        handleChangeSearchUnAssigned={handleChangeSearchUnAssigned}
        listShowStaffAssigned={listShowStaffAssigned}
        listShowStaffUnAssigned={listShowStaffUnAssigned}
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
