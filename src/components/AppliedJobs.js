import React from "react";

const AppliedJobs = ({ appliedJobs, onUnapply }) => {
  if (!appliedJobs || appliedJobs.length === 0) {
    return <p className="text-slate-600">No applied jobs yet.</p>;
  }
  return (
    <div className="space-y-4">
      {appliedJobs.map((job) => (
        <div key={job.id} className="card flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-900">{job.title}</div>
            <div className="text-sm text-slate-600">{job.description}</div>
          </div>
          <button className="btn-secondary" onClick={() => onUnapply(job)}>
            Unapply
          </button>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobs;
