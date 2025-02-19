import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllMaterial = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: materials = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['materials', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/materials`);
      return data;
    },
  });
  // delete a material

  const handleDeleteMaterial = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this Material?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/materials/${id}`)
          .then((response) => {
            const { data } = response;
            if (data.deletedCount) {
              Swal.fire({
                title: 'Deleted!',
                text: 'This Material has been deleted.',
                icon: 'success',
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong while deleting the material.',
              icon: 'error',
            });
            console.error('Error deleting material:', error);
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | All Materials</title>
      </Helmet>
      {/* heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3 text-primary font-heading">
          View All Materials
        </h1>
        <p className="text-lg text-gray-600 italic">
          Access a comprehensive collection of study resources tailored to
          support learning journey, including notes, videos, and practice
          materials.
        </p>
      </div>

      {/* study materials */}
      <div>
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : materials.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              No material available at the moment.
            </p>
          </div>
        ) : (
          // Session cards
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {materials.map((material) => (
              <div
                key={material._id}
                className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={material.materialImage}
                    alt="Course Thumbnail"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">
                      Study Session Material Id:
                    </span>{' '}
                    {material._id}
                  </p>
                  <p className="mt-2 text-blue-600 underline cursor-pointer">
                    <a target="_blank" href={material.googleDriveLink}>
                      Material Link
                    </a>
                  </p>
                  <div className=" mt-4">
                    <button
                      onClick={() => handleDeleteMaterial(material._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMaterial;
