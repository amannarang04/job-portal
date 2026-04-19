import { useState, useEffect } from 'react'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [savedJobs, setSavedJobs] = useState([])
  const [viewMode, setViewMode] = useState("all")
  const [typeFilter, setTypeFilter] = useState("All")
  const [selectedJob, setSelectedJob] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        const mapped = data.slice(0, 20).map(post => ({
          id: post.id,
          role: post.title.slice(0, 30),
          company: `Company ${post.userId}`,
          location: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"][post.id % 4],
          type: ["Full-time", "Part-time", "Remote"][post.id % 3],
          description: post.body
        }))
        setJobs(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError("Something went wrong.")
        setLoading(false)
      })
  }, [])

  const toggleSave = (job, e) => {
    e?.stopPropagation()
    setSavedJobs(prev =>
      prev.find(j => j.id === job.id)
        ? prev.filter(j => j.id !== job.id)
        : [...prev, job]
    )
  }

  const isSaved = (id) => savedJobs.some(j => j.id === id)

  const filteredJobs = (viewMode === "saved" ? savedJobs : jobs)
    .filter(job => job.role.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(job => typeFilter === "All" ? true : job.type === typeFilter)

  const getTypeClass = (type) => {
    if (type === "Remote") return "job-type remote"
    if (type === "Part-time") return "job-type part"
    return "job-type"
  }

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">🚀 Now Hiring</div>
        <h1>Find Your Next<br />Opportunity</h1>
        <p className="subtitle">Browse curated listings — save what excites you</p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">{jobs.length}</div>
            <div className="hero-stat-label">Jobs Listed</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{savedJobs.length}</div>
            <div className="hero-stat-label">Saved</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">{jobs.filter(j => j.type === "Remote").length}</div>
            <div className="hero-stat-label">Remote</div>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <input
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by role..."
        />
        <button className={`view-btn ${viewMode === "all" ? "active" : ""}`} onClick={() => setViewMode("all")}>All Jobs</button>
        <button className={`view-btn ${viewMode === "saved" ? "active" : ""}`} onClick={() => setViewMode("saved")}>Saved ({savedJobs.length})</button>
      </div>

      {/* FILTERS */}
      <div className="filter-row">
        {["All", "Full-time", "Part-time", "Remote"].map(type => (
          <button
            key={type}
            className={`filter-btn ${typeFilter === type ? "active" : ""}`}
            onClick={() => setTypeFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {loading && <div className="status">Loading opportunities...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && filteredJobs.length === 0 && <div className="status">No jobs found.</div>}

      {/* GRID */}
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <div className="job-card" key={job.id} onClick={() => setSelectedJob(job)}>
            <div className="job-header">
              <h3 className="job-role">{job.role}</h3>
              <span className={getTypeClass(job.type)}>{job.type}</span>
            </div>
            <p className="job-meta">{job.company}<span>•</span>{job.location}</p>
            <p className="job-desc">{job.description.slice(0, 90)}...</p>
            <button
              className={`save-btn ${isSaved(job.id) ? "saved" : ""}`}
              onClick={(e) => toggleSave(job, e)}
            >
              {isSaved(job.id) ? "Saved ✅" : "Save Job"}
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedJob(null)}>✕</button>
            <h2>{selectedJob.role}</h2>
            <p className="modal-meta">
              {selectedJob.company}<span>•</span>
              {selectedJob.location}<span>•</span>
              {selectedJob.type}
            </p>
            <p className="modal-desc">{selectedJob.description}</p>
            <button
              className={`modal-save ${isSaved(selectedJob.id) ? "saved" : ""}`}
              onClick={() => toggleSave(selectedJob)}
            >
              {isSaved(selectedJob.id) ? "Saved ✅" : "Save This Job"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App