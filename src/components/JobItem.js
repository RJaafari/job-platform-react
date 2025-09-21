import React from "react";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const JobItem = ({ job, isApplied, onApply, onUnapply }) => {
  return (
    <article className="card">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
        {job.date && (
          <span className="pill">Added: {formatDate(job.date)}</span>
        )}
      </div>

      <p className="mt-1 text-slate-600">{job.description}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onApply}
          disabled={isApplied}
          aria-disabled={isApplied}
          className="btn"
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
        <button
          onClick={onUnapply}
          disabled={!isApplied}
          aria-disabled={!isApplied}
          className="btn-secondary"
        >
          Unapply
        </button>
      </div>
    </article>
  );
};

export default JobItem;
