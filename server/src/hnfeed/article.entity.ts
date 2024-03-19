import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  objectID: string;

  @Column({ nullable: true })
  url: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  storyText: string;

  @Column({ nullable: true })
  author: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
