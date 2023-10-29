import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EditUserForm from "./EditUserForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesome library
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"; // Import the sorting icons

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sort order

  // EDIT USER DETAILS STATE
  const [editUserId, setEditUserId] = useState(null);

  // CREATE USER FORM STATES
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleEdit = (userId) => {
    setEditUserId(userId);
  };

  const updateUserDetails = (editedUser, mode) => {
    if (mode === "edit") {
      // Update the user's details in the users array
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
      );
    } else if (mode === "create") {
      // Create a new user
      setUsers((prevUsers) => [...prevUsers, editedUser]);
    }

    // Close the form
    setEditUserId(null);
    setFormData({ id: "", first_name: "", last_name: "", email: "" });
    setShowCreateUserForm(false);
  };

  const deleteUser = (idToDelete) => {
    // Use the filter method to create a new array without the user with the specified id
    const updatedUsers = users.filter((user) => user.id !== idToDelete);
    setUsers(updatedUsers);
  };

  const handleSortByUserId = () => {
    const sortedUsers = [...users];

    if (sortOrder === "asc") {
      sortedUsers.sort((a, b) => a.id - b.id);
      setSortOrder("desc");
    } else {
      sortedUsers.sort((a, b) => b.id - a.id);
      setSortOrder("asc");
    }

    setUsers(sortedUsers);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setUsers(searchUser);
    } else {
      const searchResults = searchUser.filter(
        (user) =>
          user.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(searchResults);
    }
  };

  useEffect(() => {
    async function getUsers() {
      try {
        let allUsers = [];
        const totalPages = 2;
        for (let page = 1; page <= totalPages; page++) {
          const response = await axios.get(
            `https://reqres.in/api/users?page=${page}`
          );
          allUsers = allUsers.concat(response.data.data);
        }
        setUsers(allUsers);
        setSearchUser(allUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Debo's Table</h1>
      <div className="searchDiv">
        <input
          type="search"
          placeholder="Search User..."
          value={searchText}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      <button onClick={() => setShowCreateUserForm(true)}>Create User</button>

      {showCreateUserForm && (
        <EditUserForm
          user={formData}
          updateUserDetails={updateUserDetails}
          mode="create"
          onCancel={() => {
            setFormData({ id: "", first_name: "", last_name: "", email: "" });
            setShowCreateUserForm(false);
          }}
        />
      )}

      {editUserId && (
        <EditUserForm
          user={users.find((user) => user.id === editUserId)}
          updateUserDetails={updateUserDetails}
          mode="edit"
          onCancel={() => setEditUserId(null)}
        />
      )}

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>
                
                User Id{" "}
                <span>
                <button onClick={handleSortByUserId} style={{padding:"0", margin:"0"}}>
                  <FontAwesomeIcon
                    icon={
                      sortOrder === "asc" ? faSortUp : faSortDown
                    }
                    className="sort-icon"
                    style={{padding:"0", margin:"0"}}
                  />
                </button>
                </span>
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email-Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const { id, first_name, last_name, email } = user;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(id)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteUser(id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          <h2>No Data Found</h2>
        </div>
      )}
    </div>
  );
}
