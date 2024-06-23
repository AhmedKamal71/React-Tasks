import React, { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

const UserCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [users, setUsers] = useState([]);
  const {
    data: allUsers,
    loading,
    error,
  } = useFetch("https://dummyjson.com/users");

  useEffect(() => {
    if (Array.isArray(allUsers.users)) {
      let filteredUsers = allUsers.users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const cityName = user.address.city.toLowerCase();
        return (
          fullName.includes(searchQuery.toLowerCase()) &&
          (selectedCity === "All" || cityName === selectedCity.toLowerCase())
        );
      });

      filteredUsers = filteredUsers.sort(() => Math.random() - 0.5);

      setUsers(filteredUsers.slice(0, 10));
    }
  }, [allUsers, searchQuery, selectedCity]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getRandomColor = () => {
    const colors = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-pink-200",
      "bg-purple-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const uniqueCities = Array.isArray(allUsers.users)
    ? [...new Set(allUsers.users.map((user) => user.address.city))]
    : [];

  return (
    <div className="container mx-auto mt-8 text-black">
      <h1 className="text-3xl font-bold mb-4">User Card</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mr-4 px-2 py-1 border border-gray-300 rounded"
        />
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="All">All Cities</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-4 rounded shadow text-gray-800 mb-4 ${getRandomColor()}`}
          >
            <div className="mb-4">
              <span className="font-semibold">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {user.phone}
            </div>
            <div>
              <span className="font-semibold">City:</span> {user.address.city}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
