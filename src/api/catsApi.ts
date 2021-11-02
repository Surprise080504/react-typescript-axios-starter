import HttpApiService from "../services/httpApiService";

const API_BASE = `${process.env.REACT_APP_API_URI}`;
const CATS_ENDPOINT = `${API_BASE}/cats`;

const httpApiService: HttpApiService = new HttpApiService(API_BASE);

export const findAllCats = () => {
  return httpApiService.get(`${CATS_ENDPOINT}/findAll`);
}