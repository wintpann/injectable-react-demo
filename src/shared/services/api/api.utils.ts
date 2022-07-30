import { useState } from 'react';
import {
  PaginatedRemoteData,
  PaginatedRemoteResponse,
  RemoteData,
  RemoteDataWith,
  Response,
  SuccessResponse,
} from '@shared/utils/remote.utils';
import { useAction } from 'injectable-react';
import { clean, AnyRecord } from '@shared/utils/common.utils';
import { failedResponse } from '@shared/services/api/api.service';

// kinda silly but let's assume that we have validation of api responses somewhere else
export const isSuccess = <T>(response: Response<T>): response is SuccessResponse<T> =>
  response?.status === 200;

export const paginatedRemoteDataWith = <T, D extends AnyRecord = AnyRecord>(
  additional: D,
  initial?: Partial<PaginatedRemoteData<T>>,
): D extends infer I_D ? PaginatedRemoteData<T, I_D> : PaginatedRemoteData<T, D> => {
  const data = {
    items: [],
    hasNextPage: false,
    count: 0,
    page: 0,
    loading: false,
    ...initial,
    ...additional,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return data;
};

export const paginatedRemoteData = <T>(initial?: Partial<T>): PaginatedRemoteData<T> => ({
  items: [],
  hasNextPage: false,
  count: 0,
  page: 0,
  loading: false,
  ...initial,
});

export const remoteData = <T>(partial?: Partial<RemoteData<T>>): RemoteData<T> => ({
  data: null,
  loading: false,
  ...partial,
});

export const remoteDataWith = <T, D extends AnyRecord>(
  additional: D,
  partial?: Partial<RemoteData<T>>,
): RemoteDataWith<T, D> => {
  const data = {
    data: null,
    loading: false,
    ...partial,
    ...additional,
  };
  return data as RemoteDataWith<T, D>;
};

type UsePaginatedRemoteDataWith<T, D extends AnyRecord> = D extends infer I_D
  ? (options: {
      onFailure?: () => void;
      onSuccess?: () => void;
      additional: I_D;
      initial?: Partial<PaginatedRemoteData<T>>;
      getData: (state: PaginatedRemoteData<T, I_D>) => Promise<PaginatedRemoteResponse<T>>;
    }) => {
      state: PaginatedRemoteData<T, I_D>;
      setState: (
        callback: (
          prev: Partial<PaginatedRemoteData<T, D>>,
        ) => Partial<Partial<PaginatedRemoteData<T, D>>>,
      ) => void;
      load: (partial?: Partial<PaginatedRemoteData<T, I_D>>) => Promise<void>;
      loadNext: (partial?: Partial<PaginatedRemoteData<T, I_D>>) => Promise<void>;
      reset: () => void;
    }
  : never;

export const usePaginatedRemoteDataWith = <T, D extends AnyRecord>(
  ...parameters: Parameters<UsePaginatedRemoteDataWith<T, D>>
): ReturnType<UsePaginatedRemoteDataWith<T, D>> => {
  const { initial, additional, onSuccess, onFailure, getData } = parameters[0];

  const [state, setState] = useState<PaginatedRemoteData<T, D>>(
    paginatedRemoteDataWith(additional, initial) as PaginatedRemoteData<T, D>,
  );

  const load: ReturnType<UsePaginatedRemoteDataWith<T, D>>['load'] = useAction(async (partial) => {
    setState((prev) => ({ ...prev, page: 0, items: [], ...clean(partial), loading: true }));
    const response = await getData({ ...state, page: 0, ...clean(partial) });
    if (isSuccess(response)) {
      setState((prev) => ({
        ...prev,
        loading: false,
        items: response.data.items,
        hasNextPage: response.data.hasNextPage,
      }));
      onSuccess?.();
    } else {
      setState((prev) => ({ ...prev, loading: false }));
      onFailure?.();
    }
  });

  const loadNext: ReturnType<UsePaginatedRemoteDataWith<T, D>>['loadNext'] = useAction(
    async (partial) => {
      const updatedPage = state.page + 1;

      setState((prev) => ({ ...prev, ...clean(partial), loading: true, page: updatedPage }));

      const response = await getData({ ...state, page: updatedPage, ...clean(partial) });

      if (isSuccess(response)) {
        setState((prev) => ({
          ...prev,
          loading: false,
          items: [...prev.items, ...response.data.items],
          hasNextPage: response.data.hasNextPage,
        }));
        onSuccess?.();
      } else {
        setState((prev) => ({ ...prev, loading: false }));
        onFailure?.();
      }
    },
  );

  const setStateEnhanced: ReturnType<UsePaginatedRemoteDataWith<T, D>>['setState'] = useAction(
    (callback) => {
      setState((prev) => ({ ...prev, ...clean(callback(prev)) }));
    },
  );

  const reset = useAction(() => {
    setState(paginatedRemoteDataWith(additional, initial) as PaginatedRemoteData<T, D>);
  });

  return {
    state,
    setState: setStateEnhanced,
    load,
    loadNext,
    reset,
  } as ReturnType<UsePaginatedRemoteDataWith<T, D>>;
};

export const apiRequest =
  <T, U = void>(call: (params: U) => Promise<Response<T>>) =>
  async (params: U) => {
    try {
      return await call(params);
    } catch (e) {
      return failedResponse();
    }
  };
