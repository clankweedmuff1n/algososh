const SHORT_DELAY_IN_MS = 500;
const expected = [
    { id: 0, number: 1 },
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
];
const startString = "3";
const buttonSubmit = "button[type='submit']";
const circleLi = "[data-testid=circle_li]";
const circle = "[data-testid=circle]";
const textTypeCircleClass = 'p[class*="text_type_circle text_color_input circle_letter__"]';
const circleIndexClass = 'p[class*="circle_index__"]';
const borderColor = "rgb(0, 50, 255)";

describe("Проверка корректности работы страницы с последовательностью Фибоначчи", function () {
    before(function () {
        cy.visit("/fibonacci");
    });

    it("Проверка, что кнопка заблокирована", function () {
        cy.get("input").should("be.empty");
        cy.get(buttonSubmit).should("be.disabled");
    });

    it("Проверяет, что числа генерируются верно", () => {
        cy.visit("/fibonacci");

        cy.get("input").type(startString);
        cy.get(buttonSubmit).should("not.be.disabled");
        cy.get(buttonSubmit).click();
        cy.wait(SHORT_DELAY_IN_MS);

        const verifyElements = (length) => {
            cy.get(circleLi).should("have.length", length);
            cy.get(textTypeCircleClass).each(($letter, index) => {
                cy.get($letter).contains(expected[index].number);
            });
            cy.get(circleIndexClass).each(($index, index) => {
                cy.get($index).contains(expected[index].id);
            });
            cy.get(circle).each(($circle) => {
                cy.get($circle).should("have.css", "border-color", borderColor);
            });
        };

        for (let i = 1; i <= 4; i++) {
            verifyElements(i);
            if (i < 4) {
                cy.wait(SHORT_DELAY_IN_MS);
            }
        }
    });
});
