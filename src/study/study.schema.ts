import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudyDocument = Study & Document;

/**
 * Schema for faculties collection.
 *
 * Note: Collection name is case-sensitive.
 */
@Schema({ collection: 'studies' })
export class Study {
  /**
   * The code of study program.
   */
  @Prop()
  code: string;

  /**
   * The name of study program.
   */
  @Prop()
  name: string;

  /**
   * The faculty code of study program.
   */
  @Prop()
  faculty: string;
}

export const StudySchema = SchemaFactory.createForClass(Study);
