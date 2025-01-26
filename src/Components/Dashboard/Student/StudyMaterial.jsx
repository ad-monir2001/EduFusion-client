import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudyMaterial = () => {
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

  //   get materials data

  // const { data: materials = [] } = useQuery({
  //   queryKey: ['materials', sessionid],
  //   queryFn: async () => {
  //     const { data } = await axiosSecure(`/materials/${sessionid}`);
  //     return data;
  //   },
  // });
  
  const [materials, setMaterials] = useState([]);

const handleShowMaterials = (sessionid) => {
  console.log(sessionid);
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/materials/${sessionid}`)
    .then((res) => {
      setMaterials(res.data); 
    })
    .catch((err) => {
      console.error(err.response ? err.response.data : err);
    });
};

console.log(materials);

 
  return (
    <div>
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
                  handleShowMaterials(bookedSession.sessionId);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-heading"
              >
                View Materials
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* show the conformation modal */}
      <dialog id="materials" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-xl font-heading text-[#ff3600]">
            Get Your Materials in This Session
          </h3>
          <div className="flex items-center justify-between border p-2 rounded-xl my-2 ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default StudyMaterial;
