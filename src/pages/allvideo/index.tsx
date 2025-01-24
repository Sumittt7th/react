import React from "react";
import { useGetAllVideosQuery } from "../../services/video.api";

const VideoList: React.FC = () => {
  const { data, error, isLoading } = useGetAllVideosQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to fetch videos</div>;

  // Validate data
 const videos = Array.isArray(data?.data) ? data.data : [];



  if (videos.length === 0) {
    return <div>No videos available</div>;
  }

  return (
    <div>
      <h1>All Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id} className="mb-4">
            <h2 className="text-xl font-bold">{video.title}</h2>
            <p>{video.description || "No description available"}</p>
            <span>{video.access === "free" ? "Free" : "Paid"}</span>
            <p>Duration: {video.duration ?? "Unknown"} mins</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
