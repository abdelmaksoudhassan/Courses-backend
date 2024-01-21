import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Test = createParamDecorator((data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().test
);