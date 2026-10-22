import { getDemoSnapshot } from '@financeiro/api-client';
export async function GET(
  _request: Request,
  context: { params: Promise<{ profile: string }> },
) {
  const { profile } = await context.params;
  if (profile !== 'pessoal' && profile !== 'empresa')
    return Response.json(
      { message: 'Cenário não encontrado.' },
      { status: 404 },
    );
  try {
    const snapshot = await getDemoSnapshot(
      process.env.API_URL ?? 'http://127.0.0.1:4000',
      profile,
    );
    return Response.json(snapshot, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json(
      {
        message:
          'Não conseguimos atualizar os dados. Verifique se a API está disponível.',
      },
      { status: 503 },
    );
  }
}
