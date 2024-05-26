describe('Тесты для страницы очереди', () => {
    const inputSelector = 'input';
    const buttonAdd = '[data-testid="button_add"]';
    const buttonDelete = '[data-testid="button_delete"]';
    const buttonClear = '[data-testid="button_clear"]';
    const circleSelector = '[data-testid="circle"]';
    const shortDelay = 500;

    beforeEach(() => {
        cy.visit('/queue');
    });

    it('должен отключить кнопку добавления, если инпут пустой', () => {
        cy.get(inputSelector).clear();
        cy.get(buttonAdd).should('be.disabled');
    });

    it('должен правильно добавлять элемент в очередь', () => {
        cy.get(inputSelector).type('A');
        cy.get(buttonAdd).click();
        cy.get(circleSelector).first().should('contain', 'A');
        cy.get(circleSelector).first().parent().should('contain', 'head');
        cy.get(circleSelector).first().parent().should('contain', 'tail');
    });

    it('должен правильно удалять элемент из очереди', () => {
        cy.get(inputSelector).type('A');
        cy.get(buttonAdd).click();
        cy.get(buttonDelete).click();
        cy.get(circleSelector).should('not.contain', 'A');
    });

    it('должен корректно очищать очередь', () => {
        cy.get(inputSelector).type('A');
        cy.get(buttonAdd).click();
        cy.get(inputSelector).type('B');
        cy.get(buttonAdd).click();
        cy.get(buttonClear).click();

        cy.wait(shortDelay);

        cy.get(circleSelector).each(circle => {
            cy.wrap(circle).should('have.text', '');
        });
    });
});
