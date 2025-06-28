import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsUserPipe } from 'src/common/pipes/is-user.pipe';
import { ParseMaterialPipe } from 'src/common/pipes/parse-material.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';
import { MaterialService } from './material.service';

@UseGuards(AuthGuard)
@Controller('material/')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post(':userId/')
  create(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Body() createMaterialDto: CreateMaterialDto,
  ) {
    return this.materialService.create(userId, createMaterialDto);
  }

  @Get(':userId/materials')
  findAll(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
  ) {
    return this.materialService.findAllByOwner(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, ParseMaterialPipe) id: number) {
    return this.materialService.findOne(id);
  }

  @Patch(':userId/:id')
  update(
    @Param('id', ParseIntPipe, ParseMaterialPipe) id: number,
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, userId, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe, ParseMaterialPipe) id: number) {
    return this.materialService.remove(id);
  }
}
