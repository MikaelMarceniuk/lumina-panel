import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'generated/prisma/browser';
import { RequestWithUser } from 'src/types/request-with-user';

export const CurrentUser = createParamDecorator(
  (field: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    return field ? user?.[field] : user;
  },
);
