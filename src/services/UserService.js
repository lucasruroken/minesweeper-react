import axios from 'axios';
import {constants} from "../config/constants";
import {BaseService} from "./BaseService";

class UserService extends BaseService {
  me() {
    return axios.get(`${constants.api}/users/me`, { headers: this.headers() })
  }

  sessionCreate(body) {
    return axios.post(`${constants.api}/sessions`, body)
  }

  create(body) {
    return axios.post(`${constants.api}/registrations`, body)
  }
}

export const userService = new UserService()