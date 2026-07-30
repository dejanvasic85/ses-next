type Swatch = {
  token: string;
  className: string;
  usage: string;
};

type SwatchRowProps = {
  title: string;
  swatches: Swatch[];
};

export function SwatchRow({ title, swatches }: SwatchRowProps) {
  return (
    <div>
      <h3 className="text-base-content/50 mb-4 text-xs font-semibold tracking-widest uppercase">{title}</h3>
      <ul className="flex flex-col gap-3">
        {swatches.map(({ token, className, usage }) => (
          <li key={token} className="flex items-center gap-3">
            <span className={`border-base-300 h-10 w-10 shrink-0 rounded-lg border ${className}`} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-mono text-xs font-medium">{token}</span>
              <span className="text-base-content/50 block text-xs">{usage}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
