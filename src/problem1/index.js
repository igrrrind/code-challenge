//Time O(n) Space O(log n) - divide-and-conquer logic
var sum_to_n_a = function(n) {
     if (n <= 0) return 0;

    let stack = [[1, n]];
    let total = 0;

    while (stack.length) {
        const [start, end] = stack.pop();

        if (end - start <= 10) {
            for (let i = start; i <= end; i++) {
                total += i;
            }
            continue;
        }

        const mid = Math.floor((start + end) / 2);
        stack.push([start, mid]);
        stack.push([mid + 1, end]);
    }

    return total;
};

//Time O(n) Space O(n) - memory-intensive for large n
var sum_to_n_b = function(n) {
    if (n <= 0) return 0;

    const numbers = [...Array(n).keys()].map(i => i + 1);
    return numbers.reduce((total, num) => total + num, 0); //reducing array by iterating to single sum value
};

//Time O(1) Space O(1) - best solution
var sum_to_n_c = function(n) {
    if (n <= 0) return 0;

    return (n * (n + 1)) / 2;
};



// Test runner 
function runTests(fn, name) {
    const tests = [
        { input: 1, expected: 1 },
        { input: 5, expected: 15 },
        { input: 17, expected: 153 },
        { input: 100, expected: 5050 },
        { input: 0, expected: 0 },
    ];

    console.log(`\nTesting ${name}`);

    tests.forEach(({ input, expected }) => {
        try {
            const result = fn(input);
            const pass = result === expected;
            console.log(
                `n=${input} | expected=${expected} | got=${result} | ${pass ? "PASS" : "FAIL"}`
            );
        } catch (err) {
            console.log(`n=${input} | ERROR: ${err.message}`);
        }
    });
}


// ===== Execute tests =====
runTests(sum_to_n_a, "Loop: sum_to_n_a");
runTests(sum_to_n_b, "Functional: sum_to_n_b");
runTests(sum_to_n_c, "Formula: sum_to_n_c");