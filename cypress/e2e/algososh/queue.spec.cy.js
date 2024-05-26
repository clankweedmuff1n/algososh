describe('Тесты для страницы очереди', () => {
    beforeEach(() => {
        cy.visit('/queue');
    });

    it('должен отключить кнопку добавления, если инпут пустой', () => {
        cy.get('input').clear();
        cy.get('[data-testid="button_add"]').should('be.disabled');
    });

    it('должен правильно добавлять элемент в очередь', () => {
        cy.get('input').type('A');
        cy.get('[data-testid="button_add"]').click();
        cy.get('[data-testid="circle"]').first().should('contain', 'A');
        cy.get('[data-testid="circle"]').first().parent().should('contain', 'head');
        cy.get('[data-testid="circle"]').first().parent().should('contain', 'tail');
    });

    it('должен правильно удалять элемент из очереди', () => {
        cy.get('input').type('A');
        cy.get('[data-testid="button_add"]').click();
        cy.get('[data-testid="button_delete"]').click();
        cy.get('[data-testid="circle"]').should('not.contain', 'A');
    });

    it('должен корректно очищать очередь', () => {
        cy.get('input').type('A');
        cy.get('[data-testid="button_add"]').click();
        cy.get('input').type('B');
        cy.get('[data-testid="button_add"]').click();
        cy.get('[data-testid="button_clear"]').click();

        cy.wait(500);

        cy.get('[data-testid="circle"]').each(circle => {
            cy.wrap(circle).should('have.text', '');
        });
    });
});
