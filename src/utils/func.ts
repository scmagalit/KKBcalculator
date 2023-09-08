import { roundAmount } from './currency';
import { item, contributor } from './types';

/**
 * Updates the contributions of each contributor for a single item
 * and returns a copy of the modified contributor list
 * @param itemContribMatrix - Boolean 2D array of item vs. contributor
 * @param itemIndex - Index of item in the list of items
 * @param contributors - list of contributors to be modified
 * @param quantity (optional) - new quantity of item. Will use current value if undefined
 * @param price (optional) - new price of item. Will use current value if undefined
 * @returns Modified contributor list
 */
export const updateContribAmountsForItem = (
    itemContribMatrix: Boolean[][],
    items: item[],
    itemIndex: number,
    contributors: contributor[],
    quantity?: number,
    price?: number
) => {
    const totalContributors = itemContribMatrix[itemIndex].filter(
        (contribFlag) => contribFlag == true
    ).length;

    const totalPrice = roundAmount(
        (quantity == undefined ? Number(items[itemIndex].quantity) : quantity) *
            (price == undefined ? Number(items[itemIndex].price) : price)
    );

    const newContribPrice = totalContributors > 0 ? roundAmount(totalPrice / totalContributors) : 0;

    // Update contributions of each contributor for the item
    return contributors.map((contributor, index) => ({
        ...contributor,
        contributions: contributor.contributions.map((contribPrice, contribPriceIndex) =>
            itemIndex == contribPriceIndex
                ? itemContribMatrix[itemIndex][index]
                    ? newContribPrice
                    : 0
                : contribPrice
        )
    }));
};
