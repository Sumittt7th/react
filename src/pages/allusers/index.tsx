import React from "react";
import { useGetAllUsersQuery } from "../../services/auth.api"; // Replace with your actual API file

const AllUsers: React.FC = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to fetch users</div>;

  // Validate data
  const users = Array.isArray(data?.data) ? data.data : [];

  console.log("Users", users);

  if (users.length === 0) {
    return <div>No users available</div>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email} className="mb-4">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>{user.email}</p>
            <span>
              Subscription: {user.subscription ? "Active" : "Inactive"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
