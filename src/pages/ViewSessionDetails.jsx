import { useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ViewSessionDetails = () => {
  const { id } = useParams();

  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = await useAxiosSecure(`/session`);
      return data;
    },
  });
  const approvedSessions = sessions.filter(
    (session) => session.status === 'approved'
  );
  const desiredSession = approvedSessions.filter(
    (session) => session._id === id
  );

  console.log(desiredSession);
  return <div>session details</div>;
};

export default ViewSessionDetails;
