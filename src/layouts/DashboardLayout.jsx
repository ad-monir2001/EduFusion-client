import { NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { LuNotebookPen } from 'react-icons/lu';
import { IoBookmarksOutline } from 'react-icons/io5';
import { MdEditNote } from 'react-icons/md';
import { GiBookshelf } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa6';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { LuLogOut } from 'react-icons/lu';
import { RiHomeGearFill } from 'react-icons/ri';
import { AiOutlineFolderView } from 'react-icons/ai';
import { MdCloudUpload } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { useAuth } from '../hooks/useAuth';
import useRole from '../hooks/useRole';
const DashboardLayout = () => {
  const [role] = useRole();
  console.log(role);
  const { logOut } = useAuth();
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* left side component */}
      <div className="bg-[#ECF0F1] p-8 space-y-3 flex flex-col justify-between">
        <div>
          {role === 'admin' && (
            <>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
        ${
          isActive
            ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
            : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
        }`
                }
                to="/dashboard/admin-home"
              >
                <RiHomeGearFill />
                Admin Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/all-users"
              >
                <FaUsers />
                All Users
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/allStudy-session"
              >
                <MdOutlineVideoLibrary />
                All study session
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/all-material"
              >
                <GiBookshelf />
                All material
              </NavLink>
            </>
          )}
          {role === 'student' && (
            <>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
        ${
          isActive
            ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
            : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
        }`
                }
                to="/"
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/booked-session"
              >
                <IoBookmarksOutline />
                Booked Session
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/create-note"
              >
                <LuNotebookPen />
                Create Note
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/personal-note"
              >
                <MdEditNote />
                Personal Note
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/study-material"
              >
                <GiBookshelf />
                Study material
              </NavLink>
            </>
          )}
          {role === 'tutor' && (
            <>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
        ${
          isActive
            ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
            : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
        }`
                }
                to="/dashboard/tutor-home"
              >
                <FaHome />
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/create-session"
              >
                <IoCreateOutline />
                Create Study Session
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/view-study-session"
              >
                <LuNotebookPen />
                View Study Session
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/upload-material"
              >
                <MdCloudUpload />
                Upload materials
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 font-heading transition-all duration-200
            ${
              isActive
                ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
                : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
            }`
                }
                to="/dashboard/view-all-materials"
              >
                <AiOutlineFolderView />
                View all materials
              </NavLink>
            </>
          )}
        </div>

        <div className="border-t-2 border-yellow-300 pt-10">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-1 font-heading transition-all duration-200
        ${
          isActive
            ? 'bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow-md'
            : 'text-gray-700 hover:bg-white/50 hover:text-blue-500 px-4 py-2 rounded-lg'
        }`
            }
            to="/"
          >
            <FaHome />
            Home
          </NavLink>
          <button onClick={logOut} className="flex items-center gap-1 ml-4">
            <LuLogOut />
            Logout
          </button>
        </div>
      </div>
      {/* Right side component */}
      <div className="flex-1 md:ml-64">
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
