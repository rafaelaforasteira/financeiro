import { expect, test } from '@playwright/test';

test('consulta API, preserva privacidade e troca cenários sem misturar dados', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByTestId('total')).toHaveText('••••');
  await page
    .getByRole('button', { name: 'Exibir valores', exact: true })
    .click();
  await expect(page.getByTestId('total')).toHaveText('R$ 12.480,50');
  await page.screenshot({
    path: `test-results/home-${test.info().project.name}.png`,
    fullPage: true,
  });
  await expect(
    page.getByRole('button', { name: 'Guardar dinheiro' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Ver detalhes' }).first().click();
  await expect(page.getByRole('dialog')).toContainText('Próxima viagem');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByLabel('Perfil demonstrativo').selectOption('empresa');
  await expect(page.getByTestId('total')).toHaveText('R$ 0,00');
  await expect(
    page.getByText('Este cenário ainda não tem cofres.', { exact: false }),
  ).toBeVisible();
  await expect(page.getByText('Próxima viagem', { exact: true })).toHaveCount(
    0,
  );
  await page
    .getByRole('button', { name: 'Ocultar valores', exact: true })
    .click();
  await page.reload();
  await expect(page.getByTestId('total')).toHaveText('••••');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test('falha e recuperação não inventam saldo', async ({ page }) => {
  await page.route('**/api/demo/pessoal', (route) =>
    route.fulfill({ status: 503, body: '{}' }),
  );
  await page.goto('/');
  await expect(
    page.getByRole('alert').filter({ hasText: 'Não conseguimos atualizar' }),
  ).toBeVisible();
  await expect(page.getByTestId('total')).toHaveCount(0);
  await page.unroute('**/api/demo/pessoal');
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByTestId('total')).toHaveText('••••');
});

test('API fornece somente fixtures públicas e não aceita escrita financeira', async ({
  request,
}) => {
  const response = await request.get(
    'http://127.0.0.1:4000/v1/demo/profiles/pessoal/snapshot',
  );
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toBe('no-store');
  expect(response.headers()['x-request-id']).toBeTruthy();
  expect((await response.json()).source).toBe('PUBLIC_SYNTHETIC_FIXTURE');
  expect(
    (
      await request.post('http://127.0.0.1:4000/v1/withdrawal-intents', {
        data: { amount: '100' },
      })
    ).status(),
  ).toBe(404);
});
