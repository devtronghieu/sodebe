import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CountersModule } from './counters/counters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserRole } from './users/entities/role.entity';
import { HttpContext } from './types';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }): HttpContext => ({ req, res }),
    }),
    CountersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    registerEnumType(UserRole, { name: 'UserRole' });
  }
}
