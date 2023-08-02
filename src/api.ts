/* eslint-disable @typescript-eslint/no-unused-vars */
export const mockSubmit = async (fields: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 500);
  });
};
