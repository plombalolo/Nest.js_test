import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MovieEntity } from 'src/movie/entities/movie.entity';

export async function getTypeOrmConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> { return {
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    database: configService.getOrThrow('POSTGRES_DB'),
    entities: [MovieEntity],
    autoLoadEntities: true,
    synchronize: true, 
    };
}