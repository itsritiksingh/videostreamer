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

const Home: React.FC = () => {
  const history = useNavigate();
  const videoStateObj = useSelector((state: RootState) => state.videoReducer);
  // const authStateObj = useSelector((state: RootState) => state.authReducer)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(allvideos())
  }, []);
  return (<>
    <div className="heading">All Blogs</div>
    <input type="button" value="Upload" onClick={() => { history('/upload') }} />
    <div className="grid">
      {videoStateObj.allvideosmsg === "Success" && <>{videoStateObj.videos.map(i => (
        <Card
          hoverable
          style={{ width: '30%' }}
          cover={
            <img
              alt="example"
              src={`${url}/${i.thumbnail}`}
            />
          }
        >
          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={i.name}
          />
          <br />
          {`Duration : ${i.duration}`}
        </Card>
      ))}</>}
    </div>
  </>)
}
export default Home;