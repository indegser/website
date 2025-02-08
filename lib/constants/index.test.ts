import { getURL } from './index';

describe('getURL', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...OLD_ENV }; // Make a copy of the old environment
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should return the correct URL when env is production', () => {
    process.env.VERCEL_ENV = 'production';
    expect(getURL()).toBe('https://www.indegser.com');
  });

  it('should return the Vercel URL when env is preview', () => {
    process.env.VERCEL_ENV = 'preview';
    process.env.NEXT_PUBLIC_VERCEL_URL = 'example.vercel.app';
    expect(getURL()).toBe('https://example.vercel.app');
  });

  it('should return localhost URL when no environment variables are set', () => {
    process.env.VERCEL_ENV = 'development';
    process.env.NEXT_PUBLIC_VERCEL_URL = '';
    expect(getURL()).toBe('http://localhost:3000');
  });
});
