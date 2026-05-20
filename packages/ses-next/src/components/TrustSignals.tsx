import { Icon } from '@/components/Icon/Icon';
import type { TrustSignal } from '@/types';

type TrustSignalsProps = {
  signals: TrustSignal[];
};

export function TrustSignals({ signals }: TrustSignalsProps) {
  if (signals.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {signals.map((signal) => (
          <li
            key={signal.label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Icon name={signal.icon} size="md" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">{signal.value}</span>
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">{signal.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
