import { getEvents } from '../getEvents';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ApiError } from '../../errors/ApiError';
import { EnvironmentVariableError } from '../../errors/EnvironmentVariableError';

describe('getEvents', () => {
  it('should return a list with the correct number of requested events (limit = 1)', async () => {
    expect(await getEvents(1)).toHaveLength(1);
  });

  it('should return a list with the correct number of requested events (limit = 2)', async () => {
    expect(await getEvents(2)).toHaveLength(2);
  });

  it('should return a list with 2 results when requested events limit = 10 if only 2 events actually exist', async () => {
    expect(await getEvents(10)).toHaveLength(2);
  });

  describe('with bad URL', () => {
    beforeEach(() => {
      import.meta.env.VITE_BASE_API_URL = 'this is a bad URL';
    });

    it('should throw an ApiError', async () => {
      await expect(getEvents(1)).rejects.toThrow(ApiError);
    });
  });
  
  describe('with empty URL', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_BASE_API_URL', '');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should throw an EnvironmentVariableError when URL is not defined', async () => {
      await expect(getEvents(1)).rejects.toThrow(EnvironmentVariableError);
    });
  });
});
