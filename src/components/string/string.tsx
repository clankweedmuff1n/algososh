import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import {animateStringReverse} from "../../algorithms/string/string";

type TLetterType = {
  letter: string;
  id: number;
  isSorted: boolean;
};

export const StringComponent: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [lettersArray, setLettersArray] = useState<Array<TLetterType>>([]);
  const [currentIndex, setCurrentIndex] = useState<Array<number>>([]);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  function handleReverseButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (stringInput.length > 0 && !isChanging) {
      let tempArray: Array<string> = stringInput.split("");
      let tempLettersArray: Array<TLetterType> = [];
      for (let i: number = 0; i < tempArray.length; i++) {
        tempLettersArray.push({ letter: tempArray[i], id: i, isSorted: false });
      }

      setLettersArray(tempLettersArray);
      setCurrentIndex([]);
      setIsChanging(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStringInput(e.target.value);
  }

  useEffect(() => {
    if (isChanging) {
      animateStringReverse(lettersArray, setLettersArray, setCurrentIndex, setIsChanging);
    }
  }, [isChanging, lettersArray]);

  return (
      <SolutionLayout title="Строка">
        <form className="mt-12 text-left max-w-[522px] m-auto" onSubmit={handleReverseButton}>
          <fieldset className="p-0 m-0 border-none flex justify-between">
            <Input
                extraClass="m-0 w-[377px] mr-3"
                placeholder="Введите текст"
                type="text"
                isLimitText={true}
                maxLength={11}
                onChange={handleChange}
                value={stringInput}
            />
            <Button
                text="Развернуть"
                type="submit"
                isLoader={isChanging}
                disabled={isChanging || stringInput === ""}
            />
          </fieldset>
        </form>

        <section className="max-w-[567px] mt-[120px] mx-auto mb-0">
          <ul className="max-w-[464px] list-none m-auto p-0 flex items-center justify-center">
            {lettersArray.map((letterObj: TLetterType, index: number) => {
              let state: ElementStates = ElementStates.Default;
              if (currentIndex.includes(index)) state = ElementStates.Changing;
              if (letterObj.isSorted) state = ElementStates.Modified;

              return (
                  <li data-testid="circle_li" className="last:mr-0 mr-4" key={letterObj.id}>
                    <Circle state={state} letter={letterObj.letter} />
                  </li>
              );
            })}
          </ul>
        </section>
      </SolutionLayout>
  );
};
