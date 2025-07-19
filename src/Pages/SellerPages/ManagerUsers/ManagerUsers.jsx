import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecureAPI from '../../../CustomHooks/UseAxiosSecureAPI';

const ManagerUsers = () => {

    const axiosApi = UseAxiosSecureAPI();

    const { data: allUsers=[] , refatch,isLoading} = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res =  await axiosApi.get("/users");
            return res.data;
        }
    });

    if(isLoading){
        return <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-700"></div>
                </div>
    }
    console.log(allUsers);




     // to formate date
    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    };
    return (
         <div className="p-6 mt-10">
              <div className="">
                <h1 className="text-4xl font-bold text-[#080c3b]">Manage All Users</h1>
                <h1 className="mt-4 text-2xl font-bold text-[#080c3b]">Currently <span className='text-2xl italic'>{allUsers.length}</span> user(s) are registered.</h1>
              </div>
                <div className="overflow-x-auto mt-20">
                  <table className="table table-zebra w-full border  text-center">
                    <thead className="bg-[#DED3C4] text-[#080c3b] text-center text-2xl">
                      <tr className="text-2xl">
                        <th>#</th>
                        <th>Email</th>
                        <th>Account created on</th>
                        <th>Role</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((users, i) => (
                        <tr className="text-2xl text-[#080c3b] " key={users._id}>
                          <td>{i + 1}</td>
                          <td>{users.email}</td>
                          <td>{formatDate(users.created_at)}</td>
                          <td className='font-bold'>{users.role.charAt(0).toUpperCase() + users.role.slice(1)}</td>
                          <td className="space-x-2 flex justify-center">
                            {users.role !== 'admin' && (
                                <button
                                className="btn bg-[#555879] text-2xl font-bold text-[#F4EBD3]"
                                // onClick={() => handleRoleChange(users._id, 'admin')}
                                >
                                Make Admin
                                </button>
                            )}

                            {users.role !== 'seller' && (
                                <button
                                className="btn bg-[#F4EBD3] text-[#555879] text-2xl font-bold"
                                // onClick={() => handleRoleChange(users._id, 'seller')}
                                >
                                Make Seller
                                </button>
                            )}

                            {users.role !== 'user' && (
                                <button
                                className="btn bg-[#DED3C4] text-[#555879] text-2xl font-bold"
                                // onClick={() => handleRoleChange(users._id, 'user')}
                                >
                                Downgrade to User
                                </button>
                            )}
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
    );
};

export default ManagerUsers;