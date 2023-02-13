import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
// import "./home.css";
// import {} from "../"
import { useNavigate } from "react-router-dom";
import Plyr,{PlyrSource,PlyrOptions} from "plyr-react"
import "plyr-react/plyr.css"
import { allvideos,fetchVideoById } from "../../store/videoSlice";
import url from "../../config";

const Player: React.FC = () => {
    const videoStateObj = useSelector((state: RootState) => state.videoReducer);
    const dispatch = useDispatch<AppDispatch>();
    const sources:PlyrSource = {
        type: 'video',
        sources: [
          {
            src: `${url}/video/${encodeURIComponent(videoStateObj.videos[0].path)}`,
            type: 'video/mp4',
            size: 720,
          },
          {
            src: `${url}/video/${encodeURIComponent(videoStateObj.videos[0].path)}_x640`,
            type: 'video/mp4',
            size: 640,
          },
        ],
      }
    const controls:PlyrOptions = {
        settings: ['captions', 'quality', 'speed', 'loop'],
        quality: {
        default: 720,
        options: [640,720]
        }
    }
    useEffect(() => {
        dispatch(fetchVideoById());
    }, []);

    const plyrProps = {
        source: sources,
        options: controls, 
      }

    return (<div>
    <Plyr {...plyrProps} />
    </div>)
}
export default Player;