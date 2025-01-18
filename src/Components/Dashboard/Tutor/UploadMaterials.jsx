import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UploadMaterialCard from '../../Cards/UploadMaterialCard';
import LoadingSpinner from '../../Shared/LoadingSpinner';
const UploadMaterials = () => {
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
          Upload Study Materials with Ease
        </h1>
        <p className="text-lg text-gray-600 italic">
          Share valuable resources and enhance collaborative learning. Upload
          notes, presentations, and more to empower every student in the
          community." Let me know if you'd like alternative suggestions!
        </p>
      </div>

      {isLoading ? (
        // Loading skeleton
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
            <UploadMaterialCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadMaterials;
