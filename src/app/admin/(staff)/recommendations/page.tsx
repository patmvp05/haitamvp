import {
  createRecommendationAction,
  setRecommendationActiveAction,
  updateRecommendationAction,
} from '@/app/admin/actions';
import { StatusBanner } from '@/components/admin/StatusBanner';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { getAdminRecommendations } from '@/lib/admin/data';
import type { AdminRecommendationRecord } from '@/lib/admin/types';

const labelClass =
  'mb-2 block text-[13px] font-semibold text-slate-700';
const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100';

const statusMessages = {
  created: 'Recommendation added.',
  updated: 'Recommendation changes saved.',
  activated: 'Recommendation activated and visible on room screens.',
  deactivated: 'Recommendation deactivated and hidden from room screens.',
  invalid: 'Check the required fields and enter a valid sort order.',
  duplicate: 'A recommendation with that name already exists.',
  error: 'The recommendation could not be saved. Please try again.',
};

function RecommendationFields({
  recommendation,
  idPrefix,
}: {
  recommendation?: AdminRecommendationRecord;
  idPrefix: string;
}) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            required
            maxLength={160}
            defaultValue={recommendation?.name ?? ''}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-category`} className={labelClass}>
            Category
          </label>
          <input
            id={`${idPrefix}-category`}
            name="category"
            maxLength={80}
            defaultValue={recommendation?.category ?? ''}
            placeholder="Food, Cafe, Attraction…"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${idPrefix}-description`} className={labelClass}>
          Description
        </label>
        <textarea
          id={`${idPrefix}-description`}
          name="description"
          required
          rows={3}
          maxLength={1000}
          defaultValue={recommendation?.description ?? ''}
          className={inputClass}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor={`${idPrefix}-distance`} className={labelClass}>
            Distance
          </label>
          <input
            id={`${idPrefix}-distance`}
            name="distance_label"
            maxLength={100}
            defaultValue={recommendation?.distance_label ?? ''}
            placeholder="6 min walk"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-hours`} className={labelClass}>
            Hours
          </label>
          <input
            id={`${idPrefix}-hours`}
            name="hours_label"
            maxLength={160}
            defaultValue={recommendation?.hours_label ?? ''}
            placeholder="7:00 AM – 10:00 PM"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-sort`} className={labelClass}>
            Sort order
          </label>
          <input
            id={`${idPrefix}-sort`}
            name="sort_order"
            type="number"
            min={-1000}
            max={10000}
            required
            defaultValue={recommendation?.sort_order ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <label className="mt-5 flex w-fit items-center gap-3 text-[14px] font-semibold text-slate-700">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={recommendation?.is_active ?? true}
          className="h-4 w-4 rounded border-slate-300 accent-emerald-700"
        />
        Active on room screens
      </label>
    </>
  );
}

export default async function RecommendationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const [recommendations, query] = await Promise.all([
    getAdminRecommendations(),
    searchParams,
  ]);
  const status =
    typeof query.status === 'string' ? query.status : query.status?.[0];
  const activeCount = recommendations.filter(
    (recommendation) => recommendation.is_active,
  ).length;

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
            Local guide
          </p>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight">
            Recommendations
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-6 text-slate-600">
            Add and arrange the hotel-approved places shown to guests.
          </p>
        </div>
        <p className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          {activeCount} active · {recommendations.length - activeCount} inactive
        </p>
      </div>

      <StatusBanner status={status} messages={statusMessages} />

      <details className="group mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm">
        <summary className="cursor-pointer list-none px-6 py-5 text-[17px] font-bold text-emerald-950 marker:content-none">
          <span className="flex items-center justify-between gap-4">
            Add a recommendation
            <span
              aria-hidden="true"
              className="text-[22px] font-normal transition group-open:rotate-45"
            >
              +
            </span>
          </span>
        </summary>
        <form
          action={createRecommendationAction}
          className="border-t border-emerald-200 bg-white p-6"
        >
          <RecommendationFields idPrefix="new-recommendation" />
          <div className="mt-6 flex justify-end">
            <SubmitButton pendingLabel="Adding…">
              Add recommendation
            </SubmitButton>
          </div>
        </form>
      </details>

      <div className="space-y-5">
        {recommendations.map((recommendation) => {
          const updateAction = updateRecommendationAction.bind(
            null,
            recommendation.id,
          );
          const statusAction = setRecommendationActiveAction.bind(
            null,
            recommendation.id,
            !recommendation.is_active,
          );

          return (
            <section
              key={recommendation.id}
              className={`rounded-2xl border bg-white shadow-sm ${
                recommendation.is_active
                  ? 'border-slate-200'
                  : 'border-slate-200 opacity-75'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="truncate text-[18px] font-bold">
                      {recommendation.name}
                    </h2>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                        recommendation.is_active
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {recommendation.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-slate-500">
                    Sort position {recommendation.sort_order}
                  </p>
                </div>

                <form action={statusAction}>
                  <SubmitButton
                    variant={
                      recommendation.is_active ? 'secondary' : 'primary'
                    }
                    pendingLabel={
                      recommendation.is_active
                        ? 'Deactivating…'
                        : 'Activating…'
                    }
                    confirmMessage={
                      recommendation.is_active
                        ? `Hide ${recommendation.name} from all room screens?`
                        : undefined
                    }
                  >
                    {recommendation.is_active ? 'Deactivate' : 'Activate'}
                  </SubmitButton>
                </form>
              </div>

              <form action={updateAction} className="p-6">
                <RecommendationFields
                  recommendation={recommendation}
                  idPrefix={`recommendation-${recommendation.id}`}
                />
                <div className="mt-6 flex justify-end">
                  <SubmitButton>Save changes</SubmitButton>
                </div>
              </form>
            </section>
          );
        })}
      </div>

      {!recommendations.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-[20px] font-bold">No recommendations yet</h2>
          <p className="mt-2 text-[14px] text-slate-600">
            Open “Add a recommendation” above to create the first card.
          </p>
        </div>
      ) : null}
    </>
  );
}
