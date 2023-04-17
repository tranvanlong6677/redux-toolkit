import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./redux/slices/counterSlice";
import { useEffect, useState } from "react";

function App() {
  const [listUsers, setListUsers] = useState([]);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const fetchAllUsers = async () => {
    let res = await axios.get("http://localhost:8080/users/all");
    console.log(">>> check res", res.data);
    setListUsers(res.data ? res.data : []);
  };
  useEffect(() => {
    fetchAllUsers();
  });
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => dispatch(increment())}>Increase</button>
        <button onClick={() => dispatch(decrement())}>Decrease</button>
        <button onClick={() => dispatch(incrementByAmount)}>TL</button>
        <div>Count = {count}</div>
        <div className="table-user">
          <table>
            <thead>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
            </thead>
            <tbody>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item,index) => {
                  return (
                    <tr key={`${index}-item`}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
