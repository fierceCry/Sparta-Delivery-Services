export class NotificationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  notificationsCreate = async (
    userId,
    restaurantId,
    customerordersstorageId,
    message
  ) => {
    return await this.prisma.notifications.create({
      data: {
        userId: +userId,
        restaurantId: +restaurantId,
        customerordersstorageId: +customerordersstorageId,
        message: message,
      },
    });
  };
}
