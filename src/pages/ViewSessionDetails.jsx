/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { compareAsc, parse } from 'date-fns';
import { Calendar, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ReactStars from 'react-rating-stars-component';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
const ViewSessionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [review, setReview] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

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
    const { _id: sessionId, email: tutorEmail, ...restSession } = session;
    const bookedData = {
      ...restSession,
      tutorEmail,
      sessionId,
      studentName: user.displayName,
      studentEmail: user.email,
    };
    if (sessionPrice === 0) {
      axiosSecure
        .post(`/bookedSession`, bookedData)
        .then((res) => {
          console.log(res.data);
          toast.success('Your Session booked Successfully.😊');
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(`${error.response.data.message}`);
        });
    } else {
      navigate('/dashboard/payment', {
        state: {
          sessionPrice,
          bookedData,
        },
      });
    }
  };

  // rating and reviews
  const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/review/${id}`);
      const totalRatings = data.reduce((total, rev) => total + rev.rating, 0);
      const averageRatings = data.length > 0 ? totalRatings / data.length : 0;
      setAverageRating(parseFloat(averageRatings.toFixed(1)));
      setReview(data);
      return data;
    },
  });

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
                {averageRating > 0 && (
                  <p className="font-body">
                    Average Rating:{' '}
                    <span className="font-heading text-red-500 font-semibold">
                      {averageRating}
                    </span>
                  </p>
                )}
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

            {/* Action Button */}
            <div className="mt-6">
              {compareAsc(
                new Date(),
                parse(session.sessionEndDate, 'dd/MM/yyyy', new Date())
              ) < 0 ? (
                role === 'student' ? (
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
                )
              ) : null}
            </div>
            <button
              onClick={() => window.history.back()}
              className="px-6 font-heading py-2 bg-[#2ECC71] text-white rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>
            <div className="py-6 ">
              <h1 className="font-heading text-xl text-center">
                Review of Students
              </h1>
              {review.length === 0 && (
                <p className="font-body text-lg text-red-500 text-center">
                  No review Provided.
                </p>
              )}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {review.map((rev) => (
                  <div key={rev._id}>
                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <ReactStars
                            count={5}
                            value={rev.rating}
                            edit={false}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {rev.studentName}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {rev.studentEmail}
                      </p>
                      <p className="text-gray-700">{rev.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewSessionDetails;
