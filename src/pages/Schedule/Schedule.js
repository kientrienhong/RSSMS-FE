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
import { Grid } from "@material-ui/core";
import Order from "./component/Order";
import OrderAssignModal from "./component/OrderAssignModal";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { getOrder } from "../../apis/Apis";
function Shedule({ showLoading, hideLoading }) {
  const [listShowStaffAssigned, setListShowStaffAssigned] = React.useState([]);
  const [listShowStaffUnAssigned, setListShowStaffUnAssigned] = React.useState(
    []
  );
  const [listOrder, setListOrder] = React.useState([]);
  const [currentOrder, setCurrentOrder] = React.useState({});
  const [listStaffAssigned, setListStaffAssigned] = React.useState([
    { id: 1, name: "Giang Thanh Dinh" },
    { id: 2, name: "Lam Nhut Phuc" },
  ]);
  const [listStaffUnAssigned, setListStaffUnAssigned] = React.useState([
    { id: 3, name: "Nguyen Dang Khoa" },
    { id: 4, name: "Tran The Dong Anh" },
  ]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setListShowStaffAssigned(listStaffAssigned);
    setListShowStaffUnAssigned(listStaffUnAssigned);
  }, []);

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

  const getData = async (dateStart, dateEnd) => {
    try {
      showLoading();
      let response = await getOrder("", "", "", dateStart, dateEnd);
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      hideLoading();
    }
  };

  const localData = [
    {
      Id: 1,
      StartTime: new Date(2021, 10, 3, 6, 0),
      ListOrder: ["#31", "#32", "#33", "#34"],
      Status: 0,
      EndTime: new Date(2021, 10, 3, 8, 0),
    },
    {
      Id: 2,
      StartTime: new Date(2021, 10, 3, 8, 0),
      ListOrder: ["#35", "#36"],
      Status: 1,
      EndTime: new Date(2021, 10, 3, 10, 0),
    },
  ];

  const onDragStart = (dragEventArgs) => {
    dragEventArgs.enable = false;
  };

  const buildListOrder = (listOrder, props) =>
    listOrder?.map((e, index) => (
      <Grid item xs={3} key={index}>
        <Order order={{ ...props, orderId: e }} handleOpen={handleOpen} />
      </Grid>
    ));

  const eventTemplate = (props) => {
    return (
      <div className="schedule__order__outsite">
        <p>{props.ListOrder?.length} x Orders</p>
      </div>
    );
  };

  const editorWindowTemplate = (props) => {
    return (
      <div className="custom_editor" style={{ zIndex: "1" }}>
        <h1>List order</h1>
        <Grid container spacing={2}>
          {buildListOrder(currentOrder.ListOrder, currentOrder)}
        </Grid>
      </div>
    );
  };

  const onNavigatingEvent = (navigatingEventArgs) => {
    let curr = new Date(navigatingEventArgs.currentDate); // get current date
    let first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
    let last = first + 6; // last day is the first day + 6

    let firstday = new Date(curr.setDate(first)).toUTCString();
    let lastday = new Date(curr.setDate(last)).toUTCString();
  };

  useEffect(() => {
    const getData = async (dateStart, dateEnd) => {
      try {
        showLoading();
        let response = await getOrder("", "", "", dateStart, dateEnd);
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        hideLoading();
      }
    };

    const firstCall = async () => {
      try {
        let curr = new Date(); // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6

        let firstday = new Date(curr.setDate(first)).toISOString();
        let lastday = new Date(curr.setDate(last)).toISOString();
        showLoading();
        await getData(firstday.split("T")[0], lastday.split("T")[0]);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const onEventClick = (args) => {
    setCurrentOrder(args.event);
  };

  return (
    <ScheduleComponent
      currentView="Week"
      selectedDate={new Date()}
      eventSettings={{
        dataSource: localData,
        template: eventTemplate.bind(this),
      }}
      editorTemplate={editorWindowTemplate.bind(this)}
      dragStart={onDragStart.bind(this)}
      navigating={onNavigatingEvent.bind(this)}
      allowResizing={false}
      showQuickInfo={false}
      eventClick={onEventClick.bind(this)}
    >
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

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(null, mapDispatchToProps)(Shedule);
