/* eslint-disable react/prop-types */
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Swal from 'sweetalert2';
const SessionTable = ({ pendingSession, refetch }) => {
  const [selectedSession, setSelectedSession] = useState([]);
  const [selectRejectedSession, setSelectRejectedSession] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  // update a session to approve
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

  // update a session to reject
  const handleRejectedSession = (e) => {
    e.preventDefault();
    const reason = e.target.reason.value;
    const feedback = e.target.feedback.value;
    const updateData = {
      reason: reason,
      feedback: feedback,
      status: 'rejected',
    };

    // update data send to server
    axios
      .patch(
        `${import.meta.env.VITE_API_BASE_URL}/session/${updateId}`,
        updateData
      )
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully rejected session');
        refetch();
        document.getElementById('reject').close();
      })
      .catch((error) => {
        console.log('error to reject session', error);
        toast.error('Failed to reject session status.');
      });
  };

  // open session modal for approve sessions
  const openSessionModal = (sessionId) => {
    const dataToUpdate = pendingSession.filter(
      (data) => data._id === sessionId
    );
    setSelectedSession(dataToUpdate);
    setUpdateId(sessionId);
    document.getElementById('conform').showModal();
  };

  // open session modal for rejected sessions
  const openRejectedModal = (sessionId) => {
    const dataToReject = pendingSession.filter(
      (data) => data._id === sessionId
    );
    setSelectRejectedSession(dataToReject);
    setUpdateId(sessionId);
    document.getElementById('reject').showModal();
  };
  return (
    <div>
     
      <div className="w-full p-4">
        <div className="overflow-hidden bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg">
          {/* Large screens - Regular table */}
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <span>Session Title-image</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <span>Tutor Name</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingSession.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-green-400"
                    >
                      No Session is pending.....
                    </td>
                  </tr>
                )}
                {pendingSession.map((session) => (
                  <tr
                    key={session._id}
                    className="transition-colors duration-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <img
                          src={session.sessionImage}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover transform transition-transform duration-200 hover:scale-110"
                        />
                        <div className="text-sm text-gray-900">
                          {session.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {session.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {session.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {session.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => openSessionModal(session._id)}
                          className="bg-green-200 text-green-600 font-semibold p-1 rounded-xl hover:bg-green-300 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openRejectedModal(session._id)}
                          className="bg-red-200 text-red-600 p-1 rounded-xl font-semibold hover:bg-red-300 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view - Card layout */}
          <div className="md:hidden">
            {pendingSession.length === 0 && (
              <p className="py-6 text-center text-green-400">
                No Session is pending.....
              </p>
            )}
            {pendingSession.map((session) => (
              <div
                key={session._id}
                className="border-b border-gray-200 p-4 space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={session.sessionImage}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {session.title}
                    </div>
                    <div className="text-sm text-gray-500">{session.name}</div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <div className="mb-1">
                    <span className="font-medium">Email:</span> {session.email}
                  </div>
                  <div className="mb-2">
                    <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {session.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openSessionModal(session._id)}
                    className="flex-1 bg-green-200 text-green-600 font-semibold p-2 rounded-xl hover:bg-green-300 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openRejectedModal(session._id)}
                    className="flex-1 bg-red-200 text-red-600 p-2 rounded-xl font-semibold hover:bg-red-300 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
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

      {/* show the conformation modal for rejection  */}
      <dialog id="reject" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Update the session rejected or approved?
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            {selectRejectedSession.map((data) => (
              <form
                onSubmit={handleRejectedSession}
                key={data._id}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">
                      Rejection Reason
                    </span>
                  </label>
                  <input
                    type="text"
                    name="reason"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-heading">
                      Rejection Feedback
                    </span>
                  </label>
                  <input
                    type="text"
                    name="feedback"
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
