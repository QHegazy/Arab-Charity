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
    return this.orderModel.create(createOrderDto);
  }
  async findOne(id: string): Promise<Order | null> {
    return (await this.orderModel.findById(id).populate('Package')).populate(
      'Owner',
    );
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
}
