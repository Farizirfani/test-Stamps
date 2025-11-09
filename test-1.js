const isPrime = (n) => {
	if (n < 2) return false;
	if (n % 2 === 0) return n === 2;
	if (n % 3 === 0) return n === 3;
	for (let i = 5; i * i <= n; i += 6) {
		if (n % i === 0 || n % (i + 2) === 0) return false;
	}
	return true;
};

const number = Array.from({ length: 100 }, (_, i) => i + 1).reverse();

const output = number
	.filter((x) => !isPrime(x))
	.map((x) => {
		let s = "";
		if (x % 3 === 0) s += "Foo";
		if (x % 5 === 0) s += "Bar";
		return s || String(x);
	})
	.join(", ");

console.log(output);
