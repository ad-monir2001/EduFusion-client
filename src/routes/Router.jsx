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
import AdminRoute from './AdminRoute';
import StudentRoute from './StudentRoute';
import TutorRoute from './TutorRoute';
import ViewSessionDetails from '../pages/ViewSessionDetails';
import Payment from '../Components/Dashboard/Student/Payment';
import BookedSessionDetails from '../Components/Dashboard/Student/BookedSessionDetails';

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
      {
        path: '/read-more/:id',
        element: (
          <PrivateRoutes>
            <ViewSessionDetails></ViewSessionDetails>
          </PrivateRoutes>
        ),
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
        element: (
          <StudentRoute>
            <StudentHome></StudentHome>
          </StudentRoute>
        ),
      },
      {
        path: 'booked-session',
        element: (
          <StudentRoute>
            <BookedSession></BookedSession>
          </StudentRoute>
        ),
      },
      {
        path: 'payment',
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
      {
        path: 'create-note',
        element: (
          <StudentRoute>
            <CreateNote></CreateNote>
          </StudentRoute>
        ),
      },
      {
        path: 'personal-note',
        element: (
          <StudentRoute>
            <PersonalNote></PersonalNote>
          </StudentRoute>
        ),
      },
      {
        path: 'study-material',
        element: (
          <StudentRoute>
            <StudyMaterial></StudyMaterial>
          </StudentRoute>
        ),
      },
      {
        path: 'booked-session/session-details/:id',
        element: (
          <StudentRoute>
            <BookedSessionDetails></BookedSessionDetails>
          </StudentRoute>
        ),
      },

      // admin routes
      {
        index: true,
        element: <AdminHome></AdminHome>,
      },
      {
        path: 'admin-home',
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: 'all-users',
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: 'allStudy-session',
        element: (
          <AdminRoute>
            <AllStudySession></AllStudySession>
          </AdminRoute>
        ),
      },
      {
        path: 'all-material',
        element: (
          <AdminRoute>
            <AllMaterial></AllMaterial>
          </AdminRoute>
        ),
      },

      // tutor routes
      {
        path: 'tutor-home',
        element: (
          <TutorRoute>
            <TutorHome></TutorHome>
          </TutorRoute>
        ),
      },
      {
        path: 'create-session',
        element: (
          <TutorRoute>
            <CreateStudySession></CreateStudySession>
          </TutorRoute>
        ),
      },
      {
        path: 'view-study-session',
        element: (
          <TutorRoute>
            <SessionByTutor></SessionByTutor>
          </TutorRoute>
        ),
      },
      {
        path: 'upload-material',
        element: (
          <TutorRoute>
            <UploadMaterials></UploadMaterials>
          </TutorRoute>
        ),
      },
      {
        path: 'view-all-materials',
        element: (
          <TutorRoute>
            <ViewAllMaterials></ViewAllMaterials>
          </TutorRoute>
        ),
      },
    ],
  },
]);
