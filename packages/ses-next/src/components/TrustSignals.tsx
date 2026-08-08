import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon/Icon';
import type { TrustSignal } from '@/types';

type TrustSignalsProps = {
  signals: TrustSignal[];
};

export function TrustSignals({ signals }: TrustSignalsProps) {
  if (signals.length === 0) return null;

  return (
    <Container width="wide">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {signals.map((signal) => (
          <li
            key={signal.label}
            className="surface-glass flex flex-col items-center gap-2 rounded-2xl px-4 py-6 text-center"
          >
            <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Icon name={signal.icon} size="md" />
            </span>
            <span className="font-display text-base-content text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
              {signal.value}
            </span>
            <span className="text-base-content/50 text-xs font-semibold tracking-widest uppercase">{signal.label}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
