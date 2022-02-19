import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Study, StudyDocument } from './study.schema';

@Injectable()
export class StudyService {
  constructor(
    @InjectModel(Study.name)
    private studyModel: Model<StudyDocument>,
  ) {}

  /**
   * Find all study programs in collection.
   * @returns All study programs.
   */
  async findAll(): Promise<Study[]> {
    return this.studyModel.find().exec();
  }

  /**
   * Find a study program by its code.
   * @param studyCode The study program code.
   * @returns The suitable study program.
   */
  async findByCode(studyCode: string): Promise<Study> {
    return this.studyModel.findOne({ code: studyCode.toUpperCase() }).exec();
  }

  /**
   * Find all study programs that related to specific faculty.
   * @param facultyCode The faculty code, will be converted to upper case.
   * @returns All study programs that related to specific faculty.
   */
  async findByFaculty(facultyCode: string): Promise<Study[]> {
    return this.studyModel.find({ faculty: facultyCode.toUpperCase() }).exec();
  }

  /**
   * Find all study programs by its name.
   * Perform partial search using case-insensitive regex.
   * @param studyName The name of study program.
   * @returns All suitable study programs.
   */
  async findByName(studyName: string): Promise<Study[]> {
    return this.studyModel.find({ name: new RegExp(studyName, 'i') }).exec();
  }
}
