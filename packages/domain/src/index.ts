export type OperationState =
  'CREATED' | 'PROCESSING' | 'SETTLED' | 'FAILED' | 'CANCELED' | 'REVERSED';
const transitions: Record<OperationState, readonly OperationState[]> = {
  CREATED: ['PROCESSING', 'CANCELED'],
  PROCESSING: ['SETTLED', 'FAILED'],
  SETTLED: ['REVERSED'],
  FAILED: [],
  CANCELED: [],
  REVERSED: [],
};
export function transition(
  from: OperationState,
  to: OperationState,
): OperationState {
  if (!transitions[from].includes(to)) throw new Error('INVALID_TRANSITION');
  return to;
}
export function increaseGoal(previous: bigint | null, next: bigint): bigint {
  if (next <= 0n || (previous !== null && next < previous))
    throw new Error('GOAL_CANNOT_DECREASE');
  return next;
}
export function assertSameOwner(
  sourceProfile: string,
  destinationProfile: string,
) {
  if (!sourceProfile || sourceProfile !== destinationProfile)
    throw new Error('OWNERSHIP_MISMATCH');
}
export type Posting = Readonly<{
  accountId: string;
  profileId: string;
  currency: 'BRL';
  amount: bigint;
}>;
export function validateJournal(postings: readonly Posting[]): void {
  if (postings.length < 2) throw new Error('UNBALANCED_JOURNAL');
  const first = postings[0]!;
  const sum = postings.reduce((total, posting) => {
    assertSameOwner(first.profileId, posting.profileId);
    if (posting.currency !== first.currency || posting.amount === 0n)
      throw new Error('INVALID_POSTING');
    return total + posting.amount;
  }, 0n);
  if (sum !== 0n || new Set(postings.map((p) => p.accountId)).size < 2)
    throw new Error('UNBALANCED_JOURNAL');
}
export function assertDemoEnvironment(env: Record<string, string | undefined>) {
  if (
    env.APP_MODE !== 'DEMO' ||
    env.ENABLE_REAL_MONEY !== 'false' ||
    !['development', 'test'].includes(env.NODE_ENV ?? '')
  ) {
    throw new Error(
      'UNSAFE_ENVIRONMENT: esta versão permite apenas DEMO em development/test',
    );
  }
}
