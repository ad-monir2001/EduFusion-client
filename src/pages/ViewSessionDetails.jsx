/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { compareAsc, parse } from 'date-fns';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import useRole from '../hooks/useRole';
const ViewSessionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [role] = useRole();
  console.log(role);

  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = useAxiosSecure(`/session`);
      return data;
    },
  });
  const approvedSessions = sessions.filter(
    (session) => session.status === 'approved'
  );
  const desiredSession = approvedSessions.filter(
    (session) => session._id === id
  );

  const handleBookSession = (session) => {
    const sessionPrice = parseInt(session.fee);
    console.log(sessionPrice);
  };
  return (
    <div className="flex items-center justify-center my-10 md:my-20">
      {desiredSession.map((session) => (
        <div
          key={session._id}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">
              {session.title}
            </h2>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">by</span>
                <span className="font-semibold text-gray-800">
                  {session.name}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">
                  5{/* {averageRating.toFixed(1)} */}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            <p className="text-gray-600 font-body">{session.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1 flex items-center gap-1 font-heading">
                  <Calendar className="w-4 h-4" />
                  Registration Period
                </h3>
                <p className="text-gray-600 font-body">
                  {session.sessionStartDate} - {session.sessionEndDate}
                </p>
              </div>

              <div>
                <h3 className="font-semibold font-heading text-gray-700 mb-1">
                  Class Schedule
                </h3>
                <p className="text-gray-600 font-body">
                  {session.startTime} - {session.endTime}
                </p>
              </div>

              <div>
                <h3 className="font-semibold font-heading text-gray-700 mb-1">
                  Duration
                </h3>
                <p className="text-gray-600 font-body">{session.duration}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-1 font-heading">
                  Registration Fee
                </h3>
                <p className="text-gray-600 font-body">{session.fee} $</p>
              </div>
            </div>

            {/* Reviews Section */}
            {/* <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Student Reviews</h3>
            <div className="space-y-3">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{review.rating}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div> */}

            {/* Action Button */}
            <div className="mt-6">
              {compareAsc(
                new Date(),
                parse(session.sessionEndDate, 'dd/MM/yyyy', new Date())
              ) < 0 ? (
                <button
                  onClick={() => handleBookSession(session)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 font-heading"
                >
                  Book Now
                </button>
              ) : (
                <button
                  className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed font-heading"
                  disabled
                >
                  Registration Closed
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewSessionDetails;
