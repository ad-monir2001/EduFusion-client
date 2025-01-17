import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UsersTable = ({ users, refetch }) => {
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
                      {users.map((user) => (
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
                              // <button
                              //   onClick={() => handleUpdateUser(user._id)}
                              //   className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                              // >
                              //   <svg
                              //     xmlns="http://www.w3.org/2000/svg"
                              //     className="h-5 w-5 transform transition-transform duration-200 hover:scale-110"
                              //     fill="none"
                              //     viewBox="0 0 24 24"
                              //     stroke="currentColor"
                              //   >
                              //     <path
                              //       strokeLinecap="round"
                              //       strokeLinejoin="round"
                              //       strokeWidth={2}
                              //       d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              //     />
                              //   </svg>
                              // </button>
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
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile version */}
              <div className="md:hidden space-y-4">
                {users.map((user) => (
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
                        {/* <button
                          onClick={() => handleUpdateUser(user._id)}
                          className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transform transition-transform duration-200 hover:scale-110"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button> */}
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
    </div>
  );
};

export default UsersTable;
