import React, { Component } from "react";
import axios from "axios";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchUsers();
    }
  }

  fetchUsers = () => {
    const { currentPage, usersPerPage } = this.state;
    axios
      .get(
        `https://dummyjson.com/users?limit=${usersPerPage}&skip=${
          (currentPage - 1) * usersPerPage
        }`
      )
      .then((response) => {
        const { users, total } = response.data;
        this.setState({ users, totalPages: Math.ceil(total / usersPerPage) });
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  };

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage:
        prevState.currentPage < prevState.totalPages
          ? prevState.currentPage + 1
          : prevState.currentPage,
    }));
  };

  handlePreviousPage = () => {
    this.setState((prevState) => ({
      currentPage:
        prevState.currentPage > 1
          ? prevState.currentPage - 1
          : prevState.currentPage,
    }));
  };

  render() {
    const { users, currentPage, totalPages } = this.state;

    return (
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <ul className="list-disc pl-5 mb-4">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            onClick={this.handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded mx-2 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={this.handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default UsersList;
