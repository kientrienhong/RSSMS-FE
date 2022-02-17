import * as style from "./style";

export const AREA_TYPE = 4;
export const BOX_TYPE = 2;
export const SELF_STORAGE_TYPE = 0;

export const MALE = 0;
export const FEMALE = 1;
export const OTHER_GENDER = 2;
export const ROLE_USER = {
  Admin: 1,
  Manager: 2,
  Customer: 3,
  "Delivery Staff": 4,
  "Office staff": 5,
};

export const TYPE_AREA = {
  "Self-Storage": 0,
  "Door-to-door": 1,
};

export const TYPE_STORAGE = {
  "Self-Storage": 0,
  "Door-to-door": 1,
};

export const TYPE_SHELF = {
  Hanldy: 0,
  Unweildy: 1,
  "Self-storage": 2,
};

export const STORAGE_STATUS = {
  0: { color: "#04BFFE", name: "Rented" },
  1: { color: "#99E5FE", name: "Available" },
  2: { color: "", name: "Placing" },
};

export const PRODUCT_TYPE = {
  0: "product",
  2: "product",
  4: "product",
  1: "accessory",
  3: "services",
};

export const ORDER_STATUS = {
  0: "Canceled",
  1: "Booked",
  2: "Assigned",
  3: "Delivery (take)",
  4: "Stored",
  5: "Expired",
  6: "Done",
  7: "Delivery (return)",
};

export const ORDER_TYPE = {
  0: "Self-Storage",
  1: "Door to door",
};

export const BOX_SIZE = {
  0: "Bolo",
  1: "S",
  2: "M",
  3: "L",
  4: "XL",
};

export const TYPE_SCHEDULE = [
  { name: "Delivery order", color: style.SECOND_BLUE },
  { name: "Return order", color: style.PRIMARY_BLUE },
  { name: "Canceled delivery order", color: style.PRIMARY_SEMANTIC_RED },
];

export const AREA_SIZE = {
  0: "0.5m2",
  1: "1m2",
  2: "2m2",
  3: "3m2",
};

export const LIST_PRODUCT_MANAGE_TYPE = [
  "Storages",
  "Accessories",
  "Boxes",
  "Services",
  "Areas",
];

export const LIST_TYPE_REQUEST = [
  { name: "Cancel Delivery" },
  { name: "Extension" },
  { name: "Return items" },
  { name: "Cancel order" },
];

export const LIST_STATUS = [
  { label: "Canceled", value: 0 },
  { label: "Booked", value: 1 },
  { label: "Assgined", value: 2 },
  { label: "Delivery", value: 3 },
  { label: "Stored", value: 4 },
  { label: "Expired", value: 5 },
];

export const LIST_UNIT = [
  { label: "Month", value: "month" },
  { label: "Quantity", value: "quantity" },
];

export const LIST_TIME = [
  { name: "8am - 10am", isAvailable: true },
  { name: "10am - 12pm", isAvailable: true },
  { name: "12pm - 2pm", isAvailable: true },
  { name: "2pm - 4pm", isAvailable: true },
  { name: "4pm - 6pm", isAvailable: true },
];

export const LIST_NOTE = [
  { color: style.SECOND_BLUE, name: "Available" },
  { color: style.PRIMARY_BLUE, name: "Rented" },
  { color: style.PRIMARY_SEMANTIC_RED, name: "Expired" },
  { color: style.PRIMARY_SEMANTIC_ORANGE, name: "Expired soon" },
  { color: style.PRIMARY_SEMANTIC_GREEN, name: "Selected" },
  { color: style.SECOND_SEMANTIC_GREEN, name: "Placing" },
  { color: style.PRIMARY_PURPLE, name: "Current View Order" },
];
