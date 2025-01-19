/* eslint-disable react/prop-types */
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Swal from 'sweetalert2';
const SessionTable = ({ pendingSession, refetch }) => {
  const [selectedSession, setSelectedSession] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  // rejected a session
  const handleRejected = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to rejected this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // fetch(`${import.meta.env.VITE_API_BASE_URL}/session/${id}`, {
        //   method: 'DELETE',
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //   if (data.deletedCount) {
        //     Swal.fire({
        //       title: 'Deleted!',
        //       text: 'This session has been deleted.',
        //       icon: 'success',
        //     });
        //     refetch();
        //   }
        // });
      }
    });
  };

  // update a session
  const handleUpdateSession = (e) => {
    e.preventDefault();
    const fee = e.target.fee.value;
    const updateData = { fee: fee, status: 'approved' };

    // update data send to server
    axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/session/${updateId}`,
        updateData
      )
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully updated session status.');
        refetch();
        document.getElementById('conform').close();
      })
      .catch((error) => {
        console.log('error to update session', error);
        toast.error('Failed to update session status.');
      });
  };

  // open session modal
  const openSessionModal = (sessionId) => {
    const dataToUpdate = pendingSession.filter(
      (data) => data._id === sessionId
    );
    setSelectedSession(dataToUpdate);
    setUpdateId(sessionId);
    document.getElementById('conform').showModal();
  };
  return (
    <div>
      <div className="">
        <div className="overflow-hidden bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Session Title-image</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tutor Name</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingSession.map((session) => (
                <tr
                  key={session._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <img
                        src={session.sessionImage}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover transform transition-transform duration-200 hover:scale-110"
                      />
                      <div>
                        <div className="text-sm text-gray-900">
                          {session.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.email}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => openSessionModal(session._id)}
                        className="bg-green-200 text-green-600 font-semibold p-1 rounded-xl"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => handleRejected(session._id)}
                        className="bg-red-200 text-red-600 p-1 rounded-xl font-semibold"
                      >
                        Rejected
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* show the conformation modal */}
      <dialog id="conform" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Update the session rejected or approved?
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            {selectedSession.map((data) => (
              <form
                onSubmit={handleUpdateSession}
                key={data._id}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">
                      Is this session free or paid ?
                    </span>
                  </label>
                  <input
                    type="number"
                    name="fee"
                    defaultValue={data.fee}
                    className="input input-bordered"
                    required
                  />
                </div>
                <button className="btn btn-success font-heading text-white">
                  Confirm
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

export default SessionTable;
