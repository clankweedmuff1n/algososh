import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Queue from "./Queue";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {HEAD, TAIL} from "../../constants/element-captions";

const queueVar = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [queueItems, setQueueItems] = React.useState<Array<undefined | string>>(
      queueVar.getQueue()
  );
  const [currentIndex, setCurrentIndex] = React.useState<number | undefined>(
      undefined
  );
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
    queueVar.enqueue(input);
    setCurrentIndex(queueVar.tailIndex());
    setQueueItems([...queueVar.getQueue()]);

    await delay();

    setCurrentIndex(undefined);
    setIsAddingElement(false);
    setIsLoading(false);
  }

  async function handleDeleteButton() {
    setIsDeletingElement(true);
    setIsLoading(true);
    setCurrentIndex(queueVar.peekIndex());

    await delay();

    queueVar.dequeue();
    setQueueItems([...queueVar.getQueue()]);
    setCurrentIndex(undefined);
    setIsDeletingElement(false);
    setIsLoading(false);
  }

  async function handleClearButton() {
    setIsClearing(true);
    setIsLoading(true);
    await delay();

    queueVar.clear();
    setQueueItems([...queueVar.getQueue()]);
    setIsClearing(false);
    setIsLoading(false);
  }

  async function delay() {
    return new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
  }

  function isEmpty() {
    let isEmpty = true;
    for (let i = 0; i < queueItems.length; i++) {
      if (queueItems[i] !== undefined) {
        isEmpty = false;
        break;
      }
    }
    return isEmpty;
  }

  React.useEffect(() => {
    setQueueItems([...queueVar.getQueue()]);
  }, []);

  return (
      <SolutionLayout title="Очередь">
        <div className="mt-12 m-auto max-w-[924px] flex items-start justify-between">
          <form className="text-left flex items-start justify-between" onSubmit={handleAddButton}>
            <fieldset className="p-0 pr-3 border-none flex items-start justify-between">
              <Input
                  extraClass="m-0 mr-3 w-[377px]"
                  placeholder="Введите значение"
                  type="text"
                  isLimitText={true}
                  maxLength={4}
                  onChange={handleChange}
                  value={input}
              />
              <Button
                  data-testid="button_add"
                  text="Добавить"
                  type="submit"
                  isLoader={isAddingElement}
                  disabled={
                      isLoading ||
                      queueItems[queueItems.length - 1] !== undefined ||
                      input === ""
                  }
              />
            </fieldset>
            <Button
                data-testid="button_delete"
                extraClass="mr-20"
                onClick={handleDeleteButton}
                text="Удалить"
                type="button"
                isLoader={isDeletingElement}
                disabled={isLoading || isEmpty()}
            />
            <Button
                data-testid="button_clear"
                onClick={handleClearButton}
                text="Очистить"
                type="button"
                isLoader={isClearing}
                disabled={isLoading || isEmpty()}
            />
          </form>
        </div>

        <section className="mt-20">
          <ul className="list-none m-auto flex items-center justify-center flex-wrap">
            {queueItems.map((number, index) => {
              let state: ElementStates = ElementStates.Default;
              if (currentIndex === index)
                state = ElementStates.Changing;
              try {
                return (
                    <li className="h-[170px] mr-4 last:mr-0" key={index}>
                      <Circle
                          letter={number?.toString()}
                          state={state}
                          tail={queueVar.tailIndex() === index ? TAIL : null}
                          head={queueVar.peekIndex() === index ? HEAD : null}
                          index={index}
                      />
                    </li>
                );
              } catch {
                return (
                    <li className="h-[170px] mr-4 last:mr-0" key={index}>
                      <Circle letter="" index={index}/>
                    </li>
                );
              }
            })}
          </ul>
        </section>
      </SolutionLayout>
  );
};
