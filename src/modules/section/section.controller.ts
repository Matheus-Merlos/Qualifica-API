import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ParseCoursePipe } from 'src/common/pipes/parse-course.pipe';
import { ParseSectionPipe } from 'src/common/pipes/parse-section.pipe';
import { CreateSectionDTO, PatchSectionDTO } from './section.dto';
import { SectionService } from './section.service';

@UseGuards(AuthGuard)
@Controller('course/:courseId/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  async createSection(
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
    @Body() createSectionDTO: CreateSectionDTO,
  ) {
    return await this.sectionService.create(courseId, createSectionDTO);
  }

  @Patch(':sectionId')
  async patchSection(
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
    @Body() patchSectionDTO: PatchSectionDTO,
  ) {
    return await this.sectionService.edit(courseId, sectionId, patchSectionDTO);
  }

  @Delete(':sectionId')
  async deleteSection(
    @Param('sectionId', ParseIntPipe, ParseSectionPipe) sectionId: number,
  ) {
    return await this.sectionService.destroy(sectionId);
  }
}
