export default function ProgressBar({ value }) {
  return (
    <div className="progress">
      <div className="bar" style={{ width: `${value}%` }}></div>
    </div>
  );
}