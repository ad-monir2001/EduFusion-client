import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { imageUpload, saveUser } from '../utils/utils';
import { useLottie } from 'lottie-react';
import signInAnimation from '../../public/signin.json';
import { IoMdArrowBack } from 'react-icons/io';
const Signup = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const image = form.image.files[0];
    // give image data to image bb
    const photoURL = await imageUpload(image);

    try {
      // user registration
      const result = await createUser(email, password);
      // save username and photo
      await updateUserProfile(name, photoURL);
      // save user in db
      await saveUser({ ...result?.user, displayName: name, photoURL, role });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const options = {
    animationData: signInAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <div className="w-9/12 mx-auto my-5 py-10">
      <h1 className="font-heading text-center my-3 text-3xl md:text-5xl font-semibold text-[#2C3E50]">
        {' '}
        Sign-up here
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
        <form
          className="card-body bg-[#ECF0F1] border rounded-lg shadow-sm"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-heading">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name Here"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
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
          {/* photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-heading">Image</span>
            </label>
            <input
              type="file"
              className="file-input input-bordered"
              required
              name="image"
              accept="image/*"
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
          {/* role */}
          <div>
            <label className="font-heading" htmlFor="role">
              Select your Role:{' '}
            </label>
            <select
              name="role"
              className="select select-bordered w-full max-w-xs font-heading"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>
          <button className="btn bg-[#3498DB] text-white font-heading text-xl">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
