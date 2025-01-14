import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
  // const { user, logOut } = useContext(AuthContext);
  const user = null;
  const links = (
    <div className="flex gap-2 lg:flex-row flex-col">
      <li>
        <NavLink className="font-heading text-base" to="/">
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink className="font-heading text-base" to="add-car">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </div>
  );
  return (
    <div className=" sticky bg-white top-0 z-50">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          {/* logo */}
          <Link
            className="flex items-center  font-heading md:text-3xl text-lg font-semibold text-[#EECF75]"
            to="/"
          >
            <img
              className="md:w-20 w-8 mr-1 rounded-lg"
              src="/logo.png"
              alt=""
            />
            Edu<span className="text-[#FF3600]">Fusion</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <div className="flex gap-2">
              <NavLink
                className="font-heading text-[#3498DB] border-[#3498DB] text-base font-semibold btn"
                to="login"
              >
                Log-in
              </NavLink>
              <NavLink
                className="font-heading text-base bg-[#3498DB] text-white font-semibold btn"
                to="signUp"
              >
                SignUp
              </NavLink>
            </div>
          ) : (
            <>
              <button
                className="font-heading text-base bg-[#ff3600] text-white font-semibold btn"
                onClick={logOut}
              >
                logOut
              </button>
              <div className="w-10 rounded-full">
                <Tooltip id="my-tooltip" />
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                  data-tooltip-place="top"
                  className="z-30 font-Audiowide"
                >
                  <img alt="User" src={user.photoURL} />
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
