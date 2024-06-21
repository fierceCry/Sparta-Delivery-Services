import { HttpError } from '../errors/http.error.js';

export class SearchService {
  constructor(searchRepository) {
    this.searchRepository = searchRepository;
  }

  searchSystem = async (data) => {
    if (!data) {
      throw new HttpError.Conflict('검색어를 입력해주세요.');
    }
    return await this.searchRepository.searchSystem(data);
  };
}
