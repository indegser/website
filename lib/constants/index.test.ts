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

  it('should return the site URL from NEXT_PUBLIC_SITE_URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    expect(getURL()).toBe('https://example.com');
  });

  it('should return the Vercel URL from NEXT_PUBLIC_VERCEL_URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = '';
    process.env.NEXT_PUBLIC_VERCEL_URL = 'example.vercel.app';
    expect(getURL()).toBe('https://example.vercel.app');
  });

  it('should return localhost URL when no environment variables are set', () => {
    process.env.NEXT_PUBLIC_SITE_URL = '';
    process.env.NEXT_PUBLIC_VERCEL_URL = '';
    expect(getURL()).toBe('http://localhost:3000');
  });

  it('should remove trailing slash from the URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/';
    expect(getURL()).toBe('https://example.com');
  });

  it('should add https:// to the URL if not present', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'example.com';
    expect(getURL()).toBe('https://example.com');
  });
});
