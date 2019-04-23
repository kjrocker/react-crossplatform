export const http = (request: any, response: any) => {
  response.status(200).send("Hello World!");
};

export const event = (event: any, callback: any) => {
  callback();
};
