import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { useState } from 'react';
import { imageUpload } from '../../../utils/utils';
import axios from 'axios';
import toast from 'react-hot-toast';
const UploadMaterials = () => {
  const [selectedSession, setSelectedSession] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['sessions', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session/${user?.email}`);
      return data;
    },
  });

  // Find the approved sessions only
  const approvedSessions = sessions.filter(
    (session) => session.status === 'approved'
  );

  const handleUpdateMaterials = async (e) => {
    e.preventDefault();
    const form = e.target;
    const googleDriveLink = form.driveLink.value;
    const image = form.image.files[0];
    const materialImage = await imageUpload(image);

    const materialData = { googleDriveLink, materialImage, sessionId };

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/materials`, materialData)
      .then((response) => {
        console.log(response.data);
        document.getElementById('conform').close();
        toast.success('Successfully Uploaded your materials');
      })
      .catch((error) => {
        console.log('error to upload material data', error.message);
      });
  };

  // open session modal
  const openSessionModal = (Id) => {
    const desiredSession = approvedSessions.filter((data) => data._id === Id);
    setSelectedSession(desiredSession);
    setSessionId(Id);
    document.getElementById('conform').showModal();
  };

  return (
    <div>
      {/* heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-primary">
          Upload Study Materials with Ease
        </h1>
        <p className="text-lg text-gray-600 italic">
          Share valuable resources and enhance collaborative learning. Upload
          notes, presentations, and more to empower every student in the
          community." Let me know if you'd like alternative suggestions!
        </p>
      </div>

      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : sessions.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No sessions available at the moment.
          </p>
        </div>
      ) : (
        // Session cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedSessions.map((session) => (
            <div
              className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
              key={session._id}
            >
              <img
                className="w-full h-48 object-cover"
                src={session.sessionImage}
                alt="Course Thumbnail"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded">
                    {session.status}
                  </span>
                </div>
                <h3 className="text-gray-800 font-bold text-xl">
                  {session.title}
                </h3>
                <button
                  onClick={() => openSessionModal(session._id)}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Upload Material
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* show the conformation modal */}
      <dialog id="conform" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Upload Material
          </h3>
          <div className="flex items-center justify-between border rounded-xl my-2 ">
            {selectedSession.map((session) => (
              <form
                key={session._id}
                onSubmit={handleUpdateMaterials}
                className="card-body"
              >
                {/* session details */}
                <div className="space-y-2 text-center">
                  <p className="font-heading">
                    Session Name:{' '}
                    <span className="text-green-400">{session.title}</span>{' '}
                  </p>
                  <p className="font-heading">
                    Session Id:{' '}
                    <span className="text-green-400">{session._id}</span>{' '}
                  </p>
                  <p className="font-heading">
                    Tutor Email:{' '}
                    <span className="text-green-400">{session.email}</span>{' '}
                  </p>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">
                      Material Google Drive Link:
                    </span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="file-input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">
                      Material Google Drive Link:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="driveLink"
                    className="input input-bordered"
                    required
                  />
                </div>
                <button className="btn btn-success font-heading text-white">
                  Upload
                </button>
              </form>
            ))}
          </div>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex justify-between gap-4 items-center"
            >
              <button className="btn btn-error text-white font-heading">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UploadMaterials;
