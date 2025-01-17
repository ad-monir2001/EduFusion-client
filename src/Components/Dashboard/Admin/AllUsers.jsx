import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UsersTable from './UsersTable';
import { useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleSearch = async (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (!text.trim()) {
      setSearchText(users);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`/search?searchText=${text}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log('search error', error);
    } finally {
      setLoading(false);
    }
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
      <UsersTable users={users} searchResults={searchResults} refetch={refetch}></UsersTable>
    </div>
  );
};

export default AllUsers;
