import React from "react";

export default function Order({ order, handleOpen }) {
  const dateStart = new Date(order.StartTime);
  const dateEnd = new Date(order.EndTime);
  const statusOrder = {
    0: "Delivery",
    1: "Complete",
  };
  const listStaff = ["/avatar.png", "/avatar2.png", "/avatar3.png"];

  const formatTime = (date) => {
    let d = new Date(date);
    var h = d.getHours(),
      m = d.getMinutes();

    if (h > 12) {
      h = h - 12;
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }

    return h + ":" + m;
  };

  const mapAvatar = (listStaff) => {
    return listStaff.map((e, index) => (
      <img
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "12px",
          marginLeft: index === 0 ? "0px" : "-8px",
        }}
        src={e}
        alt={e}
      />
    ));
  };

  return (
    <div className="schedule__order" onClick={() => handleOpen()}>
      <div className="schedule__order__header">
        <p className="schedule__order__header__orderId">{order.orderId}</p>
        <div className="schedule__order__header__avatar">
          {mapAvatar(listStaff)}
        </div>
      </div>

      <div className="schedule__order__footer">
        <p className="schedule__order__title__time">{`${formatTime(
          dateStart
        )} - ${formatTime(dateEnd)}`}</p>
        <p
          className={`schedule__order__footer__status schedule__order__footer__status--${
            statusOrder[order.Status]
          }`}
        >
          {statusOrder[order.Status]}
        </p>
      </div>
    </div>
  );
}
