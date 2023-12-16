import { instance } from "../CustomAxios";

const generalStatistic = async (startDate, endDate) => {
  return await instance.get("/api/admin/statistic/order", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};

const bookStatistic = async (startDate, endDate) => {
  return await instance.get("/api/admin/statistic/book", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
};

export { generalStatistic, bookStatistic };
