describe('Проверка корректности работы страницы с списком', () => {
    const inputValue = 'input[name="value"]';
    const inputIndex = 'input[name="index"]';
    const buttonAddToHead = '[data-testid="button_add_to_head"]';
    const buttonAddToTail = '[data-testid="button_add_to_tail"]';
    const buttonAddByIndex = '[data-testid="button_add_by_index"]';
    const buttonDeleteByIndex = '[data-testid="button_delete_by_index"]';
    const buttonDeleteFromHead = '[data-testid="button_delete_from_head"]';
    const buttonDeleteFromTail = '[data-testid="button_delete_from_tail"]';
    const circle = '[data-testid="circle"]';
    const defaultItems = ["85", "0", "10", "34", "8", "1"];

    beforeEach(() => {
        cy.visit('/list');
    });

    it('если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже', () => {
        cy.get(inputValue).clear();
        cy.get(inputIndex).clear();
        cy.get(buttonAddToHead).should('be.disabled');
        cy.get(buttonAddToTail).should('be.disabled');
        cy.get(buttonAddByIndex).should('be.disabled');
        cy.get(buttonDeleteByIndex).should('be.disabled');
    });

    it('корректность отрисовки дефолтного списка', () => {
        cy.get(circle).each((circle, index) => {
            cy.wrap(circle).contains(defaultItems[index]);
        });
    });

    it('корректность добавления элемента в head', () => {
        cy.get(inputValue).type('99');
        cy.get(buttonAddToHead).click();

        cy.get(circle).first().should('have.text', '99');
    });

    it('корректность добавления элемента в tail', () => {
        cy.get(inputValue).type('77');
        cy.get(buttonAddToTail).click();

        cy.get(circle).last().should('have.text', '77');
    });

    it('корректность добавления элемента по индексу', () => {
        cy.get(inputValue).type('66');
        cy.get(inputIndex).type('2');
        cy.get(buttonAddByIndex).click();

        cy.get(circle).eq(2).should('have.text', '66');
    });

    it('корректность удаления элемента из head', () => {
        cy.get(buttonDeleteFromHead).click();

        cy.get(circle).first().should('not.have.text', defaultItems[0]);
    });

    it('корректность удаления элемента из tail', () => {
        cy.get(buttonDeleteFromTail).click();

        cy.get(circle).last().should('not.have.text', defaultItems[defaultItems.length - 1]);
    });

    it('корректность удаления элемента по индексу', () => {
        cy.get(inputIndex).type('2');
        cy.get(buttonDeleteByIndex).click();

        cy.get(circle).eq(2).should('not.have.text', defaultItems[2]);
    });
});
