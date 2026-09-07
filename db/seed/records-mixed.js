const team = (key, scope, category, discipline, competition, result_score, club, athletes, leg_scores = null, format = 'indoor') => ({
  key, scope, category, format, discipline, competition, result_score,
  participants: athletes.map((athlete, index) => ({ athlete, club, position: index + 1, leg_scores: leg_scores?.[index] ?? null })),
});

export default [
  team('r_regional_mixed_2x50_2012_1364', 'regional', 'mixed', 'team_elim_2x50m', 'ukraine_champ_2012', 1364, 'tshvsm', ['doroshenko_yuriy', 'diakova_viktoriia'], ['337,339', '347,341'], 'outdoor'),
  team('r_regional_mixed_m1_2012_2723', 'regional', 'mixed', 'team_elim_m1_2', 'golden_autumn_2012', 2723, 'kharkivska', ['diakova_viktoriia', 'golovko_vadym'], ['337,348,335,354', '328,333,340,348'], 'outdoor'),
  team('r_regional_mixed_finals_50m_2017_152', 'regional', 'mixed', 'finals_50m_16', 'ukraine_schools_champ_2017', 152, 'khnu_karazina', ['borisenko_olena', 'golovko_vadym'], null, 'outdoor'),
  team('r_regional_mixed_finals_70m_2012_149', 'regional', 'mixed', 'finals_70m_16', 'golden_autumn_2012', 149, 'kharkivska', ['diakova_viktoriia', 'gurov_oleh'], null, 'outdoor'),
  team('r_national_mixed_2x50_2012_1383', 'national', 'mixed', 'team_elim_2x50m', 'ukraine_champ_2012', 1383, 'kdyush_olimp', ['pymonenko_myhaylo', 'kuritsina_dina'], ['348,350', '344,341'], 'outdoor'),
  team('r_national_mixed_m1_2011_2752', 'national', 'mixed', 'team_elim_m1_2', 'kokota_memorial_2011', 2752, null, ['lvovskyi_dmytro', 'kuritsina_dina'], ['331,347,345,358', '331,345,340,355'], 'outdoor'),
  team('r_national_mixed_finals_50m_2026_157', 'national', 'mixed', 'finals_50m_16', 'ukraine_champ_2026', 157, null, ['shkliar_kseniia', 'vdovenko_vitalii'], null, 'outdoor'),
  team('r_national_mixed_finals_70m_2012_152', 'national', 'mixed', 'finals_70m_16', 'golden_autumn_2012', 152, 'sdyushor_elektron', ['skalska_iryna', 'sokolov_oleksandr'], null, 'outdoor'),
  team('r_regional_mixed50_2x50_2017_1304', 'regional', 'masters50', 'team_elim_2x50m', 'ukraine_schools_champ_2017', 1304, 'kharkivska', ['kursina_yuliia', 'sokolov_oleksandr'], ['318,320', '331,335'], 'outdoor'),
  team('r_regional_mixed50_finals_50m_2017_146', 'regional', 'masters50', 'finals_50m_16', 'ukraine_schools_champ_2017', 146, 'kharkivska', ['kursina_yuliia', 'sokolov_oleksandr'], null, 'outdoor'),
  team('r_national_mixed50_2x50_2017_1304', 'national', 'masters50', 'team_elim_2x50m', 'ukraine_schools_champ_2017', 1304, 'kharkivska', ['kursina_yuliia', 'sokolov_oleksandr'], ['318,320', '331,335'], 'outdoor'),
  team('r_national_mixed50_finals_50m_2017_146', 'national', 'masters50', 'finals_50m_16', 'ukraine_schools_champ_2017', 146, 'kharkivska', ['kursina_yuliia', 'sokolov_oleksandr'], null, 'outdoor'),
];
