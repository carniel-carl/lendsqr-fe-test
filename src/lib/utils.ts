// HDR: Number formatter
/**
 * Format a number to a standardd representation either as currency or number
 *
 * @param {Record<string, any>}
 * @returns { string} -Intl.NumberFormat
 */
export const formatter = ({
  decimal = 2,
  style = "decimal",
  currency = undefined,
}: {
  decimal?: number;
  style?: string;
  currency?: string | undefined;
}) => {
  return new Intl.NumberFormat(undefined, {
    //@ts-expect-error: String is key of Number format
    style: style,
    currency: currency,
    maximumFractionDigits: decimal,
    minimumFractionDigits: decimal,
    useGrouping: true,
  });
};
