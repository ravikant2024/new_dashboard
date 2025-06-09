import { useEffect } from "react";
import VideoCard from "./VideoCard";
import "./viewAllVideo.css"
const ViewAllVideo = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  }, [])
  return (
    <div className="view-all-container">
      <h2>View All Video</h2>
      <div className="view-card-container">
        <VideoCard />
      </div>
    </div>
  );
};

export default ViewAllVideo;
