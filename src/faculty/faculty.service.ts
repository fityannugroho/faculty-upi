import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faculty, FacultyDocument } from './schemas/faculty.schema';

@Injectable()
export class FacultyService {
  constructor(
    @InjectModel(Faculty.name) private facultyModel: Model<FacultyDocument>,
  ) {}

  /**
   * Get all faculties.
   * @returns Promise
   */
  async findAll(): Promise<Faculty[]> {
    return this.facultyModel.find().exec();
  }

  /**
   * Get a faculty by its code.
   * @param facultyCode The faculty code.
   * @returns The faculty.
   */
  async findByCode(facultyCode: string): Promise<Faculty> {
    return this.facultyModel
      .findOne({ code: facultyCode.toUpperCase() })
      .exec();
  }

  /**
   * Find faculties by its name.
   * Perform partial search using case-insensitive regex.
   * @param facultyName The faculty name.
   * @returns The suitable faculties.
   */
  async findByName(facultyName: string): Promise<Faculty[]> {
    return this.facultyModel
      .find({ name: new RegExp(facultyName, 'i') })
      .exec();
  }

  /**
   * Check if a faculty code is already exists.
   * @param facultyCode The faculty code, will be converted to upper case.
   * @returns True if faculty code is already exists, or otherwise.
   */
  async isCodeExists(facultyCode: string): Promise<boolean> {
    return this.facultyModel.exists({ code: facultyCode.toUpperCase() });
  }

  /**
   * Find faculties by its abbreviation.
   * Perform partial search using case-insensitive regex.
   * @param facultyAbbr The faculty abbreviation.
   * @returns The suitable faculties.
   */
  async findByAbbr(facultyAbbr: string): Promise<Faculty[]> {
    return this.facultyModel
      .find({ abbr: new RegExp(facultyAbbr, 'i') })
      .exec();
  }
}
