import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const BookedSessionDetails = () => {
  const params = useParams();
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    data: bookedSessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookedSession/${user.email}`);
      return data;
    },
  });

  const desiredSession = bookedSessions.filter(
    (session) => session._id === params.id
  );

  const handleReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const studentName = form.name.value;
    const studentEmail = form.email.value;
    const review = form.review.value;
    const rating = parseInt(form.rating.value);
    const sessionId = desiredSession[0].sessionId;
    const reviewDetails = {
      studentName,
      studentEmail,
      review,
      rating,
      sessionId,
    };

    // send data to server
    axiosSecure
      .post(`/reviews`, reviewDetails)
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully Accepted your Reviews');

        form.reset();
      })
      .catch((error) => {
        console.log('error to Submit Review', error.message);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Session Details</title>
      </Helmet>
      {desiredSession.map((session) => (
        <div
          key={session._id}
          className="bg-blue-50 border border-blue-100 shadow-lg rounded-2xl p-4 "
        >
          <img
            src={session.sessionImage}
            alt="Session"
            className="rounded-lg w-full h-[50vh] object-cover mb-4"
          />
          <p className="font-heading text-xl font-semibold text-blue-800 mb-2">
            {session.title}
          </p>
          <p className="text-gray-700 mb-4 font-body">{session.description}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
            <div className="px-6">
              <p className=" text-gray-600 font-body">
                <span className="font-semibold">Student Name:</span>{' '}
                {session.studentName}
              </p>
              <p className="font-body text-gray-600">
                <span className="font-semibold">Tutor Name:</span>{' '}
                {session.name}
              </p>
              <p className=" font-body text-gray-600">
                <span className="font-semibold">Class Start:</span>{' '}
                {session.startTime}
              </p>
              <p className=" text-gray-600">
                <span className="font-semibold">Class Duration:</span>{' '}
                {session.duration}
              </p>
            </div>
            <div className="px-6">
              <p className=" text-gray-600">
                <span className="font-semibold font-body">Student Email:</span>{' '}
                {session.studentEmail}
              </p>
              <p className=" text-gray-600 font-body">
                <span className="font-semibold">Tutor Email:</span>{' '}
                {session.tutorEmail}
              </p>
              <p className=" text-gray-600 font-body">
                <span className="font-semibold">Class End Time:</span>{' '}
                {session.endTime}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Review and ratings */}

      <div className="mt-14">
        <div className="text-center">
          <h1 className="font-heading text-3xl">
            Provide Your Review and Ratings
          </h1>
          <p className="font-body">
            Share your feedback and rate your experience to help us improve.
            Your insights ensure better study sessions and a more collaborative
            learning environment!
          </p>
        </div>
        {desiredSession.map((session) => (
          <form onSubmit={handleReview} className="space-y-6" key={session._id}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Student Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                readOnly
                defaultValue={user.email}
                className="w-full px-4 py-2 border rounded-lg cursor-not-allowed bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Student Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                readOnly
                defaultValue={session.studentName}
                className="w-full cursor-not-allowed px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note title"
              />
            </div>

            {/* review Field */}
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="review"
                required
                name="review"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Review..."
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Rating (1-5)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-heading bg-[#2ECC71] text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Review and Rating
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default BookedSessionDetails;
