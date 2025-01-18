

const SessionCard = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        {/* Image Section */}
        <div className="relative">
          <img
            src={sessionImage || '/api/placeholder/800/400'}
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
            <p className="text-gray-600">{name}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>

          {/* Session Details */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                <span className="text-blue-600 text-sm">
                  📅 {sessionStartDate}
                </span>
              </div>
              <div className="flex items-center bg-purple-50 rounded-full px-4 py-2">
                <span className="text-purple-600 text-sm">
                  ⏰ {startTime} - {endTime}
                </span>
              </div>
            </div>

            {/* Duration and Fee */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-green-50 rounded-full px-4 py-2">
                <span className="text-green-600 text-sm">⌛ {duration}</span>
              </div>
              <div className="flex items-center bg-yellow-50 rounded-full px-4 py-2">
                <span className="text-yellow-600 text-sm">💰 ${fee}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6">
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
  );
};

export default SessionCard;
