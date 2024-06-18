export class OrderController{
    constructor(orderService){
        this.orderService = orderService;
    }
    customerOrder = async (req, res, next) => {
        try {
            const user = req.user;
            const 

        } catch (error) {
            next(error);
        }
    }
}