import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/transactions/dto/update-transacttion.dto';
import { TransactionsService } from 'src/transactions/transactions.service';

@Controller({
  path: 'transactions',
  version: '1',
})
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  async getAllTransactions() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  async getTransaction(@Param('id') id: number) {
    return this.transactionService.getTransaction(id);
  }

  @Put(':id')
  async updateTransaction(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }
}
