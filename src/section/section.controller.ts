import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ParseCoursePipe } from 'src/pipes/parse-course.pipe';
import { CreateSectionDTO } from './section.dto';
import { SectionService } from './section.service';

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
}
