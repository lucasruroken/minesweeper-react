export class BaseService {
  headers() {
    const auth = `Bearer ${localStorage.getItem('jwt')}`;

    return {
      'Authorization': auth,
    }
  }
}