import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <div className="flex lg:flex-row flex-col">
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-heading font-semibold  ${
              isActive ? 'bg-[#2ECC71] text-white' : 'bg-transparent'
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-heading font-semibold  ${
              isActive ? 'bg-[#2ECC71] text-white' : 'bg-transparent'
            }`
          }
          to="/mission"
        >
          Mission
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-heading font-semibold  ${
              isActive ? 'bg-[#2ECC71] text-white' : 'bg-transparent'
            }`
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink className="font-heading font-semibold" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `font-heading font-semibold  ${
                  isActive ? 'bg-[#2ECC71] text-white' : ''
                }`
              }
              to="/all-session"
            >
              Session
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `font-heading font-semibold  ${
                  isActive ? 'bg-[#2ECC71] text-white' : 'bg-transparent'
                }`
              }
              to="/all-tutor"
            >
              Tutor
            </NavLink>
          </li>
        </>
      )}
      {!user ? (
        <div className="flex gap-2 flex-col md:hidden">
          <NavLink
            className="font-heading text-[#2ECC71] border-[#2ECC71] text-base font-semibold btn"
            to="/login"
          >
            Log-in
          </NavLink>
          <NavLink
            className="font-heading text-base bg-[#2ECC71] text-white font-semibold btn"
            to="/signUp"
          >
            SignUp
          </NavLink>
        </div>
      ) : (
        <>
          <button
            className="font-heading md:hidden text-base bg-[#2ECC71] text-white font-semibold btn"
            onClick={logOut}
          >
            logOut
          </button>
        </>
      )}
    </div>
  );
  return (
    <div className=" sticky bg-white top-0 z-50 border-b shadow-md">
      <div className="navbar px-8">
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
          <div>
            <Link
              className="flex items-center  font-heading md:text-2xl text-lg font-semibold text-[#EECF75]"
              to="/"
            >
              <img
                className="md:w-20 w-8 mr-1 rounded-lg"
                src="/logo.png"
                alt=""
              />
              Edu<span className="text-[#2ECC71]">Fusion</span>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex lg:items-center lg:justify-center">
          <ul className="menu menu-horizontal">{links}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <div className="hidden md:flex gap-2">
              <NavLink
                className="font-heading text-[#2ECC71] border-[#2ECC71] text-base font-semibold btn"
                to="/login"
              >
                Log-in
              </NavLink>
              <NavLink
                className="font-heading text-base bg-[#2ECC71] text-white font-semibold btn"
                to="/signUp"
              >
                SignUp
              </NavLink>
            </div>
          ) : (
            <>
              <button
                className="font-heading hidden md:block text-base bg-[#2ECC71] text-white font-semibold btn"
                onClick={logOut}
              >
                logOut
              </button>
              <div className="w-10 md:block rounded-full">
                <Tooltip id="my-tooltip" />
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                  data-tooltip-place="top"
                  className="z-30 font-heading"
                >
                  <img
                    className="w-10 ml-2 border-2 border-red-400 p-1 h-10 rounded-full"
                    alt="User"
                    src={user.photoURL}
                  />
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
