import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'; 
import { MoviePosterEntity } from './poster.entity';
import { on } from 'events';

export enum Genre {
    ACTION = 'action',
    COMEDY = 'comedy',
    DRAMA = 'drama',
    HORROR = 'horror',
}

@Entity({ name: 'movies' })
export class MovieEntity {
 @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({
        type: 'varchar',
        length: 128,
    })
    title!: string;

    @Column({ name: 'poster_id', type: 'uuid', nullable: true })
    posterId!: string;

    @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'poster_id' })
    poster!: MoviePosterEntity | null;

    @Column({
        type: 'text',
        nullable: true,
    })
    description!: string;

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1,
        default: 0,
    })
    rating!: number;

    @Column({
        name: 'release_year',
        type: 'int',
        unsigned: true,
    })
    releaseYear!: number;

    @Column({
        type: 'enum',
        enum: Genre,
        default: Genre.ACTION,
    })
    genre!: Genre;

    @ManyToMany(() => ActorEntity, (actor) => actor.movies)
    @JoinTable({
        name: 'movie_actors',
        joinColumn: {
            name: 'movie_id', referencedColumnName: 'id', },
            inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
    })
    actors!: ActorEntity[];

    @Column({
        name: 'is_available', 
        type: 'boolean',
        default: false
    })
    IsAvailable!: boolean;

    @OneToMany(() => ReviewEntity, (review) => review.movie)
    reviews!: ReviewEntity[];

    @CreateDateColumn({
        name: 'create_at',
    })
    createAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt! : Date;
}