import { ORIGIN } from '@src/types/constants';
import { IndexConfigType } from '@src/types/indexes';

const getConfig = async (id: string): Promise<IndexConfigType> => {
  return fetch(`${ORIGIN}/config?id=${id}`).then((res) => res.json());
};

export const configApi = {
  getConfig,
};
