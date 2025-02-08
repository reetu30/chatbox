import React from 'react';

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Users Online</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user}
            className="p-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
            onClick={() => onSelectUser(user)}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
