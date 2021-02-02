import { Module } from '@nestjs/common';
import { TableController } from '@modules/tables/controllers/table.controller';
import { TableService } from '@modules/tables/services/table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from '@modules/tables/entities/table.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
