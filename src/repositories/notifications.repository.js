export class NotificationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  notificationsCreate = async ({
    userId,
    restaurantId,
    customerordersstorageId,
    notificationMessage
  }) => {
    console.log('notificationsCreate:', userId, customerordersstorageId, restaurantId, notificationMessage); // 디버깅 메시지
    console.log(customerordersstorageId)
    return await this.prisma.notifications.create({
      data: {
        userId: +userId,
        restaurantId: +restaurantId,
        customerordersstorageId: customerordersstorageId,
        message: notificationMessage,
      },
    });
  };
  
}
