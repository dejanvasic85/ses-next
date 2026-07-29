type SurfaceSpecimenProps = {
  name: string;
  className: string;
  description: string;
};

export function SurfaceSpecimen({ name, className, description }: SurfaceSpecimenProps) {
  return (
    <div className={`flex flex-col gap-2 rounded-2xl p-6 ${className}`}>
      <code className="text-primary font-mono text-sm">.{name}</code>
      <p className="text-base-content/70 text-sm">{description}</p>
    </div>
  );
}
