import axios from "axios";

export const createApiClient = (baseURL = process.env.NEXT_PUBLIC_API_URL) => {
  const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // retry برای خطاهای سروری
  //   axiosRetry(api, {
  //     retries: 2,
  //     retryDelay: (retryCount) => retryCount * 1000,
  //     retryCondition: (error) => {
  //       const status = error?.response?.status;
  //       return status >= 500;
  //     },
  //   });

  //   setupRequestInterceptor(api);
  //   setupResponseInterceptor(api);

  return api;
};
