# Lint Cleanup Tracker

Focus: remove unused imports/vars and eliminate `any` types in high-traffic modules. Tackle by feature to keep PRs small.

## High priority
- [ ] features/controls/components/ControlsManagementView.tsx: remove unused icon imports, type props/state, replace `any`
- [ ] features/controls/ControlsManagementView.tsx: same as above; unify with component or remove duplicate if not used
- [ ] features/policies/components/PolicyManagementView.tsx: prune unused state and imports, add types
- [ ] features/evidence/components/EvidenceCollectionDashboard.tsx: replace `any` and unused vars
- [ ] lib/apiClient.ts: introduce typed request/response interfaces
- [ ] lib/supabase.ts: replace `any` with typed rows from `database.types.ts`
- [ ] shared/components/charts/*: add proper chart data types

## Medium priority
- [ ] shared/hooks/useAuth.ts: remove unused helpers, type API responses
- [ ] services/*: replace broad `any` and unused params
- [ ] shared/types/*: refine loose `any` fields

## Low priority
- [ ] Replace inline disabled hook warnings with corrected deps or stable callbacks

## CI gating (optional)
- [ ] Add a lint GitHub Action to run `npm run lint` and fail on errors

## Notes
- Prefer small focused PRs (≤300 LOC changes) per area
- If a component is unused, remove it instead of fixing
