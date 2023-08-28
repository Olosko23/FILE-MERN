import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewJob() {
  const { id } = useParams(); // Get the job ID from the URL parameter
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/jobs/job/${id}`
        );
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    }

    fetchJob();
  }, [id]);

  const handleDownload = async (fileId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/jobs/download/${id}/${fileId}`,
        {
          responseType: "blob", // Set responseType to 'blob' for file download
        }
      );

      // Create a temporary link to trigger the file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.txt"); // Set desired file name
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <h2>View Job</h2>

      {job ? (
        <div>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <ul>
            {job.files.map((file) => (
              <li key={file._id}>
                <a href="#" onClick={() => handleDownload(file._id)}>
                  Download {file.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ViewJob;
