const SHORT_DELAY_IN_MS = 1500;
const inputSelector = 'input';
const submitButton = 'button[type="submit"]';
const circleLiSelector = '[data-testid="circle_li"]';
const circleSelector = '[data-testid="circle"]';
const deleteButton = 'button:contains("Удалить")';
const clearButton = 'button:contains("Очистить")';

describe('Проверка корректности работы страницы с стеком', () => {
    beforeEach(() => {
        cy.visit('/stack');
    });

    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get(inputSelector).clear();
        cy.get(submitButton).should('be.disabled');
    });

    it('Проверка правильности добавления элемента в стек', () => {
        cy.get(inputSelector).type('A');
        cy.get(submitButton).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleLiSelector).first().within(() => {
            cy.get('p').contains('top').should('exist');
            cy.get(circleSelector).should('have.text', 'A');
        });
    });

    it('Проверка правильности удаления элемента из стека', () => {
        cy.get(inputSelector).type('B');
        cy.get(submitButton).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(deleteButton).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleSelector).should('not.exist');
    });

    it('Проверка поведения кнопки «Очистить»', () => {
        cy.get(inputSelector).type('C');
        cy.get(submitButton).click();
        cy.get(inputSelector).type('D');
        cy.get(submitButton).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(clearButton).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleSelector).should('not.exist');
    });
});
