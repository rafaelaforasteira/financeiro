'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownToLine,
  ArrowUpRight,
  Building2,
  Eye,
  EyeOff,
  House,
  Leaf,
  ListOrdered,
  Plus,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Vault,
} from 'lucide-react';
import {
  demoSnapshotSchema,
  formatMoney,
  type DemoProfile,
  type DemoSnapshot,
} from '@financeiro/contracts';
import { Activity, Button, Card, VaultCard } from '@financeiro/ui';
import { useValuePrivacy } from './use-value-privacy';

const sections = [
  { id: 'home', label: 'Início', icon: House },
  { id: 'vaults', label: 'Cofres', icon: Vault },
  { id: 'activity', label: 'Atividade', icon: ListOrdered },
  { id: 'profile', label: 'Perfil', icon: UserRound },
] as const;
export default function Home() {
  const [profile, setProfile] = useState<DemoProfile['id']>('pessoal');
  const [section, setSection] = useState<string>('home');
  const [snapshot, setSnapshot] = useState<DemoSnapshot | null>(null);
  const { hidden, toggleHidden } = useValuePrivacy();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [detail, setDetail] = useState<DemoSnapshot['vaults'][number] | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/demo/${profile}`, {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (!response.ok)
          throw new Error(
            'Não conseguimos atualizar os dados. Verifique se a API está disponível e tente novamente.',
          );
        const data = demoSnapshotSchema.parse(await response.json());
        if (!controller.signal.aborted) setSnapshot(data);
      } catch (cause) {
        if (!controller.signal.aborted)
          setError(cause instanceof Error ? cause.message : 'Tente novamente.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [profile, refresh]);
  const data = snapshot?.profile.id === profile ? snapshot : null;
  const money = (value: string) => (hidden ? '••••' : formatMoney(value));
  function showDetails(vault: DemoSnapshot['vaults'][number]) {
    setDetail(vault);
    dialog.current?.showModal();
  }
  return (
    <div className="shell">
      <a href="#conteudo" className="skip">
        Ir para o conteúdo
      </a>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Leaf size={23} />
          </span>
          financeiro<span aria-hidden> .</span>
        </div>
        <nav aria-label="Navegação principal">
          {sections.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${section === item.id ? 'active' : ''}`}
              aria-current={section === item.id ? 'page' : undefined}
              onClick={() => setSection(item.id)}
            >
              <item.icon size={21} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <ShieldCheck size={25} />
          <p>
            Um passo de cada vez.
            <br />
            Seus planos merecem cuidado.
          </p>
          <p>
            Ambiente demonstrativo
            <br />
            Sem dinheiro real
          </p>
        </div>
      </aside>
      <main className="main" id="conteudo">
        <header className="topbar">
          <div className="profile-select">
            <span className="avatar">
              {profile === 'pessoal' ? (
                <UserRound size={20} />
              ) : (
                <Building2 size={20} />
              )}
            </span>
            <div>
              <span className="small">Cenário de demonstração</span>
              <label>
                <span
                  className="sr-only"
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                  }}
                >
                  Perfil demonstrativo
                </span>
                <select
                  aria-label="Perfil demonstrativo"
                  value={profile}
                  onChange={(event) => {
                    setProfile(event.target.value as DemoProfile['id']);
                    setDetail(null);
                    dialog.current?.close();
                  }}
                >
                  <option value="pessoal">Pessoa exemplo · CPF</option>
                  <option value="empresa">Empresa exemplo · CNPJ</option>
                </select>
              </label>
            </div>
          </div>
          <span className="demo-label">DEMO · DADOS FICTÍCIOS</span>
        </header>
        <div className="intro">
          <div>
            <h1>
              {section === 'home'
                ? 'Seus planos, com tranquilidade.'
                : section === 'vaults'
                  ? 'Meus cofres'
                  : section === 'activity'
                    ? 'Sua atividade'
                    : 'Seu perfil demonstrativo'}
            </h1>
            <p>
              {section === 'home'
                ? 'Um olhar sobre o que você está construindo.'
                : 'Explore a fundação do seu aplicativo financeiro.'}
            </p>
          </div>
          <Button
            variant="quiet"
            disabled={loading}
            onClick={() => setRefresh((value) => value + 1)}
          >
            <RefreshCw size={16} />
            Atualizar
          </Button>
        </div>
        {error && (
          <div role="alert" className="error">
            {error}
            <br />
            <Button
              variant="quiet"
              onClick={() => setRefresh((value) => value + 1)}
            >
              Tentar novamente
            </Button>
          </div>
        )}
        {loading && !data && (
          <div className="loading" role="status">
            Carregando sua demonstração…
          </div>
        )}
        {data && (
          <>
            {section === 'home' && (
              <>
                <div className="overview">
                  <Card className="balance-card">
                    <div className="balance-header">
                      <span>
                        Meu patrimônio{' '}
                        <span className="small">Valores fictícios</span>
                      </span>
                      <button
                        className="icon-button"
                        aria-label={
                          hidden ? 'Exibir valores' : 'Ocultar valores'
                        }
                        aria-pressed={hidden}
                        onClick={toggleHidden}
                      >
                        {hidden ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                    <p className="money" data-testid="total">
                      {money(data.balance.total)}
                    </p>
                    <div className="balance-breakdown">
                      <div>
                        <span className="small">Disponível para retirar</span>
                        <strong>{money(data.balance.available)}</strong>
                      </div>
                      <div>
                        <span className="small">Bloqueado · simulação</span>
                        <strong>{money(data.balance.locked)}</strong>
                      </div>
                    </div>
                  </Card>
                  <Card className="note-card">
                    <Leaf size={30} />
                    <h2>
                      Espaço para os seus
                      <br />
                      próximos passos.
                    </h2>
                    <p>
                      Organize seus objetivos com calma. Cada plano pode ter o
                      seu próprio cofre.
                    </p>
                    <span className="small">
                      Prévia do produto · sem operações financeiras
                    </span>
                  </Card>
                </div>
                <div className="actions">
                  <Button disabled>
                    <ArrowDownToLine size={18} />
                    Guardar dinheiro
                  </Button>
                  <Button variant="secondary" disabled>
                    <ArrowUpRight size={18} />
                    Retirar
                  </Button>
                  <Button variant="secondary" disabled>
                    <Plus size={18} />
                    Criar cofre
                  </Button>
                </div>
                <p className="small">
                  Operações indisponíveis neste marco. Nenhum valor pode ser
                  movimentado.
                </p>
              </>
            )}
            {(section === 'home' || section === 'vaults') && (
              <>
                <div className="section-heading">
                  <h2>Meus cofres</h2>
                  {section === 'home' && (
                    <Button
                      variant="quiet"
                      onClick={() => setSection('vaults')}
                    >
                      Ver todos →
                    </Button>
                  )}
                </div>
                {data.vaults.length ? (
                  <div className="vault-grid">
                    {data.vaults.map((vault) => (
                      <VaultCard
                        key={vault.id}
                        vault={vault}
                        hidden={hidden}
                        onDetails={() => showDetails(vault)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty">
                    <h3>Seus próximos planos começam aqui.</h3>
                    <p>
                      Este cenário ainda não tem cofres. A criação será
                      habilitada com a API autenticada.
                    </p>
                  </div>
                )}
              </>
            )}
            {section === 'home' && (
              <>
                <div className="section-heading">
                  <h2>Evolução do dinheiro</h2>
                </div>
                <Card>
                  <p>Ainda não há rendimentos confirmados.</p>
                  <span className="small">
                    Não há produto remunerado contratado. Projeções não compõem
                    o saldo.
                  </span>
                </Card>
              </>
            )}
            {(section === 'home' || section === 'activity') && (
              <>
                <div className="section-heading">
                  <h2>Atividade {section === 'home' ? 'recente' : ''}</h2>
                  {section === 'home' && (
                    <Button
                      variant="quiet"
                      onClick={() => setSection('activity')}
                    >
                      Ver atividade →
                    </Button>
                  )}
                </div>
                <Card>
                  {data.activity.length ? (
                    <Activity items={data.activity} hidden={hidden} />
                  ) : (
                    <div className="empty">
                      Nenhuma movimentação neste cenário.
                    </div>
                  )}
                  <p className="small">
                    Em processamento: {money(data.balance.pending)}. Não
                    incluído no patrimônio disponível.
                  </p>
                </Card>
              </>
            )}
            {section === 'profile' && (
              <Card>
                <h2>{data.profile.name}</h2>
                <p>
                  Tipo de perfil: {data.profile.type} · cenário público
                  sintético.
                </p>
                <p>
                  Esta prévia não cria uma conta e não verifica sua identidade.
                </p>
                <Button variant="secondary" onClick={toggleHidden}>
                  {hidden
                    ? 'Exibir valores na demonstração'
                    : 'Ocultar valores na demonstração'}
                </Button>
                <p className="small">
                  Preferência de privacidade salva somente neste navegador.
                </p>
              </Card>
            )}
            <p className="footer-note">
              DEMO · Dados sintéticos de referência em{' '}
              {new Date(data.asOf).toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              })}
              . Sem validade bancária. Nenhuma instituição financeira integrada.
            </p>
          </>
        )}
      </main>
      <dialog
        ref={dialog}
        aria-labelledby="detail-title"
        onClose={() => setDetail(null)}
      >
        {detail && (
          <>
            <span className="demo-label">COFRE DEMONSTRATIVO</span>
            <h2 id="detail-title" style={{ marginTop: 20 }}>
              {detail.name}
            </h2>
            <p>Saldo fictício: {money(detail.balance)}</p>
            <p>
              {detail.unlockAt
                ? 'O prazo exibido ilustra o comportamento futuro. Não representa bloqueio contratual real.'
                : 'Este cenário ilustra um Cofre Livre.'}
            </p>
            <p>Meta: {detail.goal ? money(detail.goal) : 'Sem meta'}</p>
            <Button onClick={() => dialog.current?.close()}>
              Fechar detalhes
            </Button>
          </>
        )}
      </dialog>
    </div>
  );
}
