import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './modules/auth/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { FriendsModule } from './modules/friends/friends.module';
import { FriendsEntity } from './modules/friends/entities/friends.entity';
import { ProfileModule } from './modules/profile/profile.module';
import AuthMiddleware from './common/middlewares/auth.middleware';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db'),
        type: 'postgres',
        synchronize: configService.get<boolean>('database.sync'),
        logging: configService.get<boolean>('database.logging'),
        entities: [UsersEntity, FriendsEntity],
      }),
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.register({
      signOptions: {
        algorithm: 'HS256',
      },
    }),
    FriendsModule,
    ProfileModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/friends/*', method: RequestMethod.POST },
        { path: '/friends/list', method: RequestMethod.GET },
      );
  }
}
