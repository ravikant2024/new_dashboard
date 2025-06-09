import React, { useState } from 'react';
import "./videoCard.css";
import ReactPlayer from 'react-player';

const videoData = [
    { id: 1, url: 'https://youtu.be/1LVTs1CeHe0?si=gTw7Sq61Y2zEk2TG', description: 'Arduino IDE 2.3.3 is a version of the Arduino Integrated Development Environment (IDE)' },
    { id: 2, url: 'https://youtu.be/1LVTs1CeHe0?si=gTw7Sq61Y2zEk2TG', description: '10 Best Network Attached Storage or NAS Systems in SanDisk' },
    { id: 3, url: 'https://youtu.be/1LVTs1CeHe0?si=gTw7Sq61Y2zEk2TG', description: 'Arduino IDE 2.3.3 – A New Sensation From Arduino' },
    { id: 4, url: 'https://youtu.be/JZZ81FunjHo?si=Lso-mCSNd7SJA2R2', description: 'Emax Servo Motors: Transform Precision into Excellence' },
];

const VideoCard = () => {
    const [playingVideoId, setPlayingVideoId] = useState(null);

    const handlePlay = (id) => {
        setPlayingVideoId(id);
    };

    return (
        <>
            {videoData.length === 0 ? (
                <div className="no-videos">
                    <p>No videos available</p>
                </div>
            ) : (
                videoData.map((video) => (
                    <div className="video-card" key={video.id}>
                        <div className="video-header">
                            <ReactPlayer
                                url={video.url}
                                width="100%"
                                height="100%"
                                controls
                                playing={playingVideoId === video.id}
                                onPlay={() => handlePlay(video.id)}
                            />
                        </div>
                        <div className="video-description">
                            <p>{video.description}</p>
                        </div>
                    </div>
                ))
            )}
        </>    );
};

export default VideoCard;
