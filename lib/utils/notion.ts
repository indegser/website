import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { CoverType, PageType, PropertyType } from '@src/types/notion.types';

const getNotionFileUrl = (coverOrFiles?: PropertyType<'files'> | CoverType) => {
  if (!coverOrFiles) return null;

  if ('files' in coverOrFiles) {
    for (const file of coverOrFiles.files) {
      if (file.type === 'file') {
        return file.file.url;
      }

      return file.external.url;
    }
  } else {
    if (coverOrFiles.type === 'file') {
      return coverOrFiles.file.url;
    }

    return coverOrFiles.external.url;
  }
};

const getPlainText = (property: PropertyType<'rich_text'>) => {
  return property.rich_text?.[0]?.plain_text || '';
};

const getNotionTitle = (titleProperty: Partial<PropertyType<'title'>>) => {
  return titleProperty.title.map((text) => text.plain_text).join('');
};

const getTitle = (page: PageType | DatabaseObjectResponse) => {
  const getBaseTitle = () => {
    if ('title' in page) {
      return getNotionTitle(page);
    }

    const key = Object.keys(page.properties).find(
      (key) => page.properties[key].type === 'title',
    );

    const prop = page.properties[key] as PropertyType<'title'>;
    return getNotionTitle(prop);
  };

  return [page.icon?.type === 'emoji' && page.icon.emoji, getBaseTitle()]
    .filter(Boolean)
    .join(' ');
};

export const notionUtils = {
  getTitle,
  getPlainText,
  getNotionFileUrl,
};
