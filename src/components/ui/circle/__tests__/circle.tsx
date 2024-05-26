import React from 'react';
import { render } from '@testing-library/react';
import { Circle } from '../circle';
import {ElementStates} from "../../../../types/element-states";

describe('Тестирование компонента Circle', () => {
    test('Отрисовка без буквы', () => {
        const { container } = render(<Circle />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с буквами', () => {
        const { container } = render(<Circle letter="A" />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с head', () => {
        const { container } = render(<Circle head="Head" />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с react-элементом в head', () => {
        const { container } = render(<Circle head={<span>Head</span>} />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с tail', () => {
        const { container } = render(<Circle tail="Tail" />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с react-элементом в tail', () => {
        const { container } = render(<Circle tail={<span>Tail</span>} />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с index', () => {
        const { container } = render(<Circle index={1} />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка с пропом isSmall === true', () => {
        const { container } = render(<Circle isSmall />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка в состоянии default', () => {
        const { container } = render(<Circle state={ElementStates.Default} />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка в состоянии changing', () => {
        const { container } = render(<Circle state={ElementStates.Changing} />);
        expect(container).toMatchSnapshot();
    });

    test('Отрисовка в состоянии modified', () => {
        const { container } = render(<Circle state={ElementStates.Modified} />);
        expect(container).toMatchSnapshot();
    });
});
