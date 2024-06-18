import { HttpError } from "../errors/http.error";

export class SearchService{
    constructor(searchRepository){
        this.searchRepository = searchRepository;
    }
    
    searchSystem = async (data) => {
        if(!data){
            throw new HttpError.Conflict('검색어를 입력해주세요.')
        }
        const search = await this.searchRepository.searchSystem(data);
        return search;
    }
}