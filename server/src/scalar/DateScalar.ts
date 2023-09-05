import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  parseValue(value: number): Date {
    const parsedValue = new Date(value);
    console.log({ value, parsedValue });
    return parsedValue;
  }

  serialize(value: Date): number {
    const serializedValue = value.getTime();
    console.log({ value });
    return serializedValue;
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
