export const isApiError = (data: any | ApiError): data is ApiError => {
  return (data as ApiError).status !== undefined;
};
