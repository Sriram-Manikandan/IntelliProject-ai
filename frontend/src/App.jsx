import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    skills: "",
    domain: "",
    difficulty: "Intermediate",
    time_weeks: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateProjects = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/generate",
        form
      );

      setResults(response.data.recommendations);
    } catch (err) {
      setError("Failed to generate projects.");
    }

    setLoading(false);
  };

  return (
    <div id="root">
      <h1>🎓 IntelliProject</h1>

      <div className="card">
        <input
          name="skills"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={handleChange}
        />

        <input
          name="domain"
          placeholder="Domain / Industry"
          value={form.domain}
          onChange={handleChange}
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          name="time_weeks"
          placeholder="Time (weeks)"
          value={form.time_weeks}
          onChange={handleChange}
        />

        <button onClick={generateProjects}>
          {loading ? "Generating..." : "Generate"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {results.map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project.title}</h3>
          <p><strong>Problem:</strong> {project.problem_statement}</p>
          <p><strong>Tech Stack:</strong> {project.tech_stack.join(", ")}</p>
          <p><strong>Resume Score:</strong> {project.resume_score}</p>
          <p><strong>Innovation Score:</strong> {project.innovation_score}</p>
          <hr />
          <p><strong>Implementation Roadmap:</strong></p>
          <ul>
            {project.implementation_roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          <p><strong>Challenges:</strong></p>
          <ul>
            {project.challenges.map((challenge, i) => (
              <li key={i}>{challenge}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;