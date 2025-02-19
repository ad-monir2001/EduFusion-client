import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const StudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const { user } = useAuth();
  const [sessionid, setSessionid] = useState(null);
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

  //   materials data

  const handleShowMaterials = (sessionid) => {
    axiosSecure
      .get(`/material/${sessionid}`)
      .then((res) => {
        setMaterials(res.data);
      })
      .catch((err) => {
        console.error(err.response ? err.response.data.data : err);
        setMaterials([]);
      });
  };

  const handleDownload = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'session-material.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error('Download failed:', error));
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Study Material</title>
        
      </Helmet>
      {/*  Heading */}
      <div className="text-center my-3">
        <h1 className="font-heading text-3xl font-semibold">
          View All Study Session Materials
        </h1>
        <p className="font-body text-lg">
          Access all the resources and materials for your study sessions in one
          place. Stay prepared, organized, and make the most of your learning
          journey with ease!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-8 my-5 py-3">
        {bookedSessions.length === 0 && <p>No session booked by you.</p>}
        {bookedSessions.map((bookedSession) => (
          <div
            key={bookedSession._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={bookedSession.sessionImage}
              alt={bookedSession._id}
              className="w-full sm:w-64 h-48 sm:h-auto object-cover"
            />
            <div className="p-4 flex-1">
              <h3 className="text-xl font-semibold mb-2 font-heading">
                {bookedSession.title}
              </h3>

              <button
                onClick={() => {
                  document.getElementById('materials').showModal();
                  setSessionid(bookedSession.sessionId);
                  handleShowMaterials(bookedSession.sessionId);
                }}
                className="bg-[#2ECC71] hover:bg-[#2ECC71] text-white px-4 py-2 rounded-md font-heading"
              >
                View Materials
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* show the conformation modal */}
      <dialog id="materials" className="modal modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#2ECC71]">
            Get Your Materials in This Session
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>

              <div className="grid grid-cols-1  gap-4">
                {materials.map((material) => (
                  <div
                    key={material._id}
                    className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center w-64"
                  >
                    {/* Image Section */}
                    <img
                      src={material.materialImage}
                      alt="Material"
                      className="w-full h-40 rounded-lg object-cover"
                    />

                    {/* Material Info */}
                    <div className="mt-4 text-center">
                      <h3 className="text-sm font-semibold text-gray-600">
                        Study Session Material Id:
                      </h3>
                      <p className="text-sm text-gray-500">{material._id}</p>
                    </div>

                    {/* Download and Link Section */}
                    <div className="mt-4 space-y-2 w-full">
                      <a
                        onClick={() => handleDownload(material.materialImage)}
                        className="block text-center bg-[#2ECC71] text-white py-2 px-4 rounded-lg text-sm hover:bg-[#2ECC71] transition"
                      >
                        Download Image
                      </a>
                      <a
                        href={material.googleDriveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-blue-500 text-sm font-medium hover:underline"
                      >
                        Google Drive Link
                      </a>
                    </div>
                  </div>
                ))}
                {materials.length === 0 && (
                  <p className="font-heading text-center mx-4">
                    {' '}
                    No Materials provided by tutors.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default StudyMaterial;
