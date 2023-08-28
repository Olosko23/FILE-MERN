import { useState } from "react";
import axios from "axios";

function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsNeeded, setSkillsNeeded] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("skillsNeeded", skillsNeeded);
    formData.append("duration", duration);
    formData.append("budget", budget);

    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    const response = await axios.post("http://localhost:3000/api/jobs/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Job created:", response.data.job);
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Skills Needed (comma-separated)"
          onChange={(e) => setSkillsNeeded(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration"
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Budget"
          onChange={(e) => setBudget(e.target.value)}
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;
