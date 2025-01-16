import { NavLink, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { LuNotebookPen } from 'react-icons/lu';
import { IoBookmarksOutline } from 'react-icons/io5';
import { MdEditNote } from 'react-icons/md';
import { GiBookshelf } from 'react-icons/gi';
const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* left side component */}
      <div className="bg-[#ECF0F1] p-8 space-y-3">
        <NavLink className="flex items-center gap-1 font-heading" to="/">
          <FaHome />
          Home
        </NavLink>
        <NavLink
          className="flex items-center gap-1 font-heading"
          to="/dashboard/booked-session"
        >
          <IoBookmarksOutline />
          Booked Session
        </NavLink>
        <NavLink
          className="flex items-center gap-1 font-heading"
          to="/dashboard/create-note"
        >
          <LuNotebookPen />
          Create Note
        </NavLink>
        <NavLink
          className="flex items-center gap-1 font-heading"
          to="/dashboard/personal-note"
        >
          <MdEditNote />
          Personal Note
        </NavLink>
        <NavLink
          className="flex items-center gap-1 font-heading"
          to="/dashboard/study-material"
        >
          <GiBookshelf />
          Study material
        </NavLink>
      </div>
      {/* Right side component */}
      <div className="flex-1 md:ml-64">
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>
      DashboardLayout
    </div>
  );
};

export default DashboardLayout;
