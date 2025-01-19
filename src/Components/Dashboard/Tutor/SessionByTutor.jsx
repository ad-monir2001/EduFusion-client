import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SessionCard from '../../Cards/SessionCard';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const SessionByTutor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['sessions', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session/${user?.email}`);
      return data;
    },
  });
  return (
    <div>
      {/* heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-primary">
          Session by Tutors
        </h1>
        <p className="text-lg text-gray-600 italic">
          Where Every Session Inspires Brilliance.
        </p>
      </div>

      {isLoading ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : sessions.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No sessions available at the moment.
          </p>
        </div>
      ) : (
        // Session cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionByTutor;
