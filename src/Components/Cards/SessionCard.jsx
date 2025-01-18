const SessionCard = ({ session }) => {
  const {
    description,
    duration,
    fee,
    sessionStartDate,
    sessionEndDate,
    status,
    sessionImage,
    title,
    startTime,
    endTime,
  } = session;

  console.log(startTime, endTime);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        {/* Image Section */}
        <div className="relative">
          <img
            src={sessionImage}
            alt="Session Cover"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>

          {/* Session Details */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                <span className="text-blue-600 text-sm">
                  📅 Registration Start Time: {sessionStartDate}
                </span>
              </div>
              <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                <span className="text-blue-600 text-sm">
                  📅 Registration End Time: {sessionEndDate}
                </span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-full px-4 py-2">
                <span className="text-purple-600 text-sm">
                  ⏰ Class Start Time: {startTime}
                </span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-full px-4 py-2">
                <span className="text-purple-600 text-sm">
                  ⏰ Class End Time: {endTime}
                </span>
              </div>
            </div>
          </div>
          <div className=" bg-green-50 rounded-full px-4 py-2 my-2">
            <span className="text-green-600 text-sm">⌛ {duration}</span>
          </div>
          <div className="flex items-center justify-between">
            {/* Duration and Fee */}

            <div className="flex items-center bg-yellow-50 rounded-full px-4 py-2">
              <span className="text-yellow-600 text-sm">💰 ${fee}</span>
            </div>

            {/* Status */}
            <div>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  status === 'success'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
