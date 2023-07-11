import React, { useState, useContext, useEffect } from "react";
import HeaderMenu from "./components/HeaderMenu";
import FooterLinks from "./components/FooterLinks";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { check } from "./http/userAPI";
import { Context } from "./index";
import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    check()
    .then((data) => {
      user.setUser(data);
      user.setIsAuth(true);
    })
    .catch((error) => {
      notifications.show({ title: "Ошибка приобновлении токенов", color: 'red' });
    })
    .finally(() => setLoading(false)); 
  }, [user]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader className="loader" />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <HeaderMenu/>
        <AppRouter />
        <FooterLinks/>
      </BrowserRouter>
    </>
  );
}

export default App;
