orderByCustomer = async ({userId, restaurantId, foodId, count}) => {
  return this.ordersRepository.$transaction(async(tx) => {
      const customerOrder = await tx.orderByCustomer({userId, restaurantId, foodId, count});
      let totalPrice = 0;
      await ordersPrice.forEach(price => {
          totalPrice += price;
      });
      if(totalPrice>userPoints){
          throw new HttpError.Conflict("잔액이 부족합니다.");
      }
      const userPointsUpdate = await tx.userPointsUpdate({userId, userPoints, totalPrice});
      await sendWebSocketNotification('new_order', { userId, restaurantId, orderId: order.id });

      return {customerOrder, userPointsUpdate};
  });
}