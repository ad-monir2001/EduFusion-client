import { useAuth } from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const TutorHome = () => {
  const { user } = useAuth();
  const [role] = useRole();
  return (
    <div className="w-full bg-green-400 p-6 rounded-lg relative overflow-hidden">
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
        <div className="flex flex-col gap-">
          <h2 className="text-white text-2xl font-bold font-heading">
            {user?.displayName}
          </h2>
          <p className="text-white font-body">
            Profile of: <span className='capitalize'>{role}</span>
          </p>
          <p className="font-body text-white">Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default TutorHome;
