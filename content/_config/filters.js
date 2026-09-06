import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("filterByLang", function (collection, lang) {
    	return collection.filter(item => item.data.page?.lang === lang);
  	});

	eleventyConfig.addFilter("recordsFor", function (collection, category, format, team) {
		const selected = (collection || []).filter(record =>
			record.category === category &&
			record.format === format &&
			(team === undefined || (team ? record.team_size > 1 : record.team_size === 1))
		);
		const grouped = new Map();
		for (const record of selected) {
			const key = `${record.scope}:${record.discipline_key}:${record.variant_key || ""}`;
			const records = grouped.get(key) || [];
			records.push(record);
			grouped.set(key, records);
		}
		return [...grouped.values()].map(records => {
			const [current, ...previousRecords] = records.sort((a, b) => b.result_score - a.result_score);
			return { ...current, previousRecords };
		});
	});

	eleventyConfig.addFilter("recordsForScope", function (collection, scope) {
		return (collection || []).filter(record => record.scope === scope);
	});

	eleventyConfig.addFilter("recordGroups", function (collection) {
		return [...new Set((collection || []).map(record => record.variant_key || ""))];
	});

	eleventyConfig.addFilter("recordsForGroup", function (collection, group) {
		return (collection || []).filter(record => (record.variant_key || "") === group);
	});

	eleventyConfig.addFilter("footnoteMarker", function (collection, group) {
		if (!group) return "";
		const groups = [...new Set((collection || [])
			.map(record => record.variant_key)
			.filter(Boolean))];
		const position = groups.indexOf(group) + 1;
		return position > 0 ? "*".repeat(position) : "";
	});

	eleventyConfig.addFilter("clubNames", function (participants, locale) {
		const names = (participants || []).map(participant => {
			if (locale === "en") return participant.club_name_en || participant.club_name;
			if (locale === "pl") return participant.club_name_pl || participant.club_name;
			return participant.club_name;
		}).filter(Boolean);
		return [...new Set(names)];
	});

};
