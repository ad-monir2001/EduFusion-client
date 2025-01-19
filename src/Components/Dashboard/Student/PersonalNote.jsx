import { FaPencil } from 'react-icons/fa6';
import { LuTrash2 } from 'react-icons/lu';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const PersonalNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['notes', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/notes/${user?.email}`);
      return data;
    },
  });

  const noteData = {
    email: 'ad.monir2001@gmail.com',
    noteTitle: 'test note',
    noteDescription:
      'test note des Progressively facilitate optimal sources and intermanda…',
  };

  const handleUpdate = (Id) => {
    // Implement update logic here
    console.log(Id);
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete clicked for:', noteData.noteTitle);
  };
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 font-heading">
          Manage your Personal Note
        </h1>
        <p className="text-gray-600 font-body">
          A space to organize, edit, and access your thoughts, tasks, or ideas
          seamlessly in one place
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : notes.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No notes available.</p>
        </div>
      ) : (
        // Session cards
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 px-3"
            >
              {/* Header Section */}
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-gray-800 font-heading">
                  {note.noteTitle}
                </h3>
                <p className="text-sm font-body text-gray-500">{note.email}</p>
              </div>

              {/* Content Section */}
              <div className="px-4 pb-4">
                <p className="text-gray-700 font-body">
                  {note.noteDescription}
                </p>
              </div>

              {/* Footer Section with Buttons */}
              <div className=" py-3 bg-gray-50 flex justify-end space-x-2 ">
                <button
                  onClick={() => handleUpdate(note._id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <FaPencil className="h-4 w-4 mr-2" />
                  Update
                </button>

                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <LuTrash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalNote;
