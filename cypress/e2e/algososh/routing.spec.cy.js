describe("Корректная работа переходов по страницам", function () {
    it("Доступность страницы Строка", function () {
        cy.visit(`/recursion`);
    });

    it("Доступность страницы Последовательность Фибоначчи", function () {
        cy.visit(`/fibonacci`);
    });

    it("Доступность страницы Сортировка массива", function () {
        cy.visit(`/sorting`);
    });

    it("Доступность страницы Стек", function () {
        cy.visit(`/stack`);
    });

    it("Доступность страницы Очередь", function () {
        cy.visit(`/queue`);
    });

    it("Доступность страницы Связный список", function () {
        cy.visit(`/list`);
    });
});