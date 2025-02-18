import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { compareAsc, parse } from 'date-fns';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar';

const AllSessions = () => {
  const axiosSecure = useAxiosSecure();
  const [visibleSessions, setVisibleSessions] = useState(6);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session`);
      return data;
    },
  });
  const approvedSessions = sessions.filter(
    (session) => session.status === 'approved'
  );

  const handleLoadMore = () => {
    setVisibleSessions((prev) => prev + 6);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className='w-11/12 mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {approvedSessions.slice(0, visibleSessions).map((session) => (
            <div
              key={session._id}
              className="w-full max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <img
                      className="w-full rounded-lg h-56"
                      src={session.sessionImage}
                      alt=""
                    />
                    <h3 className="text-xl font-bold text-gray-800 font-heading py-4">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 overflow-hidden font-body line-clamp-2 mb-4">
                      {session.description}
                    </p>
                    <span
                      className={`ml-4 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 absolute top-4 right-4 ${
                        compareAsc(
                          new Date(),
                          parse(
                            session.sessionEndDate,
                            'dd/MM/yyyy',
                            new Date()
                          )
                        ) < 0
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {compareAsc(
                        new Date(),
                        parse(session.sessionEndDate, 'dd/MM/yyyy', new Date())
                      ) < 0
                        ? 'Ongoing'
                        : 'Closed'}
                    </span>
                  </div>
                </div>

                <div>
                  <Link
                    to={`/read-more/${session._id}`}
                    className="w-full mt-4 px-4 py-2 bg-[#2ECC71] text-white rounded-lg
                  transform transition-all duration-300
                  hover:bg-[#3498DB] active:scale-95
                  flex items-center justify-center group font-heading"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {visibleSessions < approvedSessions.length && (
            <button
              onClick={handleLoadMore}
              className="mt-4 px-3 py-2 bg-[#2ECC71] text-white rounded-lg hover:bg-[#3498DB] active:scale-95 transition-transform duration-300 font-heading"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AllSessions;
