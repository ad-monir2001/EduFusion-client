import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UsersTable from './UsersTable';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  return (
    <div>
      All users {users.length}
      <UsersTable users={users} refetch={refetch}></UsersTable>
    </div>
  );
};

export default AllUsers;
