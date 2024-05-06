import { ComplexStyleRule, style } from '@vanilla-extract/css';

export default function createStyles<
  T extends Record<string, ComplexStyleRule>
>(styles: T): { [K in keyof T]: string } {
  return Object.entries(styles).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: style(value),
    }),
    {} as { [K in keyof T]: string }
  );
}
