import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";
import { RadioInput } from "../ui/radio-input/radio-input";
import {bubbleSort, TNumberType} from "../../algorithms/bubbleSort/bubbleSort";

function randomArray() {
  const length = Math.floor(Math.random() * (17 - 3 + 1) + 3);
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (100 + 1)));
  }

  return arr;
}

export const SortingPage: React.FC = () => {
  const [isFirstChecked, setIsFirstChecked] = React.useState<boolean>(true);
  const [isSecondChecked, setIsSecondChecked] = React.useState<boolean>(false);
  const [array, setArray] = React.useState<Array<TNumberType>>([]);
  const arrayRef = React.useRef<Array<TNumberType>>([]);
  const [isSorting, setIsSorting] = React.useState<boolean>(false);
  const [changingNumbers, setChangingNumbers] = React.useState<Array<string>>(
      []
  );
  const [isDescending, setIsDescending] = React.useState<boolean>(false);
  const [isCreatingArrat, setIsCreatingArrat] = React.useState<boolean>(false);

  const handleRadios = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "1":
        setIsFirstChecked(true);
        setIsSecondChecked(false);
        break;
      case "2":
        setIsSecondChecked(true);
        setIsFirstChecked(false);
        break;
      default:
        break;
    }
  };

  const selectionSort = React.useCallback(async () => {
    const newArray = [...arrayRef.current];
    const n = newArray.length;

    for (
        let currentElementIndex = 0;
        currentElementIndex < n - 1;
        currentElementIndex++
    ) {
      let indexToCompare = currentElementIndex;

      for (let i = currentElementIndex + 1; i < n; i++) {
        setChangingNumbers([newArray[currentElementIndex].id, newArray[i].id]);
        await delay();

        if (isDescending) {
          if (newArray[i].number > newArray[indexToCompare].number) {
            indexToCompare = i;
          }
        } else {
          if (newArray[i].number < newArray[indexToCompare].number) {
            indexToCompare = i;
          }
        }
      }

      setChangingNumbers([]);
      newArray[indexToCompare].isSorted = true;

      if (indexToCompare !== currentElementIndex) {
        const temp = newArray[indexToCompare];
        newArray[indexToCompare] = newArray[currentElementIndex];
        newArray[currentElementIndex] = temp;
        arrayRef.current = [...newArray];
        setArray([...newArray]);
      }
    }

    for (let i = 0; i < arrayRef.current.length; i++) {
      if (!arrayRef.current[i].isSorted) arrayRef.current[i].isSorted = true;
    }

    setArray([...arrayRef.current]);

    setIsSorting(false);
  }, [isDescending]);

  const handleNewArrayButton = () => {
    setIsCreatingArrat(true);
    const tempNumbersArray: Array<number> = randomArray();
    const tempObjectsArray: Array<TNumberType> = [];
    for (let i: number = 0; i < tempNumbersArray.length; i++) {
      tempObjectsArray.push({
        number: tempNumbersArray[i],
        id: uuidv4(),
        isChanging: false,
        isSorted: false,
      });
    }
    arrayRef.current = [...tempObjectsArray];
    setArray([...tempObjectsArray]);
    setIsCreatingArrat(false);
  };

  const handleAscendingClick = () => {
    for (let i = 0; i < arrayRef.current.length; i++) {
      arrayRef.current[i].isSorted = false;
    }

    setArray([...arrayRef.current]);
    setIsDescending(false);
    setIsSorting(true);
  };

  const handleDescendingClick = () => {
    for (let i = 0; i < arrayRef.current.length; i++) {
      arrayRef.current[i].isSorted = false;
    }

    setArray([...arrayRef.current]);
    setIsDescending(true);
    setIsSorting(true);
  };

  React.useEffect(() => {
    if (isSorting) {
      if (isFirstChecked) {
        selectionSort();
      } else if (isSecondChecked) {
        bubbleSort(
            array,
            setArray,
            arrayRef,
            setChangingNumbers,
            setIsSorting,
            isDescending
        );
      }
    }
  }, [isSorting, isFirstChecked, isSecondChecked, bubbleSort, selectionSort]);

  React.useEffect(() => {
    handleNewArrayButton();
  }, []);

  async function delay() {
    return new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
  }

  return (
      <SolutionLayout title="Сортировка массива">
        <div className="mt-12 m-auto max-w-[924px] flex items-center justify-between">
          <div className="flex items-center mr-20">
            <div className="mr-[52px] grid grid-cols-sorting gap-x-10">
              <RadioInput
                  label="Выбор"
                  checked={isFirstChecked}
                  onChange={handleRadios}
                  name="1"
                  disabled={isSorting}
              />
              <RadioInput
                  label="Пузырек"
                  checked={isSecondChecked}
                  onChange={handleRadios}
                  name="2"
                  disabled={isSorting}
              />
            </div>

            <div className="grid gap-x-3 grid-cols-sorting">
              <Button
                  onClick={handleAscendingClick}
                  text="По возрастанию"
                  sorting={Direction.Ascending}
                  type="button"
                  isLoader={isSorting && !isDescending}
                  disabled={isSorting}
              />
              <Button
                  onClick={handleDescendingClick}
                  text="По убыванию"
                  sorting={Direction.Descending}
                  type="button"
                  isLoader={isSorting && isDescending}
                  disabled={isSorting}
              />
            </div>
          </div>

          <Button
              onClick={handleNewArrayButton}
              text="Новый массив"
              type="button"
              isLoader={isCreatingArrat}
              disabled={isSorting || isCreatingArrat}
          />
        </div>

        <section className="mt-12 m-auto">
          <ul className="h-[392px] p-0 flex items-end justify-center list-none">
            {array.map((obj, index) => {
              return (
                  <li key={index} className="last:mr-0 mr-[10px]">
                    <div
                        className={`w-[50px] bg-[var(--default-color)] ${
                            changingNumbers.includes(obj.id) &&
                            "bg-[var(--changing-color)]"
                        } ${obj.isSorted && 'bg-[var(--modified-color)]'}`}
                        style={{ height: `${(obj.number * 340) / 100}px` }}
                    />
                    <p>{obj.number}</p>
                  </li>
              );
            })}
          </ul>
        </section>
      </SolutionLayout>
  );
};
