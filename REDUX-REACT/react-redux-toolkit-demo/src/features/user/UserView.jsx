import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

export const UserView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <h2>List of Users</h2>
      {user.loading && <div>...isLoading</div>}
      {!user.loading && user.error ? <div>Eror: {user.error}</div> : null}
      {!user.loading && user.users.length > 0 ? (
        <ul>
          {/* {user.users.map((user) => {
            return <li>{user.name}</li>;
          })} */}
          {user.users.map((user) => (
            <li>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
