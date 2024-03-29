import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from 'src/db/schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    this.runVerifiedAfterDelay();
    return this.orderModel.create(createOrderDto);
  }
  async findOne(id: string): Promise<Order | null> {
    return (await this.orderModel.findById(id).populate('Package')).populate(
      'Org',
    );
  }

  async findOneVerified(id: string): Promise<Order | null> {
    return (
      await this.orderModel.findById(id, { Verified: true }).populate('Package')
    ).populate('Org');
  }
  async findAll(item: string, page: string) {
    try {
      const packages = await this.orderModel.find().skip(+page).limit(+item);
      return {
        currentPage: parseInt(page),
        perPage: item,
        data: packages,
      };
    } catch (error) {
      throw new Error(`Error while fetching packages: ${error.message}`);
    }
  }

  // update(id: string, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
  async verified() {
    try {
      const orders = await this.orderModel.find();
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (!order.Verified) {
          order.Verified = true;
          await order.save();
        }
      }
      return orders;
    } catch (error) {
      throw new Error(`Error while fetching verified orders: ${error.message}`);
    }
  }
  async runVerifiedAfterDelay() {
    setTimeout(async () => {
      try {
        const verifiedOrders = await this.verified();
        console.log('Verified orders:', verifiedOrders);
        // Handle the verified orders as needed
      } catch (error) {
        console.error(`Error while fetching verified orders: ${error.message}`);
      }
    }, 60000); // 1 minute = 60,000 milliseconds
  }
}
