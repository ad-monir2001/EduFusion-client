import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UsersTable from './UsersTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [searchText, setSearchText] = useState('');
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const { data: searchUsers = [] } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
    enabled: !!searchText,
    staleTime: 0,
    retry: 0,
  });
  
  console.log(searchUsers);
  const handleSearch = async (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      All users {users.length}
      <div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search by name"
          className="w-5/12 my-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          name=""
          id=""
        />
      </div>
      {/* <ul>
        {users.map(user => <li key={user._id}>{user.name}</li>)}
      </ul> */}
      <UsersTable users={users} refetch={refetch}></UsersTable>
    </div>
  );
};

export default AllUsers;
