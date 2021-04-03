import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TableService } from '@modules/table/services/table.service';
import { CreateTableDto } from '@modules/table/dto/create-table.dto';
import { UpdateTableDto } from '@modules/table/dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tablesService: TableService) {}

  @Post()
  create(@Req() req, @Body() body) {
    const createTableDto: CreateTableDto = {
      ...body,
      userId: req.user._id,
    };
    return this.tablesService.create(createTableDto);
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user._id;
    return this.tablesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
