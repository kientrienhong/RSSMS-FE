import { FaWarehouse, FaFileInvoiceDollar } from "react-icons/fa";
import { VscTag } from "react-icons/vsc";
import { GrSchedule } from "react-icons/gr";
import { User as UserIcon, Users as UsersIcon } from "react-feather";
import { GoClippy } from "react-icons/go";

export const LIST_SIDE_BAR_ADMIN = [
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Account",
  },
  {
    href: "/app/users",
    icon: UsersIcon,
    title: "Users",
  },
  {
    href: "/app/products",
    icon: undefined,
    title: "Product",
    reactIcon: <VscTag />,
  },
  {
    href: "/app/storages",
    title: "Storages",
    icon: undefined,
    reactIcon: <FaWarehouse />,
  },
  {
    href: "/app/orders",
    icon: undefined,
    title: "Orders",
    reactIcon: <FaFileInvoiceDollar />,
  },
];

export const LIST_SIDE_BAR_MANAGER = [
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Account",
  },
  {
    href: "/app/users",
    icon: UsersIcon,
    title: "Users",
  },
  {
    href: "/app/storages",
    title: "Storages",
    icon: undefined,
    reactIcon: <FaWarehouse />,
  },
  {
    href: "/app/schedule",
    title: "Schedule",
    icon: undefined,
    reactIcon: <GrSchedule />,
  },
  {
    href: "/app/orders",
    title: "Orders",
    icon: undefined,
    reactIcon: <FaFileInvoiceDollar />,
  },
  {
    href: "/app/staff_request",
    title: "Staff's Requests",
    icon: undefined,
    reactIcon: <GoClippy />,
  },
  {
    href: "/app/customer_request",
    title: "Customer's Requests",
    icon: undefined,
    reactIcon: <GoClippy />,
  },
];

export const LIST_SIDE_BAR_OFFICE_STAFF = (idStorage) => {
  return [
    {
      href: "/app/account",
      icon: UserIcon,
      title: "Account",
    },
    // {
    //   href: "/app/users",
    //   icon: UsersIcon,
    //   title: "Users",
    // },
    {
      href:
        idStorage !== undefined
          ? `/app/storages/${idStorage}`
          : "/app/not_storage",
      title: "Storages",
      icon: undefined,
      reactIcon: <FaWarehouse />,
    },
    {
      href: "/app/orders",
      title: "Orders",
      icon: undefined,
      reactIcon: <FaFileInvoiceDollar />,
    },
  ];
};
