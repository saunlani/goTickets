import { EventResult } from '../interfaces';
import { ApiError } from '../errors/ApiError';
import { EnvironmentVariableError } from '../errors/EnvironmentVariableError';

const requestOptions: RequestInit = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export const getEvents = async (limit: number): Promise<EventResult[]> => {
  const baseUrl: string = import.meta.env.VITE_BASE_API_URL as string;
  if (baseUrl.length === 0) {
    throw new EnvironmentVariableError('VITE_BASE_API_URL is not defined in the environment variables.');
  }
  const url: string = `${baseUrl}/events?limit=${limit}`;
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data: EventResult[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw new ApiError(error.toString());
    },
    );
};