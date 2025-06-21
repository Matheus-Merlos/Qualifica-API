import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseCoursePipe } from 'src/pipes/parse-course.pipe';
import { ParseUserPipe } from 'src/pipes/parse-user.pipe';
import { CreateCourseDTO, PatchCourseDTO } from './course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async searchCourses(@Query('q') query: string) {
    return await this.courseService.search(query);
  }

  @Get(':courseId')
  async retrieveCourse(
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    return await this.courseService.retrieve(courseId);
  }

  @Post(':userId')
  async createCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Body() body: CreateCourseDTO,
  ) {
    return await this.courseService.create(userId, body);
  }

  @Patch(':userId/:courseId')
  async editCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
    @Body() body: PatchCourseDTO,
  ) {
    return await this.courseService.edit(userId, courseId, body);
  }

  @Delete(':userId/:courseId')
  async deleteCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    return await this.courseService.destroy(courseId);
  }
}
