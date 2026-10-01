const mockCreateClient = jest.fn();

jest.mock("@supabase/supabase-js", () => ({
  createClient: (...args: unknown[]) => mockCreateClient(...args),
}));

describe("supabase client configuration", () => {
  const originalUrl = process.env.REACT_APP_SUPABASE_URL;
  const originalKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

  afterEach(() => {
    if (originalUrl === undefined) {
      delete process.env.REACT_APP_SUPABASE_URL;
    } else {
      process.env.REACT_APP_SUPABASE_URL = originalUrl;
    }

    if (originalKey === undefined) {
      delete process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;
    } else {
      process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY = originalKey;
    }
  });

  it("passes the configured URL and publishable key to createClient", () => {
    const client = { from: jest.fn() };
    const url = "https://portfolio-test.supabase.co";
    const key = "test-publishable-key";
    process.env.REACT_APP_SUPABASE_URL = url;
    process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY = key;
    mockCreateClient.mockReturnValue(client);
    jest.resetModules();

    const { supabase } = require("./supabaseClient");

    expect(mockCreateClient).toHaveBeenCalledWith(url, key);
    expect(supabase).toBe(client);
  });
});

export {};