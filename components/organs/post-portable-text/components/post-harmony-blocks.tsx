import {
  GridUnit,
  Progression,
  ProgressionCompare,
  RelatedTerms,
  UsageNotes,
  VoiceMotion,
} from '@/lib/sanity';
import { PortableTextComponentProps } from 'next-sanity';
import { CSSProperties, Fragment } from 'react';

const gridUnitDivisors: Record<GridUnit, number> = {
  quarter: 4,
  eighth: 8,
  sixteenth: 16,
};

const termLabels: Record<string, string> = {
  'secondary-dominant': '세컨더리 도미넌트',
  tonicization: '토닉화',
  'borrowed-chord': '차용화음',
  'slash-chord': '분수코드',
  'voice-leading': '성부 진행',
  'chromatic-bass': '반음계적 베이스 진행',
  'line-cliche': '라인 클리셰',
  'common-tone': '공통음',
  predominant: '프리도미넌트',
};

type ProgressionCompareProps = PortableTextComponentProps<ProgressionCompare>;
type VoiceMotionProps = PortableTextComponentProps<VoiceMotion>;
type UsageNotesProps = PortableTextComponentProps<UsageNotes>;
type RelatedTermsProps = PortableTextComponentProps<RelatedTerms>;

function getBarUnits(meter: ProgressionCompare['meter'], gridUnit: GridUnit) {
  return Math.max(
    1,
    Math.round(
      (meter.beatsPerBar * gridUnitDivisors[gridUnit]) / meter.beatUnit,
    ),
  );
}

export function PostProgressionCompare({ value }: ProgressionCompareProps) {
  return (
    <section
      className="my-8 overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
      data-block-id={value._key}
    >
      <ProgressionLane
        label="원래 진행"
        progression={value.before}
        meter={value.meter}
        gridUnit={value.gridUnit}
      />
      <ProgressionLane
        label="바꾼 진행"
        progression={value.after}
        meter={value.meter}
        gridUnit={value.gridUnit}
        variant="changed"
      />
    </section>
  );
}

function ProgressionLane({
  label,
  progression,
  meter,
  gridUnit,
  variant = 'plain',
}: {
  label: string;
  progression: Progression;
  meter: ProgressionCompare['meter'];
  gridUnit: GridUnit;
  variant?: 'plain' | 'changed';
}) {
  const barUnits = getBarUnits(meter, gridUnit);
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${progression.bars.length}, minmax(10rem, 1fr))`,
    minWidth: `${Math.max(progression.bars.length * 10, 40)}rem`,
  };

  return (
    <div className="border-b border-gray-200 p-4 last:border-b-0 dark:border-gray-700">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-label-13 rounded-sm bg-gray-100 px-2 py-1 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {label}
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid gap-2" style={gridStyle}>
          {progression.bars.map((bar) => (
            <div
              key={bar.index}
              className="rounded-sm border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="text-label-12 mb-2 text-gray-500 dark:text-gray-400">
                {bar.index}
              </div>
              <div
                className="min-h-16 grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${barUnits}, minmax(0, 1fr))`,
                }}
              >
                {bar.events.map((event) => {
                  const eventStyle: CSSProperties = {
                    gridColumn: `${event.start + 1} / span ${event.duration}`,
                  };

                  return (
                    <div
                      key={`${event.chord}-${event.start}-${event.duration}`}
                      className={[
                        'min-w-0 rounded-sm border px-2 py-1.5',
                        variant === 'changed'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
                          : 'border-gray-300 bg-white text-gray-950 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100',
                      ].join(' ')}
                      style={eventStyle}
                    >
                      <div className="font-mono text-[0.82rem] font-semibold leading-5">
                        {event.chord}
                      </div>
                    </div>
                  );
                })}
              </div>
              {bar.events.some((event) => event.annotation) ? (
                <div className="mt-2 space-y-1">
                  {bar.events.map((event) =>
                    event.annotation ? (
                      <p
                        key={`${event.chord}-${event.start}-annotation`}
                        className="break-keep text-[0.72rem] leading-4 text-gray-600 dark:text-gray-300"
                      >
                        <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                          {event.chord}
                        </span>{' '}
                        {event.annotation}
                      </p>
                    ) : null,
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PostVoiceMotion({ value }: VoiceMotionProps) {
  return (
    <section
      className="my-8 rounded-md border border-gray-200 p-4 dark:border-gray-700"
      data-block-id={value._key}
    >
      <h3 className="mb-4 text-base font-semibold text-gray-950 dark:text-gray-100">
        {value.title}
      </h3>
      <div className="space-y-4">
        {value.motions.map((motion) => (
          <div key={`${motion.label}-${motion.path.join('-')}`}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-label-13 font-medium text-gray-600 dark:text-gray-300">
                {motion.label}
              </span>
              <NotePath path={motion.path} />
            </div>
            <p className="text-copy-14 break-keep text-gray-700 dark:text-gray-300">
              {motion.explanation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotePath({ path }: { path: string[] }) {
  return (
    <span className="flex flex-wrap items-center gap-1">
      {path.map((note, index) => (
        <Fragment key={`${note}-${index}`}>
          <span className="rounded-sm border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[0.78rem] font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
            {note}
          </span>
          {index < path.length - 1 ? (
            <span className="text-gray-400 dark:text-gray-500">-&gt;</span>
          ) : null}
        </Fragment>
      ))}
    </span>
  );
}

export function PostUsageNotes({ value }: UsageNotesProps) {
  return (
    <section className="my-8" data-block-id={value._key}>
      <h3 className="mb-3 text-base font-semibold text-gray-950 dark:text-gray-100">
        쓰는 자리
      </h3>
      <ul className="space-y-2">
        {value.items.map((item) => (
          <li
            key={item}
            className="text-copy-14 flex gap-2 break-keep text-gray-700 dark:text-gray-300"
          >
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gray-400 dark:bg-gray-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PostRelatedTerms({ value }: RelatedTermsProps) {
  return (
    <section className="my-8" data-block-id={value._key}>
      <h3 className="mb-3 text-base font-semibold text-gray-950 dark:text-gray-100">
        관련 용어
      </h3>
      <div className="flex flex-wrap gap-2">
        {value.termIds.map((termId) => (
          <span
            key={termId}
            className="text-label-13 rounded-sm border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            {termLabels[termId] ?? termId}
          </span>
        ))}
      </div>
    </section>
  );
}
