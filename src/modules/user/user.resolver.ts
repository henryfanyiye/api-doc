import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserModel } from './models/user.model';
import { UserQueryModel } from './models/userQuery.model';
import { UserService } from './user.service';
import { stringToObjectId } from '../../lib/helper';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Query(() => [UserModel])
  async findUser(@Args('query') query: UserQueryModel) {
    let arg: any;
    if (query._id) {
      const _id = stringToObjectId(query._id);
      delete query._id;
      arg = Object.assign({ _id }, query);
    }
    return this.userService.find(arg);
  }
}
