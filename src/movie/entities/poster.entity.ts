import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'; 
import { MovieEntity } from './movie.entity';

@Entity({ name: 'movies_posters' })
export class MoviePosterEntity {
 @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({
        type: 'varchar',
        length: 255,
    })
    imageUrl!: string;

    @OneToOne(() => MovieEntity, (movie) => movie.poster)
    movie!: MovieEntity;

    @CreateDateColumn({
        name: 'create_at',
    })
    createAt!: Date;
}