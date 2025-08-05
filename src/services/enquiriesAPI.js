import axiosInstance from "./api";

export const enquiriesAPI = {
  create: (data) => axiosInstance.post("/enquiries/", data),
};
