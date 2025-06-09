import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import "./videoList.css";
const VideoList = () => {

    return (
        <div className="videocard-container">
            <div className="video-heading">
                <h4>Our Video</h4>
                <Link to="view-all-video">
                <button className="video-view-all">View All</button></Link>
            </div>
            <div className="video-container">
              <VideoCard/>
            </div>
        </div>
    );
};

export default VideoList;
