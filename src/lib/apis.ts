const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions = RequestInit & {
  token?: string;
};

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<T> {
  const headers = new Headers(options?.headers);

  headers.set("Content-Type", "application/json");

  if (options?.token) {
    headers.set("Authorization", options.token);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error: ${response.status}`);
    }

    return await response.json();
      
  } catch (error : any) {
      throw new Error(error.message || error);
  }

}
