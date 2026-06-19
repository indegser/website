# Progression Blocks

Progression blocks are the approved way to publish chord progression examples.

They exist so original and changed progressions can align by time, even when one side has two chords in a bar and the other side has one.

## Shared Types

```ts
type Meter = {
  beatsPerBar: number;
  beatUnit: number;
};

type GridUnit = 'quarter' | 'eighth' | 'sixteenth';

type ChordEvent = {
  chord: string;
  start: number;
  duration: number;
  role?: string;
  annotation?: string;
};

type ProgressionBar = {
  index: number;
  events: ChordEvent[];
};

type Progression = {
  bars: ProgressionBar[];
};
```

For 4/4:

- `quarter`: one bar = 4 units
- `eighth`: one bar = 8 units
- `sixteenth`: one bar = 16 units

Prefer `eighth` by default.

## progressionCompare

Use for reharmonization patterns.

```ts
{
  _type: "progressionCompare",
  id: "main-example",
  meter: { beatsPerBar: 4, beatUnit: 4 },
  gridUnit: "eighth",
  before: {
    bars: [
      { index: 1, events: [{ chord: "Eb", start: 0, duration: 8 }] },
      { index: 2, events: [{ chord: "Fm7", start: 0, duration: 8 }] }
    ]
  },
  after: {
    bars: [
      { index: 1, events: [{ chord: "Eb", start: 0, duration: 8 }] },
      {
        index: 2,
        events: [
          { chord: "F/A", start: 0, duration: 4 },
          { chord: "Fm7", start: 4, duration: 4 }
        ]
      }
    ]
  }
}
```

## Validation Rules

1. `id` is unique inside the post.
2. `meter.beatsPerBar` and `meter.beatUnit` are positive integers.
3. `gridUnit` is supported.
4. Each bar has a positive integer `index`.
5. Each event has a non-empty `chord`.
6. `start` and `duration` are non-negative integers, and `duration > 0`.
7. `start + duration` does not exceed the bar length.
8. Events in the same bar do not overlap.
9. In `progressionCompare`, `before.bars.length === after.bars.length`.
10. Matching before/after bars represent the same time width.

The renderer should calculate width from time, not from chord count.
