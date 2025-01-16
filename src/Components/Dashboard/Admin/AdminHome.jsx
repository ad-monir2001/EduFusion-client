import { useAuth } from '../../../hooks/useAuth';

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div className="w-full bg-violet-500 p-6 rounded-lg relative overflow-hidden">
      <div className="absolute top-4 right-4 text-violet-400">
        <div className="flex gap-4">
          <div className="w-6 h-6">∿</div>
          <div className="w-6 h-6 rotate-45">✓</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white flex-shrink-0">
          <img
            src={user.photoURL}
            alt={`${user.displayName}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-white text-2xl font-bold font-heading">
            {user?.displayName}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
