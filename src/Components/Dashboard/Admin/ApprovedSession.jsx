import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApprovedSession = ({ approvedSession, refetch }) => {
  const [selectedSession, setSelectSessions] = useState([]);
  const axiosSecure = useAxiosSecure()
  const [updateId, setUpdateId] = useState(null);
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/session/${id}`)
          .then((response) => {
            const { data } = response;
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'This session has been deleted.',
                icon: 'success',
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while deleting the session.',
              icon: 'error',
            });
            console.error('Error deleting session:', error);
          });
      }
    });
  };
  // update a session
  const handleUpdate = (e) => {
    e.preventDefault();
    const status = e.target.status.value;
    const updateData = { status: status };

    // update data send to server
    axiosSecure
      .patch(
        `/session/${updateId}`,
        updateData
      )
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully updated session status.');
        refetch();
        document.getElementById('update').close();
      })
      .catch((error) => {
        console.log('error to update session', error);
        toast.error('Failed to update session status.');
      });
  };

  // open session modal
  const openUpdateModal = (sessionId) => {
    const sessionToUpdate = approvedSession.filter(
      (data) => data._id === sessionId
    );
    setSelectSessions(sessionToUpdate);
    setUpdateId(sessionId);
    document.getElementById('update').showModal();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5;
  const totalPages = Math.ceil(approvedSession.length / sessionsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedSessions = approvedSession.slice(
    (currentPage - 1) * sessionsPerPage,
    currentPage * sessionsPerPage
  );
  return (
    <div>
      <div className="">
        <div className="w-full p-4">
          <div className="overflow-hidden bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg">
            {/* Desktop view */}
            <div className="hidden md:block">
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
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedSession.length === 0 && (
                    <tr>
                      <td colSpan="5">
                        <p className="font-body text-xl py-5 text-center text-red-500">
                          NO Approved Session here.....
                        </p>
                      </td>
                    </tr>
                  )}
                  {paginatedSessions.map((session) => (
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
                          <div className="text-sm text-gray-900">
                            {session.title}
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
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => openUpdateModal(session._id)}
                            className="bg-green-200 text-green-600 font-semibold p-1 rounded-xl hover:bg-green-300 transition-colors"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(session._id)}
                            className="bg-red-200 text-red-600 p-1 rounded-xl font-semibold hover:bg-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
              {approvedSession.length === 0 && (
                <p className="font-body text-xl py-5 text-center text-red-500">
                  NO Approved Session here.....
                </p>
              )}
              {paginatedSessions.map((session) => (
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
                      <div className="text-sm text-gray-500">
                        {session.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <div className="mb-1">
                      <span className="font-medium">Email:</span>{' '}
                      {session.email}
                    </div>
                    <div className="mb-2">
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {session.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openUpdateModal(session._id)}
                      className="flex-1 bg-green-200 text-green-600 font-semibold p-2 rounded-xl hover:bg-green-300 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="flex-1 bg-red-200 text-red-600 p-2 rounded-xl font-semibold hover:bg-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - works for both mobile and desktop */}
            <div className="flex items-center justify-center">
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 w-full">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-gray-500 bg-white rounded-md ${
                    currentPage === 1
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-[#2ECC71] hover:text-white'
                  }`}
                >
                  Previous
                </button>
                <div className="hidden sm:flex space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                          ? 'bg-[#2ECC71] text-white'
                          : 'bg-white text-gray-700 hover:bg-[#2ECC71] hover:text-white'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="sm:hidden text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-gray-500 bg-white rounded-md ${
                    currentPage === totalPages
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-[#2ECC71] hover:text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* show the conformation modal for rejection  */}
      <dialog id="update" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#2ECC71]">
            Update the session rejected or approved?
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col items-center justify-center space-y-2 p-5">
                <label className="font-heading">Do You Want to</label>
                <select
                  name="status"
                  className="select select-bordered w-full max-w-xs font-heading"
                >
                  <option disabled>Update The session</option>
                  <option value="pending">Pending The session</option>
                  <option value="rejected">Reject The session</option>
                </select>
              </div>
              <button className="bg-green-500 text-white px-5 py-2 text-xl font-semibold p-1 rounded-xl">
                Update session Status
              </button>
            </form>
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

export default ApprovedSession;
