import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const BookedSession = () => {
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
  return (
    <div>
      <div className="text-center my-3">
        <h1 className="font-heading text-3xl font-semibold">
          View your Booked Sessions
        </h1>
        <p className="font-body text-lg">
          Keep track of all your upcoming study sessions effortlessly. Stay
          organized, manage your schedule, and ensure you never miss a moment of
          collaborative learning!
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-8 my-5 py-3'>
        {
          bookedSessions.length === 0 && <p>No session booked by you.</p>
        }
        {
          bookedSessions.map(bookedSession=> <div key={bookedSession._id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
            <img src={bookedSession.sessionImage} alt={bookedSession._id} className="w-full sm:w-64 h-48 sm:h-auto object-cover" />
            <div className="p-4 flex-1">
              <h3 className="text-xl font-semibold mb-2">{bookedSession.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{bookedSession.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-orange-500 font-bold text-2xl">${bookedSession.fee}</span>
                <Link to={`session-details/${bookedSession._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Read More 
                </Link>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default BookedSession;
