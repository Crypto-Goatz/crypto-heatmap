export default function HeatmapCard({ title, description }) {
  return (
    <div className="bg-surface rounded-2xl shadow-neon p-6 hover:ring-1 hover:ring-accent/70 transition-all">
      <h2 className="text-lg font-semibold text-accent">{title}</h2>
      <p className="text-textSecondary mt-2">{description}</p>
    </div>
  );
}
