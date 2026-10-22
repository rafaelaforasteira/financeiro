import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowDownLeft, Clock3, LockKeyhole, Sprout } from 'lucide-react';
import { formatMoney, type DemoSnapshot } from '@financeiro/contracts';

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet';
}) {
  return <button className={`button ${variant} ${className}`} {...props} />;
}
export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}
export function VaultCard({
  vault,
  hidden,
  onDetails,
}: {
  vault: DemoSnapshot['vaults'][number];
  hidden: boolean;
  onDetails: () => void;
}) {
  const progress =
    vault.goal && BigInt(vault.goal) > 0n
      ? Number((BigInt(vault.balance) * 100n) / BigInt(vault.goal))
      : null;
  return (
    <Card className="vault-card">
      <div
        className={`vault-icon ${vault.kind === 'FIXED' ? 'lavender' : 'mint'}`}
      >
        {vault.kind === 'FIXED' ? (
          <LockKeyhole size={22} />
        ) : (
          <Sprout size={22} />
        )}
      </div>
      <span className="badge">
        {vault.kind === 'FIXED' ? 'Com prazo · demonstração' : 'Livre'}
      </span>
      <h3>{vault.name}</h3>
      <p className="vault-value">
        {hidden ? '••••' : formatMoney(vault.balance)}
      </p>
      <p className="small">
        {hidden
          ? 'Valores ocultos'
          : vault.goal
            ? `de ${formatMoney(vault.goal)}`
            : 'Sem meta definida'}
      </p>
      {!hidden && progress !== null && (
        <>
          <progress
            value={Math.min(progress, 100)}
            max="100"
            aria-label={`Progresso de ${vault.name}`}
          />
          <span className="small">{progress}% da sua meta</span>
        </>
      )}
      <p className="liquidity">
        {vault.unlockAt
          ? `Bloqueio simulado até ${new Date(vault.unlockAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
          : 'Disponibilidade ilustrativa'}
      </p>
      <Button variant="quiet" onClick={onDetails}>
        Ver detalhes <span aria-hidden>↗</span>
      </Button>
    </Card>
  );
}
export function Activity({
  items,
  hidden,
}: {
  items: DemoSnapshot['activity'];
  hidden: boolean;
}) {
  return (
    <ul className="activity-list">
      {items.map((item) => (
        <li key={item.id}>
          <span className="activity-icon">
            {item.state === 'PENDING' ? (
              <Clock3 size={20} />
            ) : (
              <ArrowDownLeft size={20} />
            )}
          </span>
          <div className="activity-copy">
            <strong>{item.label}</strong>
            <span className="small">
              {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              })}{' '}
              ·{' '}
              {item.state === 'PENDING'
                ? 'Aguardando confirmação fictícia'
                : 'Concluído · fictício'}
            </span>
          </div>
          <strong>{hidden ? '••••' : formatMoney(item.amount)}</strong>
        </li>
      ))}
    </ul>
  );
}
