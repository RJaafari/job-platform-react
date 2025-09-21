import React, { useEffect, useMemo, useState } from "react";
import JobItem from "./JobItem";
import AppliedJobs from "./AppliedJobs";

const JobList = () => {
  // Demo jobs with "added" date
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      description: "React, Redux",
      date: "2025-01-12",
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Node.js, Express",
      date: "2025-02-03",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      description: "React, Node.js",
      date: "2025-01-28",
    },
    {
      id: 4,
      title: "Mobile Developer",
      description: "React Native",
      date: "2025-02-14",
    },
    {
      id: 5,
      title: "QA Engineer",
      description: "Testing Library, Jest",
      date: "2025-01-05",
    },
    {
      id: 6,
      title: "Data Engineer",
      description: "SQL, ETL, Python",
      date: "2025-02-20",
    },
    {
      id: 7,
      title: "DevOps Engineer",
      description: "CI/CD, Docker",
      date: "2025-02-08",
    },
    {
      id: 8,
      title: "UI Engineer",
      description: "HTML, CSS, Accessibility",
      date: "2025-01-31",
    },
    {
      id: 9,
      title: "Platform Engineer",
      description: "APIs, Caching",
      date: "2025-02-10",
    },
    {
      id: 10,
      title: "Site Reliability Engineer",
      description: "Monitoring, Alerts",
      date: "2025-02-05",
    },
    {
      id: 11,
      title: "Web Developer",
      description: "JavaScript, DOM",
      date: "2025-01-18",
    },
    {
      id: 12,
      title: "Junior Software Engineer",
      description: "Java, Git",
      date: "2025-02-01",
    },
    {
      id: 13,
      title: "Accessibility Engineer",
      description: "ARIA, WCAG, semantic HTML",
      date: "2025-02-21",
    },
    {
      id: 14,
      title: "Automation Engineer",
      description: "Playwright, CI test pipelines",
      date: "2025-02-18",
    },
    {
      id: 15,
      title: "API Engineer",
      description: "REST, rate limiting, JWT",
      date: "2025-01-22",
    },
  ]);

  // Persist applied IDs
  const [appliedIds, setAppliedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appliedIds") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("appliedIds", JSON.stringify(appliedIds));
  }, [appliedIds]);

  const appliedJobs = useMemo(
    () => jobs.filter((j) => appliedIds.includes(j.id)),
    [jobs, appliedIds]
  );

  // Controls
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Filter + sort
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = jobs;
    if (q)
      base = base.filter((j) =>
        [j.title, j.description].some((v) =>
          (v || "").toLowerCase().includes(q)
        )
      );

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return base.filter((j) => {
      if (!j.date) return true;
      const d = new Date(j.date + "T00:00:00");
      if (Number.isNaN(d.getTime())) return true;
      if (from && d < from) return false;
      if (to) {
        const end = new Date(to);
        end.setHours(23, 59, 59, 999);
        if (d > end) return false;
      }
      return true;
    });
  }, [jobs, query, fromDate, toDate]);

  const displayedJobs = useMemo(() => {
    const arr = [...filteredJobs];
    if (sortBy === "title") arr.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "title_desc")
      arr.sort((a, b) => b.title.localeCompare(a.title));
    else arr.sort((a, b) => new Date(b.date) - new Date(a.date)); // newest
    return arr;
  }, [filteredJobs, sortBy]);

  // Handlers
  const handleApply = (job) =>
    setAppliedIds((prev) => (prev.includes(job.id) ? prev : [...prev, job.id]));
  const handleUnapply = (job) =>
    setAppliedIds((prev) => prev.filter((id) => id !== job.id));
  const clearAll = () =>
    window.confirm("Remove all applied jobs?") && setAppliedIds([]);

  return (
    /* Narrower centered column + comfy side padding */
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <header className="panel mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Job Postings
        </h1>
        <p className="mt-1 text-slate-600">
          Search, filter by date, sort, and apply.
        </p>
      </header>

      {/* Search */}
      <div className="mb-3">
        <div className="row-label">Search</div>
        <input
          aria-label="Search jobs"
          className="input"
          placeholder="Search by title or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Sort (own line) */}
      <div className="mb-3">
        <div className="row-label">Sort</div>
        <select
          aria-label="Sort jobs"
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="title">Title (A–Z)</option>
          <option value="title_desc">Title (Z–A)</option>
        </select>
      </div>

      {/* Date range */}
      <div className="mb-6">
        <div className="row-label">Date range</div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-slate-700">
            From:
            <input
              type="date"
              className="select ml-2"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label className="text-sm text-slate-700">
            To:
            <input
              type="date"
              className="select ml-2"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button
            className="btn-secondary"
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
          >
            Clear dates
          </button>
        </div>
      </div>

      {/* List */}
      {displayedJobs.length === 0 ? (
        <div className="card text-slate-600">No jobs match your search.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {displayedJobs.map((job) => (
            <JobItem
              key={job.id}
              job={job}
              isApplied={appliedIds.includes(job.id)}
              onApply={() => handleApply(job)}
              onUnapply={() => handleUnapply(job)}
            />
          ))}
        </div>
      )}

      {/* Applied */}
      <section className="mt-10">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Applied Jobs</h2>
          <button className="btn-secondary" onClick={clearAll}>
            Clear all
          </button>
        </div>
        <AppliedJobs appliedJobs={appliedJobs} onUnapply={handleUnapply} />
      </section>
    </div>
  );
};

export default JobList;
