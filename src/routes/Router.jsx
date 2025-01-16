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
    ],
  },
]);
