import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const handleCreateNote = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const noteTitle = form.title.value;
    const noteDescription = form.description.value;
    const noteData = { email, noteTitle, noteDescription };

    // save the data to the server
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/notes`, noteData)
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully Uploaded your materials');
        navigate('/dashboard/personal-note')
        form.reset()
      })
      .catch((error) => {
        console.log('error to upload material data', error.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 font-heading">
          Create Your Personal Note
        </h1>
        <p className="text-gray-600 font-body">
          A collaborative study platform designed to enhance learning through
          shared resources and interactive tools
        </p>
      </div>

      <form onSubmit={handleCreateNote} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Student Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            readOnly
            defaultValue={user.email}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Note Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Note Description
          </label>
          <textarea
            id="description"
            required
            name="description"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note description"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full font-heading bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
