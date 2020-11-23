import axios from 'axios';

export const pagesApi = {
  getArchitectureArticles(pageSize: number, currentPage: number) {
    return axios.get(`/architecture?count=${pageSize}&page=${currentPage}`);
  },
  getStreetArtsArticles(pageSize: number, currentPage: number) {
    return axios.get(`/street-arts?count=${pageSize}&page=${currentPage}`);
  }
};