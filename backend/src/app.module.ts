import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { SesionModule } from './modules/sesion/sesion.module';
import { AssignmentModule } from './modules/assignment/assignment.module';

@Module({
  imports: [StudentModule, SesionModule, AssignmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
