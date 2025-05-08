// This is a simple test framework for testing the micro library
// It is not a complete test framework, but it is enough to test the micro library
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';
export function test(name, fn) {
    try {
        fn();
        console.log(green, `Test passed: ${name}`, reset);
    }
    catch (e) {
        console.error(red, `Test failed: ${name}`, reset);
        console.error(e);
    }
    finally {
    }
}
export function expect(value) {
    return {
        toBe: (expectedValue) => {
            if (value !== expectedValue) {
                throw new Error(`Expected ${value} to be ${expectedValue}`);
            }
        }
    };
}
//# sourceMappingURL=micro-tester.js.map