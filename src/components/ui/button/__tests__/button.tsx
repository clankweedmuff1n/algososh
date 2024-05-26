import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';
import { Direction } from '../../../../types/direction';

describe('Компонент Button', () => {
    it('рендерит кнопку с текстом', () => {
        const { asFragment } = render(<Button text="Нажми меня" />);
        expect(screen.getByText('Нажми меня')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('рендерит кнопку без текста', () => {
        const { asFragment } = render(<Button />);
        expect(screen.queryByText('Нажми меня')).not.toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('рендерит заблокированную кнопку', () => {
        const { asFragment } = render(<Button text="Нажми меня" disabled={true} />);
        expect(screen.getByRole('button')).toBeDisabled();
        expect(asFragment()).toMatchSnapshot();
    });

    it('рендерит кнопку с индикацией загрузки', () => {
        const { asFragment } = render(<Button isLoader />);
        expect(screen.getByAltText('Загрузка.')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('вызывает колбек при клике на кнопку', () => {
        const handleClick = jest.fn();
        render(<Button text="Нажми меня" onClick={handleClick} />);
        fireEvent.click(screen.getByText('Нажми меня'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('рендерит кнопку с иконкой восходящей сортировки', () => {
        const { asFragment } = render(<Button text="Сортировать" sorting={Direction.Ascending} />);
        expect(screen.getByText('Сортировать')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('рендерит кнопку с иконкой нисходящей сортировки', () => {
        const { asFragment } = render(<Button text="Сортировать" sorting={Direction.Descending} />);
        expect(screen.getByText('Сортировать')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});
