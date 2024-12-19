import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationOrderDto } from './dto/pagination-order.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto,
    });
  }

  async findAll(paginationOrderDto: PaginationOrderDto) {
    console.log('paginationOrderDto', paginationOrderDto);
    const totalPages = await this.order.count({
      where: { status: paginationOrderDto.status },
    });

    const currentPage = paginationOrderDto.page;
    const perPage = paginationOrderDto.limit;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
          status: paginationOrderDto.status,
        },
      }),
      totalPages,
      currentPage,
      lastPage: Math.ceil(currentPage / perPage),
    };
  }

  
  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id },
    });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `order with id ${id} not found`,
      });
    }

    return order;
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);

    if(order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status },
    });
  }
}
