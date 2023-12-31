'use client';

import { formatAmount, roundAmount } from '@/utils/currency';
import { useState } from 'react';
import { item, contributor } from '@/utils/types';
import { updateContribAmountsForItem } from '@/utils/func';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import AddItemButton from './AddItemButton';
import AddContributorButton from './AddContributorButton';

export default function KKBTable() {
    const [items, setItems] = useState<item[]>([
        { name: 'Item 1', quantity: 1.0, price: 1.0, quantityDisplay: '1.00', priceDisplay: '1.00' }
    ]);

    const [contributors, setContributors] = useState<contributor[]>([
        { name: 'Contributor 1', contributions: [0.5] },
        { name: 'Contributor 2', contributions: [0.5] }
    ]);

    // Rows: item; Cols: contributor
    const [itemContribMatrix, setItemContribMatrix] = useState<Boolean[][]>([[true, true]]);

    const addContributor = () => {
        setContributors((prevContributors) => [
            ...prevContributors,
            {
                name: 'Contributor ' + (prevContributors.length + 1),
                contributions: new Array(items.length).fill(0.0)
            }
        ]);

        // Add new contributor flag to each item row in matrix
        setItemContribMatrix(itemContribMatrix.map((itemRow) => [...itemRow, false]));
    };

    const removeContributor = (contributorIndex: number) => {
        let newContributors = contributors
            .slice(0, contributorIndex)
            .concat(contributors.slice(contributorIndex + 1));

        // Remove contributor from each item row in matrix
        const newItemContribMatrix = itemContribMatrix.map((itemRow) =>
            itemRow.slice(0, contributorIndex).concat(itemRow.slice(contributorIndex + 1))
        );
        setItemContribMatrix(newItemContribMatrix);

        // Update contribution amounts for all items
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            newContributors = updateContribAmountsForItem(
                newItemContribMatrix,
                items,
                itemIndex,
                newContributors
            );
        }
        setContributors(newContributors);
    };

    const addItem = () => {
        setItems((prevItems) => [
            ...prevItems,
            {
                name: 'Item ' + (prevItems.length + 1),
                quantity: 1.0,
                price: 1.0,
                quantityDisplay: '1.00',
                priceDisplay: '1.00'
            }
        ]);

        setContributors(
            contributors.map((contributor) => ({
                ...contributor,
                contributions: [...contributor.contributions, 0.0]
            }))
        );

        // Add new item row to matrix
        setItemContribMatrix([...itemContribMatrix, new Array(contributors.length).fill(false)]);
    };

    const removeItem = (itemIndex: number) => {
        const newItems = items.slice(0, itemIndex).concat(items.slice(itemIndex + 1));

        setItems(newItems);

        // Remove contribution amounts for the item
        const newContributors = contributors.map((contributor) => ({
            ...contributor,
            contributions: contributor.contributions
                .slice(0, itemIndex)
                .concat(contributor.contributions.slice(itemIndex + 1))
        }));

        setContributors(newContributors);

        // Remove item from matrix
        const newItemContribMatrix = itemContribMatrix
            .slice(0, itemIndex)
            .concat(itemContribMatrix.slice(itemIndex + 1));

        setItemContribMatrix(newItemContribMatrix);
    };

    const updateItemQuantity = (itemIndex: number, value: string) => {
        const numValue = roundAmount(value.replace(',', ''));

        setItems(
            items.map((item, index) =>
                itemIndex == index
                    ? {
                          ...item,
                          quantity: numValue,
                          quantityDisplay: formatAmount(numValue)
                      }
                    : item
            )
        );

        setContributors(
            updateContribAmountsForItem(
                itemContribMatrix,
                items,
                itemIndex,
                contributors,
                numValue,
                undefined
            )
        );
    };

    const updateItemQuantityDisplay = (itemIndex: number, value: string) => {
        setItems(
            items.map((item, index) =>
                itemIndex == index
                    ? {
                          ...item,
                          quantityDisplay: value
                      }
                    : item
            )
        );
    };

    const updateItemPrice = (itemIndex: number, value: string) => {
        const numValue = roundAmount(value.replace(',', ''));

        setItems(
            items.map((item, index) =>
                itemIndex == index
                    ? {
                          ...item,
                          price: numValue,
                          priceDisplay: formatAmount(numValue)
                      }
                    : item
            )
        );

        setContributors(
            updateContribAmountsForItem(
                itemContribMatrix,
                items,
                itemIndex,
                contributors,
                undefined,
                numValue
            )
        );
    };

    const updateItemPriceDisplay = (itemIndex: number, value: string) => {
        setItems(
            items.map((item, index) =>
                itemIndex == index
                    ? {
                          ...item,
                          priceDisplay: value
                      }
                    : item
            )
        );
    };

    const updateContribution = (itemIndex: number, contributorIndex: number) => {
        let newItemContribMatrix = itemContribMatrix.map((itemRow, index) =>
            itemIndex == index
                ? itemRow.map((contribFlag, index) =>
                      contributorIndex == index ? !contribFlag : contribFlag
                  )
                : itemRow
        );

        setItemContribMatrix(newItemContribMatrix);

        setContributors(
            updateContribAmountsForItem(newItemContribMatrix, items, itemIndex, contributors)
        );
    };

    return (
        <div className="flex flex-col border">
            <div className="flex flex-row h-[50vh]">
                <div className="w-full overflow-x-auto overflow-y-auto">
                    <table className="table-fixed border-collapse min-w-max">
                        <thead>
                            <tr>
                                <th colSpan={4} className="border-r-2">
                                    Itemized Bill
                                </th>

                                {/* Contributions */}
                                <th colSpan={contributors.length}>Contributions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-bold">Item</td>
                                <td className="font-bold w-36">Quantity</td>
                                <td className="font-bold w-36">Price</td>
                                <td className="font-bold border-r-2">Total</td>

                                {/* Contributions */}
                                {contributors.map((contributor, contributorIndex) => (
                                    <td key={contributorIndex} className="font-bold">
                                        <div className="flex">
                                            <input
                                                className="w-full"
                                                type="text"
                                                value={contributor.name}
                                                onChange={(e) =>
                                                    setContributors(
                                                        contributors.map((contributor, index) =>
                                                            contributorIndex == index
                                                                ? {
                                                                      ...contributor,
                                                                      name: e.target.value
                                                                  }
                                                                : contributor
                                                        )
                                                    )
                                                }
                                                onFocus={(e) => e.target.select()}
                                            />
                                            {/* <EditButton
                                                onClick={() => {
                                                    return;
                                                }}
                                                title="Edit contributor name"
                                            /> */}

                                            {contributors.length > 1 && (
                                                <DeleteButton
                                                    onClick={() =>
                                                        removeContributor(contributorIndex)
                                                    }
                                                    title="Delete contributor"
                                                />
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Item rows and contributions */}
                            {items.map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                    <td>
                                        <div className="flex">
                                            <input
                                                className="w-full"
                                                type="text"
                                                value={item.name}
                                                onChange={(e) =>
                                                    setItems(
                                                        items.map((item, index) =>
                                                            itemIndex == index
                                                                ? { ...item, name: e.target.value }
                                                                : item
                                                        )
                                                    )
                                                }
                                                onFocus={(e) => e.target.select()}
                                            />
                                            {/* <EditButton
                                                onClick={() => {
                                                    return;
                                                }}
                                                title="Edit item name"
                                            /> */}

                                            {items.length > 1 && (
                                                <DeleteButton
                                                    onClick={() => removeItem(itemIndex)}
                                                    title="Delete item"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className=" w-36">
                                        <input
                                            className="w-full text-right"
                                            type="text"
                                            value={item.quantityDisplay}
                                            onChange={(e) =>
                                                updateItemQuantityDisplay(itemIndex, e.target.value)
                                            }
                                            onBlur={() =>
                                                updateItemQuantity(itemIndex, item.quantityDisplay)
                                            }
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </td>
                                    <td className=" w-36">
                                        <input
                                            className="w-full text-right"
                                            type="text"
                                            value={item.priceDisplay}
                                            onChange={(e) =>
                                                updateItemPriceDisplay(itemIndex, e.target.value)
                                            }
                                            onBlur={() =>
                                                updateItemPrice(itemIndex, item.priceDisplay)
                                            }
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </td>
                                    <td className="text-right border-r-2">
                                        {formatAmount(roundAmount(item.quantity * item.price))}
                                    </td>

                                    {/* Contributions */}
                                    {contributors.map((contributor, contributorIndex) => (
                                        <td key={contributorIndex}>
                                            <button
                                                className="w-full text-right"
                                                onClick={() =>
                                                    updateContribution(itemIndex, contributorIndex)
                                                }>
                                                {formatAmount(
                                                    roundAmount(
                                                        contributor.contributions[itemIndex]
                                                    )
                                                )}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            {/* Totals */}
                            <tr>
                                <td colSpan={3} className="font-bold">
                                    Total Amount
                                </td>
                                <td className="border-r-2 text-right">
                                    {formatAmount(
                                        items.reduce(
                                            (totalAmount, item) =>
                                                totalAmount + item.quantity * item.price,
                                            0
                                        )
                                    )}
                                </td>
                                {contributors.map((contributor, contributorIndex) => (
                                    <td key={contributorIndex} className="font-bold text-right">
                                        {formatAmount(
                                            contributor.contributions.reduce(
                                                (totalAmount, contribution) =>
                                                    totalAmount + contribution
                                            )
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="flex flex-col border w-8 items-center">
                    <AddContributorButton onClick={addContributor} title="Add contributor" />
                </div>
            </div>
            <div className="flex flex-row h-8">
                <div className="flex items-center w-full border">
                    <AddItemButton onClick={addItem} title="Add item" />
                </div>
                <div className="w-8 border"></div>
            </div>
        </div>
    );
}
