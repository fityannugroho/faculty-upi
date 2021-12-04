import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FacultyDocument = Faculty & Document;

/**
 * Schema for faculties collection.
 *
 * Note: Collection name is case-sensitive.
 */
@Schema({ collection: 'faculties' })
export class Faculty {
  /**
   * The code of faculty.
   */
  @Prop()
  code: string;

  /**
   * The name of faculty.
   */
  @Prop()
  name: string;

  /**
   * The abbreviation of faculty.
   */
  @Prop()
  abbr: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
