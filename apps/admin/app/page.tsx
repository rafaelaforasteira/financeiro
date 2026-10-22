import { Card } from '@financeiro/ui';
export const dynamic = 'force-dynamic';
export default async function Admin() {
  let available = false;
  try {
    const response = await fetch(
      `${process.env.API_URL ?? 'http://127.0.0.1:4000'}/v1/health/live`,
      { cache: 'no-store', signal: AbortSignal.timeout(3000) },
    );
    available = response.ok;
  } catch {
    /* Estado indisponível exibido abaixo. */
  }
  return (
    <main className="main">
      <header className="topbar">
        <strong>financeiro · Operações</strong>
        <span className="demo-label">FUNDAÇÃO DEMO</span>
      </header>
      <div className="intro">
        <div>
          <h1>Visão técnica do ambiente</h1>
          <p>Somente informações públicas de disponibilidade.</p>
        </div>
        <a href="/">Verificar novamente</a>
      </div>
      <div className="vault-grid">
        <Card>
          <h2>API central</h2>
          <p>
            {available ? 'Disponível · DEMO' : 'Indisponível · inicie a API'}
          </p>
        </Card>
        <Card>
          <h2>Controles administrativos</h2>
          <p>Aguardando autenticação e permissões administrativas.</p>
        </Card>
      </div>
      <div className="section-heading">
        <h2>Próximos controles</h2>
      </div>
      <Card>
        <p>
          Operações, auditoria, conciliação e atendimento serão disponibilizados
          após autorização no backend.
        </p>
        <p className="small">
          Nenhum dado de cliente é consultado nesta página. Saúde da API não
          comprova conexão com banco ou processamento financeiro.
        </p>
      </Card>
    </main>
  );
}
