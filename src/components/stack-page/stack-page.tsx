import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Stack from "./stack";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";

const stackVar = new Stack<string>();

export const StackPage: React.FC = () => {
    const [input, setInput] = React.useState<string>("");
    const [stackItems, setStackItems] = React.useState<string[]>(
        stackVar.getStack()
    );
    const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
    const [isAddingElement, setIsAddingElement] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isDeletingElement, setIsDeletingElement] =
        React.useState<boolean>(false);
    const [isClearing, setIsClearing] = React.useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    async function handleAddButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsAddingElement(true);
        setIsLoading(true);
        stackVar.push(input);
        setCurrentIndex(stackVar.getSize() - 1);
        setStackItems([...stackVar.getStack()]);

        await delay();

        setIsLoading(false);
        setCurrentIndex(null);
        setIsAddingElement(false);
    }

    async function handleDeleteButton() {
        setIsDeletingElement(true);
        setIsLoading(true);
        setCurrentIndex(stackVar.getSize() - 1);

        await delay();

        stackVar.pop();
        setStackItems([...stackVar.getStack()]);
        setCurrentIndex(null);
        setIsLoading(false);
        setIsDeletingElement(false);
    }

    async function handleClearButton() {
        setIsClearing(true);
        setIsLoading(true);
        stackVar.clear();

        await delay();

        setStackItems([...stackVar.getStack()]);
        setIsClearing(false);
        setIsLoading(false);
    }

    async function delay() {
        return new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    }

    return (
        <SolutionLayout title="Стек">
            <div className="mt-12 m-auto max-w-[924px] flex items-start justify-between">
                <form className="text-left flex items-start justify-between" onSubmit={handleAddButton}>
                    <fieldset className="p-0 m-0 mr-3 border-none flex items-start justify-between">
                        <Input
                            extraClass="m-0 mr-3 w-[377px]"
                            placeholder="Введите текст"
                            type="text"
                            isLimitText={true}
                            maxLength={4}
                            onChange={handleChange}
                            value={input}
                        />
                        <Button
                            text="Добавить"
                            type="submit"
                            isLoader={isAddingElement}
                            disabled={isLoading || stackItems.length === 8 || input === ""}
                        />
                    </fieldset>
                    <Button
                        extraClass="mr-20"
                        onClick={handleDeleteButton}
                        text="Удалить"
                        type="button"
                        isLoader={isDeletingElement}
                        disabled={isLoading || stackItems.length === 0}
                    />
                    <Button
                        onClick={handleClearButton}
                        text="Очистить"
                        type="button"
                        isLoader={isClearing}
                        disabled={isLoading || stackItems.length === 0}
                    />
                </form>
            </div>

            <section className="mt-12 m-auto">
                <ul className="list-none m-auto flex items-center justify-center flex-wrap">
                    {stackItems.map((number, index) => {
                        let state: ElementStates = ElementStates.Default;

                        if (currentIndex === index)
                            state = ElementStates.Changing;

                        return (
                            <li
                                data-testid="circle_li"
                                className="last:mr-0 mr-4 flex flex-col items-center justify-end h-[140px]"
                                key={index}
                            >
                                <p className="m-0 my-2 text-center">
                                    {index === stackVar.getSize() - 1 ? "top" : ""}
                                </p>
                                <Circle
                                    letter={number.toString()}
                                    state={state}
                                    index={index}
                                />
                            </li>
                        );
                    })}
                </ul>
            </section>
        </SolutionLayout>
    );
};
