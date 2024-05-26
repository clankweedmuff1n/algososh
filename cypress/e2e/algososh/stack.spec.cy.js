const SHORT_DELAY_IN_MS = 1500;

describe('Проверка корректности работы страницы с стеком', () => {
    beforeEach(() => {
        cy.visit('/stack');
    });

    it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear();
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('Проверка правильности добавления элемента в стек', () => {
        cy.get('input').type('A');
        cy.get('button[type="submit"]').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="circle_li"]').first().within(() => {
            cy.get('p').contains('top').should('exist');
            cy.get('[data-testid="circle"]').should('have.text', 'A');
        });
    });

    it('Проверка правильности удаления элемента из стека', () => {
        cy.get('input').type('B');
        cy.get('button[type="submit"]').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('button').contains('Удалить').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="circle"]').should('not.exist');
    });

    it('Проверка поведения кнопки «Очистить»', () => {
        cy.get('input').type('C');
        cy.get('button[type="submit"]').click();
        cy.get('input').type('D');
        cy.get('button[type="submit"]').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('button').contains('Очистить').click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get('[data-testid="circle"]').should('not.exist');
    });
});
