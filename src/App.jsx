/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import SiderMY from './components/SiderMy';
import Category from './pages/category/Category';
import Faqs from './pages/Faqs/Faqs';
import News from './pages/News/News';
import Blogs from './pages/Blogs/Blogs';
import Services from './pages/Services/Services';
import Sources from './pages/Sources/Sources';
import './App.css'

function App() {
  const token = localStorage.getItem("token");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    token ? setCheck(true) : setCheck(false);
  }, []);
  const router = createBrowserRouter([
    // nimadir
    {
      path: "/login",
      element: <Login setCheck={setCheck} />,
    },

    {
      path: "/home",
      element:
        check || token ? (
          <SiderMY setCheck={setCheck}>
            <Category check={check} />{" "}
          </SiderMY>
        ) : (
          <Navigate to='/login' replace />
        ),
    },

    {
      path: "/Faqs",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Faqs />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/Blogs",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Blogs />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/News",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <News />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/Sources",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Sources />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/Services",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Services />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/",
      element: check || token  ? (
        <Navigate to='/home' replace />
      ) : (
        <Navigate to='/login' replace />
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
