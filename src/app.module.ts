import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from './config';
import { AccountModule } from './module/account.module';
import { ActivityModule } from './module/activity.module';
import { AuthModule } from './module/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      connectionFactory: (connection) => {
        // connection.plugin(require('mongoosejs-soft-delete'));
        return connection
      }
    }),
    AuthModule,
    AccountModule,
    ActivityModule

  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule { }
