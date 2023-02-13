import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./store";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Upload from './pages/Upload/Upload';
import Home from './pages/Home/Home';
import Player from './pages/Player/Player';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/player",
    element: <Player />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
  );
}

export default App;
