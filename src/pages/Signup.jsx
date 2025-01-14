import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { imageUpload, saveUser } from '../utils/utils';

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
  return (
    <div>
      Signup
      <div className="flex">
        {/* lottie */}
        <div></div>
        {/* form */}
        <form
          className="card-body border rounded-lg shadow-sm"
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
            <label htmlFor="role">Select your Role: </label>
            <select
              name="role"
              className="select select-bordered w-full max-w-xs"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>
          <button className="btn">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
