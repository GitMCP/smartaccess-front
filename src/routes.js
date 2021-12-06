import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

const routes = (isLogged) => [
  {
    path: 'app',
    element: isLogged ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'login',
        element: isLogged ? <Navigate to="/app/dashboard" /> : <Login />
      },
      { path: '404', element: <NotFound /> },
      {
        path: '/',
        element: isLogged ? (
          <Navigate to="/app/dashboard" />
        ) : (
          <Navigate to="/login" />
        )
      },
      {
        path: '*',
        element: isLogged ? (
          <Navigate to="/app/dashboard" />
        ) : (
          <Navigate to="/login" />
        )
      }
    ]
  }
];
export default routes;