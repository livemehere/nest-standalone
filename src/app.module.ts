import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { EventsGateway } from './events/events.gateway';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ArticlesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      timezone: 'Asia/Seoul',
      charset: 'utf8mb4',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
