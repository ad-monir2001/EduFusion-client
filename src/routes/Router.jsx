import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
    ],
  },
  { path: 'signUp', element: <Signup></Signup> },
  { path: 'login', element: <Login></Login> },
]);
