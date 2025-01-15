import { useLottie } from 'lottie-react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import signInAnimation from '../../public/login.json';
import { imageUpload, saveUser } from '../utils/utils';
import { useAuth } from '../hooks/useAuth';
const Login = () => {
  const { signIn, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from.pathname || '/';
  if (loading) return <RingLoader color="#026ba6" />;
  if (user) return <Navigate to={from} replace={true} />;
  const handleBack = () => {
    navigate(-1);
  };
  // lottie react code
  const options = {
    animationData: signInAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try{
        await signIn(email, password)

        navigate(from, {replace:true})
    }catch(error){
        console.log(error);
    }
  };
  return (
    <div className="lg:w-9/12 px-3 mx-auto my-5 py-10">
      <h1 className="font-heading text-center my-3 text-3xl md:text-5xl font-semibold text-[#2C3E50]">
        {' '}
        Login here
      </h1>
      <button
        onClick={handleBack}
        className="text-xl flex items-center text-error"
      >
        <IoMdArrowBack />
        Back
      </button>
      <div className="flex flex-col md:flex-row my-9 gap-8 items-center">
        {/* lottie */}
        <div>{View}</div>
        {/* form */}
        <div className="p-5 md:w-[380px] bg-[#ECF0F1] border rounded-lg shadow-sm">
          <form className=" space-y-4" onSubmit={handleSubmit}>
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-heading">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-heading">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                required
                name="password"
                placeholder="Enter new password"
              />
            </div>

            <button className="btn w-full bg-[#3498DB] text-white font-heading text-xl">
              Login
            </button>
          </form>

          <p className="mt-4 text-center font-body text-gray-600">
            Or sign in with
          </p>
          <button className="flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg bg-gray-50 w-full">
            <span className="mx-2 font-body">Sign in with </span>
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </button>
          <button className="flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg bg-gray-50 w-full">
            <span className="mx-2 font-body">Sign in with </span>
            <img width={25} src="/images/git.svg" alt="" />
          </button>
          <div className="mt-6 text-center ">
            <Link
              to="/signUp"
              className="text-sm font-body text-blue-500 hover:underline dark:text-blue-400"
            >
              Don’t have an account yet? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
