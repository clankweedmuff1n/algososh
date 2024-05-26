import { animateStringReverse } from "../string";
import { DELAY_IN_MS } from "../../../constants/delays";

jest.useFakeTimers();

type TLetterType = {
    letter: string;
    id: number;
    isSorted: boolean;
};

describe('animateStringReverse', () => {
    let lettersArray: TLetterType[];
    let setLettersArray: jest.Mock;
    let setCurrentIndex: jest.Mock;
    let setIsChanging: jest.Mock;

    beforeEach(() => {
        setLettersArray = jest.fn();
        setCurrentIndex = jest.fn();
        setIsChanging = jest.fn();
    });

    test('реверсирует строку', () => {
        lettersArray = [
            { letter: 'c', id: 1, isSorted: false },
            { letter: 'b', id: 2, isSorted: false },
            { letter: 'd', id: 3, isSorted: false },
        ];

        animateStringReverse(lettersArray, setLettersArray, setCurrentIndex, setIsChanging);

        for (let i = 0; i < lettersArray.length / 2; i++) {
            jest.advanceTimersByTime(DELAY_IN_MS);
        }

        expect(setLettersArray).toHaveBeenLastCalledWith([
            { letter: 'd', id: 3, isSorted: true },
            { letter: 'b', id: 2, isSorted: true },
            { letter: 'c', id: 1, isSorted: true },
        ]);
        expect(setIsChanging).toHaveBeenCalledWith(false);
    });

    test('реверсирует строку с нечетным количеством символов', () => {
        lettersArray = [
            { letter: 'a', id: 1, isSorted: false },
            { letter: 'b', id: 2, isSorted: false },
            { letter: 'c', id: 3, isSorted: false },
        ];

        animateStringReverse(lettersArray, setLettersArray, setCurrentIndex, setIsChanging);

        for (let i = 0; i < Math.ceil(lettersArray.length / 2); i++) {
            jest.advanceTimersByTime(DELAY_IN_MS);
        }

        expect(setLettersArray).toHaveBeenLastCalledWith([
            { letter: 'c', id: 3, isSorted: true },
            { letter: 'b', id: 2, isSorted: true },
            { letter: 'a', id: 1, isSorted: true },
        ]);
        expect(setIsChanging).toHaveBeenCalledWith(false);
    });

    test('обрабатывает один символ', () => {
        lettersArray = [
            { letter: 'a', id: 1, isSorted: false },
        ];

        animateStringReverse(lettersArray, setLettersArray, setCurrentIndex, setIsChanging);

        jest.advanceTimersByTime(DELAY_IN_MS);

        expect(setLettersArray).toHaveBeenLastCalledWith([
            { letter: 'a', id: 1, isSorted: true },
        ]);
        expect(setIsChanging).toHaveBeenCalledWith(false);
    });

    test('обрабатывает пустую строку', () => {
        lettersArray = [];

        animateStringReverse(lettersArray, setLettersArray, setCurrentIndex, setIsChanging);

        jest.advanceTimersByTime(DELAY_IN_MS);

        expect(setLettersArray).toHaveBeenLastCalledWith([]);
        expect(setIsChanging).toHaveBeenCalledWith(false);
    });
});
