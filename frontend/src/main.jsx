import { StrictMode, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MachineDetail from "./pages/machines/MachineDetail.jsx";
import MachineList from "./pages/machines/MachineList.jsx";

import Dashboard from './pages/dashboard/Dashboard.jsx';

import SitesList from './pages/sites/SitesList.jsx';
import SiteDetail from './pages/sites/SiteDetail.jsx';
import UsersList from './pages/users/UsersList.jsx';
import UserDetail from './pages/users/UserDetail.jsx';
import TakenList from './pages/tasks/TakenList.jsx';
import TaakDetail from './pages/tasks/TaakDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './pages/Layout.jsx';

import ThemeProvider from './contexts/Theme.context';
import { AuthProvider } from './contexts/Auth.context';

import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import RootRedirect from './components/RootRedirect';
import AddTaak from './pages/tasks/AddTaak.jsx';
import Planning from './pages/planning/Planning.jsx';
import EditTaak from './pages/tasks/EditTaak.jsx';

export const ThemeContext = createContext();

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
      },
      {
        Component: PublicRoute,
        children: [
          {
            path: '/login',
            Component: Login,
          },
        ],
      },
      {
        path: "/logout",
        Component: Logout,
      },
      {
        path: 'dashboard',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
        ],
      },
      {
        path: 'gebruikers',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: UsersList,
          },
          {
            path: ":id",
            Component: UserDetail,
          },
        ],
      },
      {
        path: "sites",
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: SitesList,
          },
          {
            path: ":id",
            Component: SiteDetail,
          },
        ],
      },
      {
        path: "machines",
        Component: PrivateRoute,
        children: [
          {
            path: "site/:id",
            Component: MachineList,
          },
          {
            path: ":id",
            Component: MachineDetail,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
      {
        path: 'taken',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: TakenList,
          },
          {
            path: ':id',
            Component: TaakDetail,
          },
          {
            path: 'add',
            Component: AddTaak,
          },
          {
            path: 'edit/:id',
            Component: EditTaak,
          }
        ],
      },
      {
        path: 'planning',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: Planning,
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
