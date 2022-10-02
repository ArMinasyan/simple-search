import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './modules/Auth/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';

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
        entities: [UsersEntity],
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
  ],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): any {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(
  //       { path: '/workspaces', method: RequestMethod.POST },
  //       { path: '/workspaces/join', method: RequestMethod.POST },
  //       { path: '/workspaces/invite', method: RequestMethod.POST },
  //       { path: '/workspaces/*', method: RequestMethod.PUT },
  //       { path: '/workspaces/*', method: RequestMethod.PATCH },
  //       { path: '/workspaces/*/channels', method: RequestMethod.POST },
  //       { path: '/workspaces/*/channels/*', method: RequestMethod.PUT },
  //       { path: '/workspaces/*/channels/*', method: RequestMethod.PATCH },
  //     );
  // }
}
