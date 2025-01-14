import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-[#1D1D1D] text-[#E1E1E1] flex items-center justify-between gap-4 p-4 flex-col md:flex-row text-center">
      <p>
        Copyright © {new Date().getFullYear()} All Rights Reserved by{' '}
        <span className="text-[#eecf75]">Edu</span>
        <span className="text-[#ff3600]">Fusion</span>
      </p>
      <Link
        className="flex items-center  font-heading md:text-2xl text-lg font-semibold text-[#EECF75]"
        to="/"
      >
        <img className="md:w-14 w-8 mr-1 rounded-lg" src="/logo.png" alt="" />
        Edu<span className="text-[#FF3600]">Fusion</span>
      </Link>
      {/* links */}
      <div>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </div>
    </div>
  );
};

export default Footer;
