import { useEffect, useState } from 'react';
import Navbar from '../Components/Shared/Navbar';
import axios from 'axios';
import TutorCard from '../Components/Cards/TutorCard';

const AllTutors = () => {
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/tutor`
        );
        setTutors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTutors();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7 p-4 my-8">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTutors;
