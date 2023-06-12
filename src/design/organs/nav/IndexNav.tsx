import { IndexNavItem } from './IndexNavItem';

import { configApi } from '@src/apis/config';

export const IndexNav = async () => {
  const indexes = await configApi.getIndexes();

  return (
    <>
      {indexes.map((index) => {
        return <IndexNavItem key={index.id} id={index.id} />;
      })}
    </>
  );
};
