/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  providers: [],
  exports: [],
})
export class PostgresModule {
  static register(entities: Function[], migrations: Function[]): DynamicModule {
    return {
      module: PostgresModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
            type: 'postgres',
            host: configService.get<string>('POSTGRES_HOST'),
            port: configService.get<number>('POSTGRES_PORT'),
            username: configService.get<string>('POSTGRES_USER'),
            password: configService.get<string>('POSTGRES_PASSWORD'),
            database: configService.get<string>('POSTGRES_DB'),
            logging:
              configService.get<string>('POSTGRES_IS_LOGGING_ENABLED') ===
              'true',
            migrationsTableName: '_migrations',
            logger: 'advanced-console',
            migrations,
            entities,
            migrationsRun: true,
            synchronize: false,
            namingStrategy: new SnakeNamingStrategy(),
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
