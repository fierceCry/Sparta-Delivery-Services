import express from 'express';
import { SearchController } from '../controllers/search.controller.js';
import { SearchRepository } from '../repositories/search.repository.js';
import { SearchService } from '../services/search.services.js';
import { prisma } from '../utils/utils.prisma.js';

const searchRouter = express();

const searchRepository = new SearchRepository(prisma);
const searchService = new SearchService(searchRepository);
const searchController = new SearchController(searchService);

/** 검색 **/
searchRouter.get('/', searchController.search);

export { searchRouter };
