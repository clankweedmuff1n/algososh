import {DELAY_IN_MS} from "../../constants/delays";
import React from "react";

type TLetterType = {
    letter: string;
    id: number;
    isSorted: boolean;
};

export const animateStringReverse = (
    lettersArray: TLetterType[],
    setLettersArray: React.Dispatch<React.SetStateAction<TLetterType[]>>,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number[]>>,
    setIsChanging: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const newLettersArray = [...lettersArray];
    let left = 0;
    let right = newLettersArray.length - 1;

    const interval = setInterval(() => {
        if (left < right) {
            setCurrentIndex([left, right]);

            const temp = newLettersArray[left];
            newLettersArray[left] = newLettersArray[right];
            newLettersArray[right] = temp;

            if (left !== 0 && right !== newLettersArray.length - 1) {
                if (left === 0) {
                    newLettersArray[right + 1].isSorted = true;
                }

                if (right === newLettersArray.length - 1) {
                    newLettersArray[left - 1].isSorted = true;
                } else {
                    newLettersArray[left - 1].isSorted = true;
                    newLettersArray[right + 1].isSorted = true;
                }
            }

            left++;
            right--;
        } else {
            for (let i = 0; i < newLettersArray.length; i++) {
                newLettersArray[i].isSorted = true;
            }
            clearInterval(interval);
            setIsChanging(false);
        }

        setLettersArray([...newLettersArray]);
    }, DELAY_IN_MS);
};
