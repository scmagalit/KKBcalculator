/**
 * Rounds off the input number
 * @param amount - Amount either as a string or number to be rounded off
 * @returns Rounded off amount
 */
export function roundAmount(amount: string | number) {
    return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
}

/**
 * Formats the number as comma delimited and 2 decimal places
 * @param amount - Amount to be formatted
 * @returns Formatted amount
 */
export function formatAmount(amount: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatter.format(amount);
}
