import HttpApiService from '../services/HttpApiService';
import { Cat } from '../model/cat';

const API_BASE = `${process.env.REACT_APP_API_URI}`;
const CATS_ENDPOINT = `${API_BASE}/cats`;

const httpApiService: HttpApiService = new HttpApiService(API_BASE);

export const findAllCats = () => {
  return httpApiService.get(`${CATS_ENDPOINT}`);
}

export const createCat = (createCat: Cat) => {
  return httpApiService.post(`${CATS_ENDPOINT}`, createCat);
}