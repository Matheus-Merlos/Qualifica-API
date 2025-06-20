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
import { ParseMaterialPipe } from 'src/pipes/parse-material.pipe';
import { ParseSectionPipe } from 'src/pipes/parse-section.pipe';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialService } from './material.service';

@Controller(':material/:sectionId')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  create(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Body() createMaterialDto: CreateMaterialDto,
  ) {
    return this.materialService.create(sectionId, createMaterialDto);
  }

  @Get()
  findAll(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
  ) {
    return this.materialService.findAllBySection(sectionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, ParseMaterialPipe) id: number) {
    return this.materialService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe, ParseMaterialPipe) id: number,
    @Param('sectionID', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(id, sectionId, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe, ParseMaterialPipe) id: number) {
    return this.materialService.remove(id);
  }
}
