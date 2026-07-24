import axios from "axios";

// -----------------------------------------------------------------------
// Centralised Axios instance
// -----------------------------------------------------------------------
// Every API call in the app goes through this single instance.
// Changing the baseURL here (dev vs prod) affects the entire app.
// -----------------------------------------------------------------------

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------------------------------------------------
// Request Interceptor
// -----------------------------------------------------------------------
// Attaches an Authorization header to every outgoing request.
// This is a hardcoded mock token for now — in a real app this would
// come from an auth store / localStorage / cookie.
// -----------------------------------------------------------------------
apiClient.interceptors.request.use((config) => {
  const mockToken = "mock-jwt-token-123456";
  config.headers.Authorization = `Bearer ${mockToken}`;
  return config;
});

// -----------------------------------------------------------------------
// Response Interceptor
// -----------------------------------------------------------------------
// (a) On success -> unwraps response.data so callers receive the actual
//     data, never the Axios response wrapper.
// (b) On failure -> throws a standardised Error object with a `message`
//     and a `statusCode`, so components never need to know about HTTP
//     status codes or Axios-specific error shapes.
// -----------------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = "Something went wrong. Please try again.";
    let statusCode = 500;

    if (error.response) {
      // Server responded with a status code outside 2xx
      statusCode = error.response.status;
      message =
        error.response.data?.message ||
        `Request failed with status ${statusCode}`;
    } else if (error.request) {
      // Request was made but no response was received (network/timeout)
      statusCode = 0;
      message = "Network error: unable to reach the server.";
    } else {
      // Something went wrong setting up the request
      message = error.message;
    }

    const standardisedError = new Error(message);
    standardisedError.statusCode = statusCode;

    return Promise.reject(standardisedError);
  }
);

export default apiClient;
