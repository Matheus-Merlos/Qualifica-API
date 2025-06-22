import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseMaterialPipe } from 'src/common/pipes/parse-material.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
import { MaterialService } from './material.service';

@Controller('material/')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post('userId/')
  create(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() createMaterialDto: CreateMaterialDto,
  ) {
    return this.materialService.create(userId, createMaterialDto);
  }

  @Get('userId/')
  findAll(@Param('userId', ParseIntPipe, ParseUserPipe) userId: number) {
    return this.materialService.findAllByOwner(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, ParseMaterialPipe) id: number) {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe, ParseMaterialPipe) id: number,
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, userId, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe, ParseMaterialPipe) id: number) {
    return this.materialService.remove(id);
  }
}
