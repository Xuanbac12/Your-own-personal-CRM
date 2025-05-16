interface CustomerStatusBadgeProps {
  label?: string;
  color?: string;
}

export const CustomerStatusBadge: React.FC<CustomerStatusBadgeProps> = ({ label, color }) => {
  if (!label) return null;

  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full inline-block mt-1"
      style={{
        backgroundColor: color || '#e5e7eb',
        color: '#1f2937',
      }}
    >
      {label}
    </span>
  );
};
