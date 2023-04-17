import { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./redux/slices/counterSlice";
import { fetchAllUsers } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="table-user">
          <table>
            <thead>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
            </thead>
            {isError ? (
              <>
                <div>Something wrongs ...</div>
              </>
            ) : (
              <>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <tbody>
                    {listUsers &&
                      listUsers.length > 0 &&
                      listUsers.map((item, index) => {
                        return (
                          <tr key={`${index}-item`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </>
            )}
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
