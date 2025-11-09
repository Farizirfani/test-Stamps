import axios from "axios";

const API_KEY = process.env.APIKEY || "97b280b340f4170a19e43f373831e1f6";
const CITY = "Jakarta,ID";

const fmtDate = (iso) =>
	new Date(iso).toLocaleDateString("en-GB", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

const fetchForecast = async () => {
	const url = "https://api.openweathermap.org/data/2.5/forecast";
	const { data } = await axios.get(url, {
		params: { q: CITY, units: "metric", appid: API_KEY },
	});

	const byDate = new Map();
	data.list.forEach((it) => {
		const date = it.dt_txt.split(" ")[0];
		if (!byDate.has(date)) byDate.set(date, []);
		byDate.get(date).push(it);
	});

	const days = Array.from(byDate.keys()).slice(0, 5);
	return days.map((date) => {
		const entries = byDate.get(date);
		const noon = entries.find((e) => e.dt_txt.endsWith("12:00:00"));
		const temp = noon
			? noon.main.temp
			: entries.reduce((s, e) => s + e.main.temp, 0) / entries.length;
		return { date, temp: temp.toFixed(2) };
	});
};

const run = async () => {
	try {
		const daily = await fetchForecast();
		console.log("Weather Forecast:");
		daily.forEach(({ date, temp }) => {
			console.log(`${fmtDate(date)}: ${temp}°C`);
		});
	} catch (err) {
		console.error("Failed to fetch forecast:", err?.response?.status || err.message);
	}
};

run();
