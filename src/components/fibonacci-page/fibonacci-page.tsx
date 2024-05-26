import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import { v4 as uuidv4 } from "uuid";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

type TNumberType = {
  number: number;
  id: string;
};

export const FibonacciPage: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [numbersArray, setNumbersArray] = useState<Array<TNumberType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStringInput(e.target.value);
  }

  function handleFibonacciButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNumbersArray([]);

    const inputNumber = parseInt(stringInput, 10);

    setIsLoading(true);

    const sequence: TNumberType[] = [];
    for (let i = 0; i <= inputNumber; i++) {
      sequence.push({
        number: calculateFibonacci(i),
        id: uuidv4(),
      });
    }

    const totalDelay = SHORT_DELAY_IN_MS * sequence.length;

    sequence.forEach((item, index) => {
      setTimeout(() => {
        setNumbersArray((prevNumbers) => [...prevNumbers, item]);
      }, SHORT_DELAY_IN_MS * (index + 1));
    });

    setTimeout(() => {
      setIsLoading(false);
    }, totalDelay);
  }

  function calculateFibonacci(n: number): number {
    if (n === 0) {
      return 1;
    } else if (n === 1) {
      return 1;
    } else {
      let prev1 = 1;
      let prev2 = 1;
      let current = 0;

      for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
      }

      return current;
    }
  }

  return (
      <SolutionLayout title="Последовательность Фибоначчи">
        <form className="mt-12 m-auto text-left max-w-[522px]" onSubmit={handleFibonacciButton}>
          <fieldset className="p-0 m-0 border-none flex justify-between">
            <Input
                extraClass="m-0 mr-3"
                placeholder="Введите текст"
                type="number"
                isLimitText={true}
                min={1}
                max={19}
                onChange={handleChange}
                value={stringInput}
            />
            <Button
                text="Рассчитать"
                type="submit"
                isLoader={isLoading}
                disabled={
                    isLoading ||
                    stringInput === "" ||
                    parseInt(stringInput) > 19 ||
                    parseInt(stringInput) < 1
                }
            />
          </fieldset>
        </form>
        <section className="max-w-[1000px] mt-12 m-auto">
          <ul className="p-0 list-none m-auto grid grid-cols-fib items-center justify-center gap-y-4 gap-x-[78px]">
            {numbersArray.map((numberObj, index) => (
                <li
                    data-testid="circle_li"
                    className=""
                    key={numberObj.id}
                >
                  <Circle letter={numberObj.number.toString()} index={index}/>
                </li>
            ))}
          </ul>
        </section>
      </SolutionLayout>
  );
};
