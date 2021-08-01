const debugService = (service) => {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  service.subscribe((s) => {
    // eslint-disable-next-line no-console
    console.log(s);
  });
};

export default debugService;
