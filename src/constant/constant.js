import * as style from "./style";

export const AREA_TYPE = 3;
export const BOX_TYPE = 2;
export const SELF_STORAGE_TYPE = 0;
export const ACCESSSORY_TYPE = 1;
export const SERVICE_TYPE = 4;
export const TYPE_REQUEST_DELIVERY_TAKE = 1;

export const MALE = 0;
export const FEMALE = 1;
export const OTHER_GENDER = 2;
export const ROLE_USER = {
  Admin: 1,
  Manager: 2,
  Customer: 3,
  "Delivery Staff": 4,
  "Office Staff": 5,
};

export const TYPE_AREA = {
  "Kho tự quản": 0,
  "Giữ đồ thuê": 1,
};

export const TYPE_SHELF = {
  Hanldy: 0,
  Unweildy: 1,
  "Self-storage": 2,
};

export const LIST_PRODUCT_MANAGE_TYPE = [
  "Kho",
  "Phụ kiện",
  "Gửi theo loại",
  "Gửi theo diện tích",
];

export const STORAGE_STATUS = {
  0: {color: "#04BFFE", name: "Rented"},
  1: {color: "#99E5FE", name: "Available"},
  2: {color: "", name: "Placing"},
};

export const PRODUCT_TYPE = {
  0: "product",
  2: "product",
  3: "product",
  1: "accessory",
};

export const BOX_SIZE = {
  0: "Bolo",
  1: "S",
  2: "M",
  3: "L",
  4: "XL",
};

export const TYPE_SCHEDULE = [
  {name: "Lịch trả hàng", color: style.PRIMARY_PURPLE},
  {name: "Lịch giao hàng", color: style.SECOND_BLUE},
  {name: "Có nhân viên hủy lịch", color: style.PRIMARY_SEMANTIC_RED},
];

export const AREA_SIZE = {
  0: "0.5m2",
  1: "1m2",
  2: "2m2",
  3: "3m2",
};

export const LIST_STATUS_ORDER_SELECT = [
  {name: "Đã lưu kho", value: 2},
  {name: "Đang thanh lý", value: 5},
  {name: "Đã thanh lý", value: 7},
];

export const LIST_SPACE_TYPE = [
  {name: "Kệ", color: style.PRIMARY_BLUE},
  {name: "Diện tích", color: style.PRIMARY_PURPLE},
  {name: "Kho", color: style.PRIMARY_BLUE},
];

export const LIST_STATUS_OF_ORDER_DETAIL = [
  {name: "Đang được gỡ xuống", color: style.PRIMARY_BROWN},
  {
    name: "Đang trong quá trình đặt lên kệ",
    color: style.PRIMARY_SEMANTIC_GREEN,
  },
  {
    name: "Đã đặt lên kệ",
    color: style.PRIMARY_BLUE,
  },
  {
    name: "Sắp hết hạn",
    color: style.PRIMARY_SEMANTIC_ORANGE,
  },
  {
    name: "Đã hết hạn",
    color: style.PRIMARY_SEMANTIC_RED,
  },
];

export const LIST_TYPE_REQUEST = [
  {name: "Hủy lịch giao hàng"},
  {name: "Tạo đơn"},
  {name: "Gia hạn đơn"},
  {name: "Hủy đơn"},
  {name: "Yêu cầu trả đơn"},
];

export const LIST_STATUS_REQUEST = [
  {name: "Đã hủy", color: style.PRIMARY_SEMANTIC_RED},
  {name: "Đang xử lý", color: style.PRIMARY_PURPLE},
  {name: "Đã xử lý", color: style.PRIMARY_BLUE},
  {name: "Đã hoàn thành", color: style.SECOND_SEMANTIC_GREEN},
  {name: "Đang vận chuyển", color: style.PRIMARY_BROWN},
  {name: "Khách không có mặt", color: style.PRIMARY_SEMANTIC_RED},
];

export const STATUS_REQUEST_CANCEL = 0;
export const STATUS_REQUEST_PROCESSING = 1;
export const STATUS_REQUEST_PROCESSED = 2;
export const STATUS_REQUEST_FINISHED = 3;
export const STATUS_REQUEST_DELIVERING = 4;
export const STATUS_REQUEST_CUSTOMER_ABSENT = 5;

export const ORDER_STATUS = {
  0: {name: "Đã hủy", color: style.PRIMARY_SEMANTIC_RED},
  1: {name: "Đang vận chuyển", color: style.PRIMARY_BLUE},
  2: {name: "Đã lưu kho", color: style.SECOND_SEMANTIC_GREEN},
  3: {name: "Sắp quá hạn", color: style.PRIMARY_SEMANTIC_RED},
  4: {name: "Đã quá hạn", color: style.PRIMARY_SEMANTIC_RED},
  5: {name: "Đang thanh lý", color: style.PRIMARY_SEMANTIC_ORANGE},
  6: {name: "Hoàn thành", color: style.SECOND_SEMANTIC_GREEN},
  7: {name: "Đã thanh lý", color: style.PRIMARY_SEMANTIC_RED},
};

export const LIST_STATUS = [
  {label: "Đã hủy", value: 0},
  {label: "Đã đặt", value: 1},
  {label: "Đã xử lý", value: 2},
  {label: "Đang vận chuyển", value: 3},
  {label: "Đã lưu kho", value: 4},
  {label: "Đã hết hạn", value: 5},
  {label: "Đã hoàn tất", value: 6},
];

export const ORDER_TYPE = {
  0: "Kho tự quản",
  1: "Giữ đồ thuê",
};

export const LIST_UNIT = [
  {label: "Tháng", value: "tháng"},
  {label: "Số lượng", value: "số lượng"},
];

export const LIST_TIME = [
  {name: "8am - 10am", isAvailable: true},
  {name: "10am - 12pm", isAvailable: true},
  {name: "12pm - 2pm", isAvailable: true},
  {name: "2pm - 4pm", isAvailable: true},
  {name: "4pm - 6pm", isAvailable: true},
];

export const LIST_NOTE = [
  {color: style.SECOND_BLUE, name: "Trống"},
  {color: style.PRIMARY_BLUE, name: "Đã thuê"},
  {color: style.PRIMARY_SEMANTIC_RED, name: "Đã hết hạn"},
  {color: style.PRIMARY_SEMANTIC_ORANGE, name: "Sắp hết hạn"},
  {color: style.PRIMARY_SEMANTIC_GREEN, name: "Đang chọn"},
  {color: style.SECOND_SEMANTIC_GREEN, name: "Đang đặt"},
  {color: style.PRIMARY_PURPLE, name: "Đơn hàng đang xem"},
];
