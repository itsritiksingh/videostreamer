import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import "./home.css";
// import {} from "../"
import { useNavigate } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { allvideos, } from "../../store/videoSlice";
import url from "../../config";

const { Meta } = Card;

const Player: React.FC = () => {
  const history = useNavigate();
  const videoStateObj = useSelector((state: RootState) => state.videoReducer);
  // const authStateObj = useSelector((state: RootState) => state.authReducer)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(allvideos())
  }, []);
  return (<>
    
  </>)
}
export default Player;