import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UsersTable = ({ users, refetch, }) => {
  const axiosSecure = useAxiosSecure();
  const handleUpdateUser = (id, role) => {
    axiosSecure
      .patch(`/users/role/${id}`, {
        role: role,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
              {/* Desktop version */}
              <div className="hidden md:block">
                <div className="overflow-hidden bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <span>Name</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex items-center space-x-2">
                            <span>Role</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="transition-colors duration-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <img
                                src={user.image}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover transform transition-transform duration-200 hover:scale-110"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {user.role !== 'admin' && (
                              <select
                                onChange={(e) =>
                                  handleUpdateUser(user._id, e.target.value)
                                }
                                name="role"
                                className="select select-bordered w-full max-w-xs font-heading"
                              >
                                <option>Select</option>
                                <option value="student">Student</option>
                                <option value="tutor">Tutor</option>
                                <option value="admin">Admin</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* pagination */}
                  <div className="flex items-center justify-center">
                    <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-gray-500 bg-white rounded-md ${
                          currentPage === 1
                            ? 'cursor-not-allowed'
                            : 'hover:bg-[#2ECC71] hover:text-white'
                        }`}
                      >
                        Previous
                      </button>
                      <div className="flex space-x-2">
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
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-gray-500 bg-white rounded-md ${
                          currentPage === totalPages
                            ? 'cursor-not-allowed'
                            : 'hover:bg-[#2ECC71] hover:text-white'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile version */}
              <div className="md:hidden space-y-4">
                {paginatedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-lg shadow p-4 space-y-4 transform transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.image}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover transform transition-transform duration-200 hover:scale-110"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    {user.role !== 'admin' && (
                      <div className="flex justify-end">
                        <select
                          onChange={(e) =>
                            handleUpdateUser(user._id, e.target.value)
                          }
                          name="role"
                          className="select select-bordered w-full max-w-xs font-heading"
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* pagination */}
      <div className="md:hidden flex items-center justify-center">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-gray-500 bg-white rounded-md ${
              currentPage === 1
                ? 'cursor-not-allowed'
                : 'hover:bg-[#2ECC71] hover:text-white'
            }`}
          >
            Previous
          </button>
          <div className="flex space-x-2">
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
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-gray-500 bg-white rounded-md ${
              currentPage === totalPages
                ? 'cursor-not-allowed'
                : 'hover:bg-[#2ECC71] hover:text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
