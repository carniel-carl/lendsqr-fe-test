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
    label: key.replace(/([a-z])([A-Z])/g, "$1 $2"),
    value:
      typeof value === "number"
        ? formatter({ decimal: 0 }).format(value)
        : value,
  }));
};

// HDR: Format date and time
/**
 * Formats a date string or Date object into a readable value.
 *
 * @param {string | Date} date - The date to format.
 * @returns {string} Formatted date string.
 */
export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// HDR: Simulate API response with delay in seconds
/**
 * Simulates an API response with a delay.
 *
 * @param {number} delayInSeconds - The delay in seconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (delayInSeconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayInSeconds * 1000);
  });
};
