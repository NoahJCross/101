import React from "react";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { FirebaseProvider } from "./context/AuthContext/AuthContext";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Post from "./pages/Post/Post";
import Questions from "./pages/Questions/Questions";
import PricingPlans from "./pages/PricingPlans/PricingPlans";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/pricing-plans" element={<PricingPlans />} />
      </Route>
    </Routes>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <AppRouter />
      </FirebaseProvider>
    </BrowserRouter>
  );
};

export default App;
