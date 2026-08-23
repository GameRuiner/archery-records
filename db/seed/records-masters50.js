const individual = (key, discipline, competition, result_score, athlete, club = null, variant_key = null) => ({
  key, scope: 'national', category: 'masters50', format: 'outdoor', discipline, competition, result_score, variant_key,
  participants: [{ athlete, club, position: 1 }],
});
const team = (key, scope, discipline, competition, result_score, club, athletes, leg_scores = null) => ({
  key, scope, category: 'masters50', format: 'outdoor', discipline, competition, result_score,
  participants: athletes.map((athlete, index) => ({ athlete, club, position: index + 1, leg_scores: leg_scores?.[index] ?? null })),
});

export default [
  individual('r_national_m1_2023_1360', 'individual_fita_1440_m1', 'belgium_2023', 1360, 'kushniruk_sergiy', null, 'm1_european_short_distances'),
  individual('r_national_70m_unknown_333', 'individual_70m', null, 333, 'kushniruk_sergiy', null, 'm1_european_short_distances'),
  individual('r_national_60m_unknown_338', 'individual_60m', null, 338, 'kushniruk_sergiy', null, 'm1_european_short_distances'),
  individual('r_national_50m_unknown_334', 'individual_50m', null, 334, 'kushniruk_sergiy', null, 'm1_european_short_distances'),
  individual('r_national_30m_unknown_355', 'individual_30m', null, 355, 'kushniruk_sergiy', null, 'm1_european_short_distances'),
  individual('r_national_m1_2012_1363', 'individual_fita_1440_m1', 'golden_autumn_2012', 1363, 'turunin_petro', 'dynamo_odeska', 'm1_ukraine_standard_distances'),
  individual('r_national_90m_2012_320', 'individual_90m', 'golden_autumn_2012', 320, 'turunin_petro', 'dynamo_odeska', 'm1_ukraine_standard_distances'),
  individual('r_national_70m_2012_342', 'individual_70m', 'golden_autumn_2012', 342, 'turunin_petro', 'dynamo_odeska', 'm1_ukraine_standard_distances'),
  individual('r_national_50m_2012_343', 'individual_50m', 'kokota_cup_2012', 343, 'turunin_petro', 'dynamo_odeska', 'm1_ukraine_standard_distances'),
  individual('r_national_30m_2012_358', 'individual_30m', 'golden_autumn_2012', 358, 'turunin_petro', 'dynamo_odeska', 'm1_ukraine_standard_distances'),
  team('r_regional_50m_elim_2023_2010', 'regional', 'team_elim_50m', 'kokota_cup_2023', 2010, 'dynamo', ['golovko_vadym', 'doroshenko_yuriy', 'sokolov_oleksandr'], ['340,340', '338,331', '336,325']),
  team('r_regional_50m_match_2023_222', 'regional', 'team_match_50m_24', 'kokota_cup_2023', 222, 'dynamo', ['golovko_vadym', 'doroshenko_yuriy', 'sokolov_oleksandr']),
  team('r_national_50m_elim_2023_2010', 'national', 'team_elim_50m', 'kokota_cup_2023', 2010, 'dynamo_kharkiv', ['golovko_vadym', 'doroshenko_yuriy', 'sokolov_oleksandr'], ['340,340', '338,331', '336,325']),
  team('r_national_50m_match_2023_222', 'national', 'team_match_50m_24', 'kokota_cup_2023', 222, 'dynamo_kharkiv', ['golovko_vadym', 'doroshenko_yuriy', 'sokolov_oleksandr']),
  team('r_world_50m_elim_2022_1981', 'world', 'team_elim_50m', 'germany_2022', 1981, 'lithuania', ['sigauskas_vladas', 'bileisis_ren', 'baranauskas_rolandas']),
  team('r_world_50m_match_2022_224', 'world', 'team_match_50m_24', 'germany_2022', 224, 'lithuania', ['sigauskas_vladas', 'bileisis_ren', 'baranauskas_rolandas']),
];
