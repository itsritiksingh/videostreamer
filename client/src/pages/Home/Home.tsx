import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import "./home.css";
// import {} from "../"
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { allvideos, updateFormData, } from "../../store/videoSlice";
import url from "../../config";

const { Meta } = Card;

const Home: React.FC = () => {
  const history = useNavigate();
  const videoStateObj = useSelector((state: RootState) => state.videoReducer);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(allvideos())
  }, []);
  return (<div>
    <div className="heading">All Videos</div>
    <input type="button" value="Upload" onClick={() => { history('/upload') }} />
    <div className="grid">
      {videoStateObj.allvideosmsg === "Success" && <>{videoStateObj.videos.map(i => (
        <a onClick={()=> {
          dispatch(updateFormData({...videoStateObj ,selectedvideoId: i._id}))
          history(`/player`)} }>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={
            <img
              alt="example"
              src={`${url}/${i.thumbnail}`}
            />
          }
        >
          <Meta
            title={i.name}
          />
          <br />
          {`Duration : ${i.duration}`}
        </Card>
        </a>
      ))}</>}
    </div>
  </div>)
}
export default Home;