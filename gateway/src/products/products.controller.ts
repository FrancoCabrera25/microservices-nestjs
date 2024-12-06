import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {}

  @Get()
  findAlloducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsClient
      .send({ cmd: 'find_one_product' }, { id })
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {}

  @Patch(':id')
  updateProduct(@Param() id: string, @Body() body: any) {}
}
