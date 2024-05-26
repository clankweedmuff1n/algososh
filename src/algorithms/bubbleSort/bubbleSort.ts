import React from "react";
import {DELAY_IN_MS} from "../../constants/delays";

async function delay() {
    return new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
}

export type TNumberType = {
    number: number;
    id: string;
    isChanging: boolean;
    isSorted: boolean;
};

export const bubbleSort = async (
    array: TNumberType[],
    setArray: React.Dispatch<React.SetStateAction<TNumberType[]>>,
    arrayRef: React.MutableRefObject<TNumberType[]>,
    setChangingNumbers: React.Dispatch<React.SetStateAction<string[]>>,
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
    isDescending: boolean
) => {
    if (array.length === 0) {
        setIsSorting(false);
        return;
    }

    const newArray = [...arrayRef.current];
    const n = newArray.length;
    let swapped;

    let lastUnsortedIndex = n - 1;

    do {
        swapped = false;

        for (let i = 0; i < lastUnsortedIndex; i++) {
            if (newArray[i].isSorted || newArray[i + 1].isSorted) continue;

            setChangingNumbers([newArray[i].id, newArray[i + 1].id]);

            await delay();

            if (isDescending) {
                if (newArray[i].number < newArray[i + 1].number) {
                    const temp = newArray[i];
                    newArray[i] = newArray[i + 1];
                    newArray[i + 1] = temp;
                    swapped = true;
                }
            } else {
                if (newArray[i].number > newArray[i + 1].number) {
                    const temp = newArray[i];
                    newArray[i] = newArray[i + 1];
                    newArray[i + 1] = temp;
                    swapped = true;
                }
            }

            setChangingNumbers([]);
            arrayRef.current = [...newArray];
            setArray([...newArray]);
        }

        newArray[lastUnsortedIndex].isSorted = true;
        setArray([...newArray]);

        lastUnsortedIndex--;
    } while (swapped);

    for (let i = 0; i < arrayRef.current.length; i++) {
        if (!arrayRef.current[i].isSorted) arrayRef.current[i].isSorted = true;
    }

    setArray([...arrayRef.current]);

    setIsSorting(false);
};
