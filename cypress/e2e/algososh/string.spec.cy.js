const DELAY_IN_MS = 1000;
const expectedString = "dcba";
const startString = "abcd";
const inputSelector = "input";
const submitButton = "button[type='submit']";
const circleLiSelector = "[data-testid=circle_li]";
const circleSelector = "[data-testid=circle]";
const textCircleSelector = 'p[class*="text_type_circle text_color_input circle_letter__"]';

describe("Проверка корректности работы страницы с рекурсией", function () {
    before(function () {
        cy.visit("/recursion");
    });

    it("Проверка, что кнопка заблокирована", function () {
        cy.get(inputSelector).should("be.empty");
        cy.get(submitButton).should("be.disabled");
    });

    it("Проверяет, что строка разворачивается корректно", () => {
        cy.visit("/recursion");

        cy.get(inputSelector).type(startString);
        cy.get(submitButton).should("not.be.disabled");
        cy.get(submitButton).click();

        cy.wait(DELAY_IN_MS * startString.length);

        cy.get(circleLiSelector).should("have.length", startString.length);
        cy.get(textCircleSelector).each(($circle, index) => {
            cy.get($circle).contains(expectedString[index]);
        });
    });

    it("Проверяет, что анимация работает корректно", () => {
        cy.visit("/recursion");

        cy.get(`${inputSelector}[placeholder="Введите текст"]`).type(startString);
        cy.get(submitButton).should("not.be.disabled");
        cy.get(submitButton).click();

        cy.get(circleSelector)
            .should("have.length", startString.length)
            .should("have.css", "border-color", "rgb(0, 50, 255)");
        cy.get(textCircleSelector).each(($circle, index) => {
            cy.get($circle).contains(startString[index]);
        });

        cy.wait(DELAY_IN_MS);

        const firstCycleColorsArray = [
            "rgb(210, 82, 225)",
            "rgb(0, 50, 255)",
            "rgb(0, 50, 255)",
            "rgb(210, 82, 225)",
        ];

        const firstCycleLetters = "abcd";

        cy.get(circleSelector).each(($circle, index) => {
            const expectedColor = firstCycleColorsArray[index];
            cy.get($circle).should("have.css", "border-color", expectedColor);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(textCircleSelector).each(($circle, index) => {
            cy.get($circle).contains(firstCycleLetters[index]);
        });

        const secondCycleColorsArray = [
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
        ];

        const secondCycleLetters = "dbca";

        cy.wait(DELAY_IN_MS);

        cy.get(circleSelector).each(($circle, index) => {
            const expectedColor = secondCycleColorsArray[index];
            cy.get($circle).should("have.css", "border-color", expectedColor);
        });
        cy.get(textCircleSelector).each(($circle, index) => {
            cy.get($circle).contains(secondCycleLetters[index]);
        });
        cy.wait(DELAY_IN_MS);

        const thirdCycleColorsArray = [
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
            "rgb(127, 224, 81)",
        ];
        const thirdCycleLetters = "dcba";

        cy.get(circleSelector).each(($circle, index) => {
            const expectedColor = thirdCycleColorsArray[index];
            cy.get($circle).should("have.css", "border-color", expectedColor);
        });
        cy.get(textCircleSelector).each(($circle, index) => {
            cy.get($circle).contains(thirdCycleLetters[index]);
        });
    });
});
