import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from '@modules/table/entities/table.entity';
import { CreateTableDto } from '@modules/table/dto/create-table.dto';
import { UpdateTableDto } from '@modules/table/dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name)
    private tableModel: Model<TableDocument>,
  ) {}

  create(createTableDto: CreateTableDto): Promise<Table> {
    Logger.log(createTableDto);
    return this.tableModel.create(createTableDto);
  }

  findAll(userId: string): Promise<Table[]> {
    return this.tableModel.find({ userId }).exec();
  }

  findOne(id: string): Promise<Table> {
    return this.tableModel.findById(id).exec();
  }

  update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    return this.tableModel
      .findByIdAndUpdate(id, updateTableDto, { new: true })
      .exec();
  }

  remove(id: string): Promise<boolean> {
    return this.tableModel
      .findByIdAndDelete(id)
      .exec()
      .then((doc) => !!doc);
  }
}
