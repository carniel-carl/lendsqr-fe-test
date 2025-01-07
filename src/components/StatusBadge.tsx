const StatusBadge = ({ status }: { status: string }) => {
  const statusClass =
    {
      active: "badge--active",
      inactive: "badge--inactive",
      pending: "badge--pending",
      blacklisted: "badge--blacklisted",
    }[status.toLowerCase()] || "badge--default";

  return <span className={`badge ${statusClass}`}>{status}</span>;
};

export default StatusBadge;
