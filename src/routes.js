import React from "react";

// Admin Imports
import ProjectsPage from "views/admin/projects";
import InvoicesPage from "views/admin/invoices";
import ProposalsPage from "views/admin/proposals";
import TicketsPage from "views/admin/tickets";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdFolderOpen, MdReceipt, MdDescription, MdSupport, MdOutlineShoppingCart, MdBarChart, MdPerson, MdLock } from "react-icons/md";

const routes = [
  {
    name: "Projects",
    layout: "/admin",
    path: "projects",
    icon: MdFolderOpen,
    component: ProjectsPage,
  },
  {
    name: "Invoices",
    layout: "/admin",
    path: "invoices",
    icon: MdReceipt,
    component: InvoicesPage,
  },
  {
    name: "Proposals",
    layout: "/admin",
    path: "proposals",
    icon: MdDescription,
    component: ProposalsPage,
  },
   {
    name: "Support",
    layout: "/admin",
    path: "tickets",
    icon: MdSupport,
    component: TicketsPage,
  },
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
];
export default routes;
