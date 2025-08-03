import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

export const statisticsCardsData = () => {
  const { data } = useSelector((state) => state.datas);
const totalRevenue = data?.allOrders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;
  

  return [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Total Books",
      value: data?.books || "0",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Total Users",
      value: data?.users || "0",
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "gray",
      icon: UserPlusIcon,
      title: "Total Orders",
      value: data?.orders || "0",
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Total Revenue",
      value: `${totalRevenue.toFixed(2)|| 0}`, 
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];
};

export default statisticsCardsData;