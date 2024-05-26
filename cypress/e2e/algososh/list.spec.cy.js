describe('Проверка корректности работы страницы с списком', () => {
    beforeEach(() => {
        cy.visit('/list');
    });

    it('если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже', () => {
        cy.get('input[name="value"]').clear();
        cy.get('input[name="index"]').clear();
        cy.get('[data-testid="button_add_to_head"]').should('be.disabled');
        cy.get('[data-testid="button_add_to_tail"]').should('be.disabled');
        cy.get('[data-testid="button_add_by_index"]').should('be.disabled');
        cy.get('[data-testid="button_delete_by_index"]').should('be.disabled');
    });

    it('корректность отрисовки дефолтного списка', () => {
        const defaultItems = ["85", "0", "10", "34", "8", "1"];
        cy.get('[data-testid="circle"]').each((circle, index) => {
            cy.wrap(circle).contains(defaultItems[index]);
        });
    });

    it('корректность добавления элемента в head', () => {
        cy.get('input[name="value"]').type('99');
        cy.get('[data-testid="button_add_to_head"]').click();

        cy.get('[data-testid="circle"]').first().should('have.text', '99');
    });

    it('корректность добавления элемента в tail', () => {
        cy.get('input[name="value"]').type('77');
        cy.get('[data-testid="button_add_to_tail"]').click();

        cy.get('[data-testid="circle"]').last().should('have.text', '77');
    });

    it('корректность добавления элемента по индексу', () => {
        cy.get('input[name="value"]').type('66');
        cy.get('input[name="index"]').type('2');
        cy.get('[data-testid="button_add_by_index"]').click();

        cy.get('[data-testid="circle"]').eq(2).should('have.text', '66');
    });

    it('корректность удаления элемента из head', () => {
        cy.get('[data-testid="button_delete_from_head"]').click();

        cy.get('[data-testid="circle"]').first().should('not.have.text', '85');
    });

    it('корректность удаления элемента из tail', () => {
        cy.get('[data-testid="button_delete_from_tail"]').click();

        cy.get('[data-testid="circle"]').last().should('not.have.text', '1');
    });

    it('корректность удаления элемента по индексу', () => {
        cy.get('input[name="index"]').type('2');
        cy.get('[data-testid="button_delete_by_index"]').click();

        cy.get('[data-testid="circle"]').eq(2).should('not.have.text', '10');
    });
});
