const individual = (key, discipline, competition, result_score, athlete, club = null) => ({
	key, scope: 'national', category: 'women', format: 'outdoor', discipline, competition, result_score,
	participants: [{ athlete, club, position: 1 }],
});
const team = (key, discipline, competition, result_score, athletes, club = null, leg_scores = null) => ({
	key, scope: 'national', category: 'women', format: 'indoor', discipline, competition, result_score,
	participants: athletes.map((athlete, index) => ({ athlete, club, position: index + 1, leg_scores: leg_scores?.[index] ?? null })),
});

export default [
	individual('r_national_women50_m1_2012_1316', 'individual_fita_1440_m1', 'golden_autumn_2012', 1316, 'leshchenko_liudmyla', 'ukraine_kdyush'),
	individual('r_national_women50_70m_2012_323', 'individual_70m', 'golden_autumn_2012', 323, 'leshchenko_liudmyla', 'ukraine_kdyush'),
	individual('r_national_women50_60m_2012_324', 'individual_60m', 'golden_autumn_2012', 324, 'leshchenko_liudmyla', 'ukraine_kdyush'),
	individual('r_national_women50_50m_2012_326', 'individual_50m', 'kokota_cup_2012', 326, 'leshchenko_liudmyla', 'ukraine_kdyush'),
	individual('r_national_women50_30m_2012_346', 'individual_30m', 'kokota_cup_2012', 346, 'leshchenko_liudmyla', 'ukraine_kdyush'),
	team('r_national_women_finals_18m_2019_232', 'finals_18m_24', 'ukraine_champ_2019', 232, ['hrabik_oleksandra', 'kovtun_anna', 'shkliar_kseniia'], 'ukraine_kyiv'),
	team('r_national_women_m3x2_2017_1717', 'team_elim_m3x2', 'ukraine_cup_2017', 1717, ['diakova_viktoriia', 'hrabik_oleksandra', 'shkliar_kseniia'], 'ukraine_kyiv', ['290,289', '273,289', '284,292']),
	team('r_national_women_finals_18m_2024_233', 'finals_18m_24', 'ukraine_champ_2024', 233, ['kardash_viktoriia', 'stepura_yuliia', 'shkliar_kseniia'], 'ukraine_kyiv'),
	team('r_national_women_m3x2_2024_1728', 'team_elim_m3x2', 'ukraine_champ_2024', 1728, ['kardash_viktoriia', 'stepura_yuliia', 'shkliar_kseniia'], 'ukraine_kyiv', ['285,287', '291,288', '288,289']),
];
