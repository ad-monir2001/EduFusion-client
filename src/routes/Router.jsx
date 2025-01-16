import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoutes from './PrivateRoutes';
import BookedSession from '../Components/Dashboard/Student/BookedSession';
import CreateNote from '../Components/Dashboard/Student/CreateNote';
import PersonalNote from '../Components/Dashboard/Student/PersonalNote';
import StudyMaterial from '../Components/Dashboard/Student/StudyMaterial';
import AllUsers from '../Components/Dashboard/Admin/AllUsers';
import AllStudySession from '../Components/Dashboard/Admin/AllStudySession';
import AllMaterial from '../Components/Dashboard/Admin/AllMaterial';
import AdminHome from '../Components/Dashboard/Admin/AdminHome';

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
  {
    path: 'dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      // students routes
      {
        path: 'booked-session',
        element: <BookedSession></BookedSession>,
      },
      {
        path: 'create-note',
        element: <CreateNote></CreateNote>,
      },
      {
        path: 'personal-note',
        element: <PersonalNote></PersonalNote>,
      },
      {
        path: 'study-material',
        element: <StudyMaterial></StudyMaterial>,
      },

      // admin routes
      {
        index: true,
        element: <AdminHome></AdminHome>,
      },
      {
        path: 'admin-home',
        element: <AdminHome></AdminHome>,
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>,
      },
      {
        path: 'allStudy-session',
        element: <AllStudySession></AllStudySession>,
      },
      {
        path: 'all-material',
        element: <AllMaterial></AllMaterial>,
      },
    ],
  },
]);
