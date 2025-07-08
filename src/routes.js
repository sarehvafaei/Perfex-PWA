import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: MdHome,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: MdOutlineShoppingCart,
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: MdBarChart,
    path: "data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: MdPerson,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: MdLock,
    component: SignIn,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: MdHome,
    component: RTLDefault,
  },
];
export default routes;
