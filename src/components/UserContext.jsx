import React, { createContext, useContext, useState, useEffect } from 'react';

// Membuat context untuk menyimpan data pengguna
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Ambil data user dari token saat aplikasi dimulai
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token
      setUser(decoded);  // Simpan data user yang sudah didecode
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
