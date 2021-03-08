import { AuthModule } from '@microservices-realworld-example-app/auth';
import { SharedModule } from '@microservices-realworld-example-app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    SharedModule,
    AuthModule,
  ],
  controllers: [
    ArticleController,
  ],
  providers: [
    ArticleService,
  ],
})
export class AppModule {}
