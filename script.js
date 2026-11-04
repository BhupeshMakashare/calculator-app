const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        if (value === "C") {
            currentInput = "";
            display.value = "";
        }

        else if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }

        else if (value === "=") {

            try {
                if (!/^[0-9+\-*/%.()\s]+$/.test(currentInput)) {
                    throw new Error("Invalid input");
                }

                const result = Function(
                    '"use strict"; return (' + currentInput + ')'
                )();

                if (!Number.isFinite(result)) {
                    throw new Error("Invalid calculation");
                }

                display.value = result;
                currentInput = String(result);

            } catch {
                display.value = "Error";
                currentInput = "";
            }

        }

        else {
            currentInput += value;
            display.value = currentInput;
        }

    });

});