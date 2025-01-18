import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SessionTable from './SessionTable';
import RejectedSession from './RejectedSession';
const AllStudySession = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session`);
      return data;
    },
  });

  const pendingSessions = sessions.filter(
    (session) => session.status === 'pending'
  );
  const rejectedSessions = sessions.filter(session => session.status === 'rejected')
  console.log(rejectedSessions);
  return (
    <div>
      {/* heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-primary">
          Study Session Administration
        </h1>
        <p className="text-lg text-gray-600 italic">
          Access all study sessions here. Manage and monitor them efficiently to
          ensure smooth operations
        </p>
        <h3 className="font-semibold text-2xl">
          All Study Session: {sessions.length}
        </h3>
      </div>
      {/* pending sessions */}
      <div>
        <h1 className="font-heading text-lg">
          Pending Study Session:{' '}
          <span className="bg-yellow-400 rounded-full p-1">
            {pendingSessions.length}
          </span>{' '}
        </h1>
        <div>
          <SessionTable pendingSession={pendingSessions}></SessionTable>
        </div>
      </div>

      {/* rejected sessions */}
      <div className='my-14'>
        <h1 className="font-heading text-lg">
          Rejected Study Session:{' '}
          <span className="bg-yellow-400 rounded-full p-1">
            {rejectedSessions.length}
          </span>{' '}
        </h1>
        <div>
          {/* <RejectedSession rejectedSession={rejectedSessions}></RejectedSession> */}
        </div>
      </div>
    </div>
  );
};

export default AllStudySession;
