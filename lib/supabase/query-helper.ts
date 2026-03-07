const getLeadingUnderscore = (value: string) => {
  const match = /^_+/.exec(value);

  return match ? match[0] : '';
};

const snakeToCamelKey = (value: string) => {
  const leadingUnderscore = getLeadingUnderscore(value);
  const core = value.slice(leadingUnderscore.length);

  return (
    leadingUnderscore +
    core.replaceAll(/_([a-z])/g, (_match, character: string) => {
      return character.toUpperCase();
    })
  );
};

const camelToSnakeKey = (value: string) => {
  const leadingUnderscore = getLeadingUnderscore(value);
  const core = value.slice(leadingUnderscore.length);

  return (
    leadingUnderscore +
    core.replaceAll(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase()
  );
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return (
    Boolean(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
};

const mapObjectKeys = (
  value: Record<string, unknown>,
  mapper: typeof snakeToCamelKey,
) => {
  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [mapper(key), entryValue]),
  );
};

const shouldSkipAlias = (column: string) => {
  return (
    column.includes(':') ||
    column.includes('->') ||
    column.includes('(') ||
    column.includes(')') ||
    column.includes('::') ||
    /\s/.test(column)
  );
};

export const toSelectColumns = (columns: string[]) => {
  return columns
    .map((column) => column.trim())
    .filter(Boolean)
    .map((column) => {
      if (shouldSkipAlias(column)) {
        return column;
      }

      const alias = snakeToCamelKey(column);

      if (alias === column) {
        return column;
      }

      return `${alias}:${column}`;
    })
    .join(', ');
};

export const fromDbRow = (row: unknown) => {
  if (!isPlainObject(row)) {
    return row;
  }

  return mapObjectKeys(row, snakeToCamelKey);
};

export const fromDbRows = (rows: unknown[] | null) => {
  return (rows || []).map((row) => fromDbRow(row));
};

export const toDbPayload = (payload: unknown) => {
  if (!isPlainObject(payload)) {
    return payload;
  }

  return mapObjectKeys(payload, camelToSnakeKey);
};
