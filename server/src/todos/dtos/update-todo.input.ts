import { InputType, Field, ID, PartialType } from '@nestjs/graphql';


@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
