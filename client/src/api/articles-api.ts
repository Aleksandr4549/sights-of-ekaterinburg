import axios from 'axios';

export const articlesApi = {
  getArticle(id: string) {
    return axios.get(`/article/${id}`);
  }
};