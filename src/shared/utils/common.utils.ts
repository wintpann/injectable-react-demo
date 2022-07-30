import { v4 as guid } from 'uuid';
import { format } from 'date-fns';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

export type AnyRecord = Record<string, any>;

export const arrayStub = <T>(count: number, map: (key: string) => T): T[] =>
  new Array(count).fill(null).map(() => map(guid()));

export const isValidDate = (date: string | Date) => !Number.isNaN(Date.parse(date as string));

export const getStatusColor = ({ status }: { status: 'positive' | 'negative' }) =>
  status === 'positive' ? '#519551' : '#8d3434';

export const formatDate = (date: string) => format(new Date(date), 'yyyy MMMM, do K:m b');

export type Status = 'positive' | 'negative';

export const clean = <T extends AnyRecord>(object?: T): Partial<T> =>
  omitBy(object, isNil) as Partial<T>;
