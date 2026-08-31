export default function StubFeature({ title, description }) {
  return (
    <div className="card card-stub">
      <div className="stub-badge">Not implemented in this build</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
