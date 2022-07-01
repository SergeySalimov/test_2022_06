import { IFilter, ISort } from '@common/interfaces';

export const CLEAR_FILTER: IFilter = {
  dateFrom: null,
  dateTill: null,
  description: null,
  status: null,
};

export const DEFAULT_SORT: ISort = {
  date: 'desc',
  description: null,
}

export const DEBOUNCE_BEFORE_REQUEST = 400;
