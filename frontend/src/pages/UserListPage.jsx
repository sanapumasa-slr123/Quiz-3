import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/usersSlice';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './UserListPage.css';

const UserListPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  if (loading) return <Loader />;

  return (
    <div className="user-list-page">
      <div className="page-container">
        <div className="page-header">
          <h1>Platform Users & Experts</h1>
          <p>Meet the professionals on our platform</p>
        </div>

        {errorMessage && (
          <Message 
            type="error" 
            message={`Error: ${JSON.stringify(errorMessage)}`}
            onClose={() => setErrorMessage(null)}
          />
        )}

        <div className="users-list">
          {users && users.length > 0 ? (
            users.map(user => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <div className="no-users">
              <p>No users available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
