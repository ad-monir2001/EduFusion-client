import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const BookedSessionDetails = () => {
  const params = useParams();
  console.log(params.id);
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
  return (
    <div>
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
            <div className='px-6'>
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
            <div className='px-6'>
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
      <div>
        
      </div>
    </div>
  );
};

export default BookedSessionDetails;
