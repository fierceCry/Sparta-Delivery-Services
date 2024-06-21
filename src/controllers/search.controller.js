import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class SearchController {
  constructor(searchService) {
    this.searchService = searchService;
  }
  search = async (req, res, next) => {
    try {
      const { data } = req.body;

      const searchSystem = await this.searchService.searchSystem(data);

      return res.status(HTTP_STATUS.OK).json({ data: searchSystem });
    } catch (error) {
      next(error);
    }
  };
}
