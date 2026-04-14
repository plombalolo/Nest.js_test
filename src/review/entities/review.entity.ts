import { MovieEntity } from 'src/movie/entities/movie.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'; 

@Entity({ name: 'reviews' })
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({
        type: 'text',
        nullable: true,
    })
    text!: string;
    
    @Column({ name: 'movie_id', type: 'uuid' })
    movieId!: string;

    @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'movie_id' })
    movie!: MovieEntity;

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1,
        default: 0,
    })
    rating!: number;

    @CreateDateColumn({
        name: 'create_at',
    })
    createAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt! : Date;
}