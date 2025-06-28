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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsUserPipe } from 'src/common/pipes/is-user.pipe';
import { ParseCoursePipe } from 'src/common/pipes/parse-course.pipe';
import { ParseUserPipe } from 'src/common/pipes/parse-user.pipe';
import { CreateCourseDTO, PatchCourseDTO } from './course.dto';
import { CourseService } from './course.service';

@UseGuards(AuthGuard)
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

  @Get(':userId/courses')
  async retrieveByOwner(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
  ) {
    return await this.courseService.listByOwner(userId);
  }

  @Post(':userId')
  async createCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Body() body: CreateCourseDTO,
  ) {
    return await this.courseService.create(userId, body);
  }

  @Patch(':userId/:courseId')
  async editCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
    @Body() body: PatchCourseDTO,
  ) {
    return await this.courseService.edit(userId, courseId, body);
  }

  @Delete(':userId/:courseId')
  async deleteCourse(
    @Param('userId', ParseIntPipe, ParseUserPipe, IsUserPipe) userId: number,
    @Param('courseId', ParseIntPipe, ParseCoursePipe) courseId: number,
  ) {
    return await this.courseService.destroy(courseId);
  }
}
