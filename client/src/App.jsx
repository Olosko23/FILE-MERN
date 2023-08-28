import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostJob from "./components/PostJob";
import ViewJobs from "./components/ViewJobs";
import ViewJob from "./components/viewJob";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/post">Post Job</Link>
            </li>
            <li>
              <Link to="/view">View Jobs</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/post" element={<PostJob />} />
          <Route path="/view" element={<ViewJobs />} />
          <Route path="/view/:id" element={<ViewJob />} />{" "}
          {/* Capture :id parameter */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
