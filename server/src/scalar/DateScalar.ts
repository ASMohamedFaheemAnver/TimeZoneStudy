import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (_) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  parseValue(value: number): Date {
    const parsedValue = new Date(value);
    console.log({ function: this.parseValue.name, value, parsedValue });
    return parsedValue;
  }

  serialize(value: Date): number {
    const serializedValue = value.getTime();
    console.log({ function: this.serialize.name, value, serializedValue });
    return serializedValue;
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      const parsedValue = new Date(ast.value);
      console.log({
        function: this.parseLiteral.name,
        value: ast.value,
        parsedValue,
      });
      return parsedValue;
    }
    return null;
  }
}
