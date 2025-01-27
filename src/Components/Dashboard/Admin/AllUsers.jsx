import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UsersTable from './UsersTable';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {
  const [searchText, setSearchText] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${encodeURIComponent(searchText)}`
      );
      return res.data.users || []; // Ensure return value is always an array
    },
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | All Users</title>
      </Helmet>
      <h1>All Users ({users.length})</h1>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="w-5/12 my-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
        />
      </div>
      <UsersTable users={users} refetch={refetch} />
    </div>
  );
};
export default AllUsers;
