import axios from 'axios';
import {constants} from "../config/constants";
import {BaseService} from "./BaseService";

class BoardsService extends BaseService {
  index(page = 1, per_page = 20) {
    return axios.get(`${constants.api}/boards?page=${page}&per_page=${per_page}`, {
      headers: this.headers()
    })
  }

  create(body) {
    return axios.post(`${constants.api}/boards`, body, { headers: this.headers() })
  }

  show(id) {
    return axios.get(`${constants.api}/boards/${id}`, {
      headers: this.headers()
    })
  }

  click(cell, action) {
    return axios.put(`${constants.api}/boards/${cell.board_id}/cells/${cell.id}/${action}`, {}, {
      headers: this.headers()
    })
  }

  addUser(id, email) {
    return axios.post(`${constants.api}/boards/${id}/add_user`, { email }, {
      headers: this.headers()
    })
  }
}

export const boardsService = new BoardsService()