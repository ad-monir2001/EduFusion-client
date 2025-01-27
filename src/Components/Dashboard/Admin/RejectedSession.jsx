const RejectedSession = ({ rejectedSession }) => {
  return (
    <div>
      <div className="">
        {/* <div className="overflow-hidden bg-white shadow-md rounded-lg transition-all duration-300 hover:shadow-lg">
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
            {rejectedSession.length === 0 && (
                <p className="font-heading py-6 text-center text-red-400">
                  No Session is Rejected.....
                </p>
              )}
              {rejectedSession.map((session) => (
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
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="font-semibold text-red-500 bg-red-200 p-1 rounded-xl text-sm">
                      Already Rejected
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
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
                  {rejectedSession.length === 0 && (
                    <tr>
                      <td colSpan="5">
                        <p className="font-heading py-6 text-center text-red-400">
                          No Session is Rejected.....
                        </p>
                      </td>
                    </tr>
                  )}
                  {rejectedSession.map((session) => (
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
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="font-semibold text-red-500 bg-red-200 p-1 rounded-xl text-sm">
                          Already Rejected
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
              {rejectedSession.length === 0 && (
                <p className="font-heading py-6 text-center text-red-400">
                  No Session is Rejected.....
                </p>
              )}
              {rejectedSession.map((session) => (
                <div
                  key={session._id}
                  className="border-b border-gray-200 p-4 space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={session.sessionImage}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover transform transition-transform duration-200 hover:scale-110"
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
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {session.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="inline-block font-semibold text-red-500 bg-red-200 px-4 py-2 rounded-xl text-sm">
                      Already Rejected
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedSession;
