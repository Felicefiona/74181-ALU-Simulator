
// ======================================
// 4-BIT ALU SIMULATOR - IC 74181
// Active-high data configuration
// ======================================

const calculateButton =
    document.getElementById("calculateButton");

const MASK = 15;

// Operation descriptions
const logicNames = [
    "NOT A",
    "NOT (A OR B)",
    "NOT A AND B",
    "ZERO",
    "NOT (A AND B)",
    "NOT B",
    "A XOR B",
    "A AND NOT B",
    "NOT A OR B",
    "NOT (A XOR B)",
    "B",
    "A AND B",
    "ALL ONES",
    "A OR NOT B",
    "A OR B",
    "A"
];

const arithmeticNames = [
    "A",
    "A + B",
    "A + NOT B",
    "MINUS ONE / ZERO",
    "A + A AND NOT B",
    "(A OR B) + (A AND NOT B)",
    "A - B",
    "A AND NOT B",
    "A + A AND B",
    "A + B",
    "(A OR NOT B) + (A AND B)",
    "A AND B",
    "A + A",
    "(A OR B) + A",
    "(A OR NOT B) + A",
    "A - 1 / A"
];

// Execute ALU operation
calculateButton.addEventListener("click", function () {

    // Read inputs
    const inputA =
        document.getElementById("inputA").value.trim();

    const inputB =
        document.getElementById("inputB").value.trim();

    const mode =
        document.getElementById("mode").value;

    const functionCode =
        document.getElementById("function").value;

    const carryControl =
        Number(document.getElementById("carryIn").value);

    // Validate binary inputs
    if (!/^[01]{4}$/.test(inputA) ||
        !/^[01]{4}$/.test(inputB)) {

        alert("Enter exactly 4 binary digits for A and B.");
        return;
    }

    // Convert binary to decimal
    const A = parseInt(inputA, 2);
    const B = parseInt(inputB, 2);

    // Calculate complements
    const notA = (~A) & MASK;
    const notB = (~B) & MASK;

    // Carry control:
    // Cn = 0 means carry enabled
    // Cn = 1 means no carry
    const withCarry = (carryControl === 0);
    const extra = withCarry ? 1 : 0;

    let result = 0;
    let operationName = "";

    // ======================================
    // LOGIC MODE (M = 1)
    // ======================================

    if (mode === "1") {

        operationName = logicNames[
            parseInt(functionCode, 2)
        ];

        switch (functionCode) {

            case "0000":
                result = notA;
                break;

            case "0001":
                result = ~(A | B);
                break;

            case "0010":
                result = notA & B;
                break;

            case "0011":
                result = 0;
                break;

            case "0100":
                result = ~(A & B);
                break;

            case "0101":
                result = notB;
                break;

            case "0110":
                result = A ^ B;
                break;

            case "0111":
                result = A & notB;
                break;

            case "1000":
                result = notA | B;
                break;

            case "1001":
                result = ~(A ^ B);
                break;

            case "1010":
                result = B;
                break;

            case "1011":
                result = A & B;
                break;

            case "1100":
                result = MASK;
                break;

            case "1101":
                result = A | notB;
                break;

            case "1110":
                result = A | B;
                break;

            case "1111":
                result = A;
                break;
        }
    }

    // ======================================
    // ARITHMETIC MODE (M = 0)
    // ======================================

    else {

        operationName = arithmeticNames[
            parseInt(functionCode, 2)
        ];

        switch (functionCode) {

            case "0000":
                result = A + extra;
                break;

            case "0001":
                result = A + B + extra;
                break;

            case "0010":
                result = A + notB + extra;
                break;

            case "0011":
                result = withCarry ? 0 : -1;
                break;

            case "0100":
                result = A + (A & notB) + extra;
                break;

            case "0101":
                result = (A | B) + (A & notB) + extra;
                break;

            case "0110":
                result = withCarry
                    ? A - B
                    : A - B - 1;
                break;

            case "0111":
                result = A & notB;
                break;

            case "1000":
                result = A + (A & B) + extra;
                break;

            case "1001":
                result = A + B + extra;
                break;

            case "1010":
                result = (A | notB) + (A & B) + extra;
                break;

            case "1011":
                result = withCarry
                    ? (A & B)
                    : (A & B) - 1;
                break;

            case "1100":
                result = (2 * A) + extra;
                break;

            case "1101":
                result = (A | B) + A + extra;
                break;

            case "1110":
                result = (A | notB) + A + extra;
                break;

            case "1111":
                result = withCarry ? A : A - 1;
                break;
        }
    }

    // ======================================
    // DISPLAY 4-BIT RESULT
    // ======================================

    const finalResult = result & MASK;

    const binaryResult =
        finalResult.toString(2).padStart(4, "0");

    document.getElementById("result").textContent =
        binaryResult;

    document.getElementById("carryOut").textContent =
        "Not implemented yet";

    document.getElementById("message").textContent =
        "Operation: " + operationName +
        " | Decimal result: " + finalResult;

});
