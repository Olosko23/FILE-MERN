import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link component

function ViewJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await axios.get("http://localhost:3000/api/jobs/jobs");
      setJobs(response.data.jobs);
    }

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>All Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {/* Use Link to navigate to the single job view */}
            <Link to={`/view/${job._id}`}>{job.title}</Link>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewJobs;
