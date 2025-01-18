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
import StudentHome from '../Components/Dashboard/Student/StudentHome';
import TutorHome from '../Components/Dashboard/Tutor/TutorHome';
import CreateStudySession from '../Components/Dashboard/Tutor/CreateStudySession';
import SessionByTutor from '../Components/Dashboard/Tutor/SessionByTutor';
import UploadMaterials from '../Components/Dashboard/Tutor/UploadMaterials';
import ViewAllMaterials from '../Components/Dashboard/Tutor/ViewAllMaterials';

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
        path: 'student-home',
        element: <StudentHome></StudentHome>,
      },
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

      // tutor routes
      {
        path: 'tutor-home',
        element: <TutorHome></TutorHome>,
      },
      {
        path: 'create-session',
        element: <CreateStudySession></CreateStudySession>,
      },
      {
        path: 'view-study-session',
        element: <SessionByTutor></SessionByTutor>,
      },
      {
        path: 'upload-material',
        element: <UploadMaterials></UploadMaterials>,
      },
      {
        path: 'view-all-materials',
        element: <ViewAllMaterials></ViewAllMaterials>,
      },
    ],
  },
]);
