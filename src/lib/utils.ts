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

// HDR: Convert an object to list og object representation
/**
 * Converts an object into an array of labeled key-value pairs.
 *
 * @param {Object} object - An object containing key-value pairs.
 * @param {string | number} object[key] - The value associated with each key in the object.
 *
 * @returns {Array<{label: string, value: string | number}>} An array of objects, each containing a  label and its value.
 */
export const formatObjectToList = (object: {
  [key: string]: string | number;
}) => {
  return Object.entries(object).map(([key, value]) => ({
    label: key,
    value: value,
  }));
};
