export const handleResponse = (status: number) => {
  switch (status) {
    case 200:
    case 201:
      // Success
      return;

    case 400:
      throw new Error('Bad request');

    case 401:
      throw new Error('Unauthorized – please log in again');

    case 403:
      throw new Error('Forbidden – you do not have access');

    case 404:
      throw new Error('Not found');

    case 500:
    case 502:
    case 503:
      throw new Error('Server error – try again later');

    default:
      throw new Error(`Unexpected status code: ${status}`);
  }
};
