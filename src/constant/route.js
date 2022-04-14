import {FaWarehouse, FaFileInvoiceDollar} from "react-icons/fa";
import {VscTag} from "react-icons/vsc";
import {GrSchedule} from "react-icons/gr";
import {User as UserIcon, Users as UsersIcon} from "react-feather";
import {GoClippy} from "react-icons/go";
import {BsTrashFill} from "react-icons/bs";

export const LIST_SIDE_BAR_ADMIN = [
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Tài khoản cá nhân",
  },
  {
    href: "/app/users",
    icon: UsersIcon,
    title: "Tài khoản",
  },
  {
    href: "/app/services",
    icon: undefined,
    title: "Dịch vụ",
    reactIcon: <VscTag />,
  },
  {
    href: "/app/storages",
    title: "Kho",
    icon: undefined,
    reactIcon: <FaWarehouse />,
  },

  {
    href: "/app/orders",
    icon: undefined,
    title: "Đơn hàng",
    reactIcon: <FaFileInvoiceDollar />,
  },
];

export const LIST_SIDE_BAR_MANAGER = [
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Tài khoản cá nhân",
  },
  {
    href: "/app/users",
    icon: UsersIcon,
    title: "Tài khoản",
  },
  {
    href: "/app/storages",
    title: "Kho",
    icon: undefined,
    reactIcon: <FaWarehouse />,
  },
  {
    href: "/app/schedule",
    title: "Lịch giao hàng",
    icon: undefined,
    reactIcon: <GrSchedule />,
  },
  {
    href: "/app/orders",
    title: "Đơn hàng",
    icon: undefined,
    reactIcon: <FaFileInvoiceDollar />,
  },

  {
    href: "/app/staff_request",
    title: "Nhân viên yêu cầu",
    icon: undefined,
    reactIcon: <GoClippy />,
  },
  {
    href: "/app/customer_request",
    title: "Khách hàng yêu cầu",
    icon: undefined,
    reactIcon: <GoClippy />,
  },
];

export const LIST_SIDE_BAR_OFFICE_STAFF = (idStorage) => {
  return [
    {
      href: "/app/account",
      icon: UserIcon,
      title: "Tài khoản cá nhân",
    },
    {
      href: "/app/users",
      icon: UsersIcon,
      title: "Tài khoản",
    },
    {
      href:
        idStorage !== undefined && idStorage !== null
          ? `/app/storages/${idStorage}`
          : "/app/not_storage",
      title: "Kho",
      icon: undefined,
      reactIcon: <FaWarehouse />,
    },
    {
      href: "/app/orders",
      title: "Đơn hàng",
      icon: undefined,
      reactIcon: <FaFileInvoiceDollar />,
    },

    {
      href: "/app/customer_request",
      title: "Khách hàng yêu cầu",
      icon: undefined,
      reactIcon: <GoClippy />,
    },
  ];
};
