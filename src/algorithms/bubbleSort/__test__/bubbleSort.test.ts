import React from 'react';
import { act } from '@testing-library/react';
import {bubbleSort, TNumberType} from "../bubbleSort";

jest.mock('../../../constants/delays', () => ({
    DELAY_IN_MS: 0, // Имитируем задержку 0, чтобы ускорить тесты
}));

const renderComponent = () => {
    let arrayRef: React.MutableRefObject<TNumberType[]> = { current: [] };
    const setArray = jest.fn((newArray) => {
        arrayRef.current = newArray;
    });
    const setChangingNumbers = jest.fn();
    const setIsSorting = jest.fn();

    return {
        arrayRef,
        setArray,
        setChangingNumbers,
        setIsSorting,
    };
};

describe('bubbleSort', () => {
    it('сортирует пустой массив', async () => {
        const { arrayRef, setArray, setChangingNumbers, setIsSorting } = renderComponent();

        await act(async () => {
            await bubbleSort([], setArray, arrayRef, setChangingNumbers, setIsSorting, false);
        });

        expect(arrayRef.current).toEqual([]);
        expect(setArray).not.toHaveBeenCalled();
        expect(setIsSorting).toHaveBeenCalledWith(false);
    });

    it('сортирует массив с одним элементом', async () => {
        const initialArray: TNumberType[] = [{ number: 1, id: '1', isChanging: false, isSorted: false }];
        const { arrayRef, setArray, setChangingNumbers, setIsSorting } = renderComponent();

        arrayRef.current = initialArray;

        await act(async () => {
            await bubbleSort(initialArray, setArray, arrayRef, setChangingNumbers, setIsSorting, false);
        });

        expect(arrayRef.current).toEqual([{ number: 1, id: '1', isChanging: false, isSorted: true }]);
        expect(setArray).toHaveBeenCalledWith([{ number: 1, id: '1', isChanging: false, isSorted: true }]);
        expect(setIsSorting).toHaveBeenCalledWith(false);
    });

    it('сортирует массив с несколькими элементами в порядке возрастания', async () => {
        const initialArray: TNumberType[] = [
            { number: 3, id: '1', isChanging: false, isSorted: false },
            { number: 1, id: '2', isChanging: false, isSorted: false },
            { number: 2, id: '3', isChanging: false, isSorted: false },
        ];
        const expectedArray: TNumberType[] = [
            { number: 1, id: '2', isChanging: false, isSorted: true },
            { number: 2, id: '3', isChanging: false, isSorted: true },
            { number: 3, id: '1', isChanging: false, isSorted: true },
        ];
        const { arrayRef, setArray, setChangingNumbers, setIsSorting } = renderComponent();

        arrayRef.current = initialArray;

        await act(async () => {
            await bubbleSort(initialArray, setArray, arrayRef, setChangingNumbers, setIsSorting, false);
        });

        expect(arrayRef.current).toEqual(expectedArray);
        expect(setArray).toHaveBeenCalledWith(expectedArray);
        expect(setIsSorting).toHaveBeenCalledWith(false);
    });

    it('сортирует массив с несколькими элементами в порядке убывания', async () => {
        const initialArray: TNumberType[] = [
            { number: 1, id: '1', isChanging: false, isSorted: false },
            { number: 3, id: '2', isChanging: false, isSorted: false },
            { number: 2, id: '3', isChanging: false, isSorted: false },
        ];
        const expectedArray: TNumberType[] = [
            { number: 3, id: '2', isChanging: false, isSorted: true },
            { number: 2, id: '3', isChanging: false, isSorted: true },
            { number: 1, id: '1', isChanging: false, isSorted: true },
        ];
        const { arrayRef, setArray, setChangingNumbers, setIsSorting } = renderComponent();

        arrayRef.current = initialArray;

        await act(async () => {
            await bubbleSort(initialArray, setArray, arrayRef, setChangingNumbers, setIsSorting, true);
        });

        expect(arrayRef.current).toEqual(expectedArray);
        expect(setArray).toHaveBeenCalledWith(expectedArray);
        expect(setIsSorting).toHaveBeenCalledWith(false);
    });
});
