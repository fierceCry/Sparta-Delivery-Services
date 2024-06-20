import express from 'express';
import { NotificationControllers } from '../controllers/notifications.controllers';
import { NotificationService } from '../services/notifications.services';
import { NotificationRepository } from '../repositories/notifications.repository';
import { prisma } from '../utils/utils.prisma';

const notificationRepository = new NotificationRepository(prisma);
const notificationService =  new NotificationService(notificationRepository);
const notificationControllers = new NotificationControllers(notificationService);