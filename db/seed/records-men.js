export default [
  ...['men', 'juniors'].map(category => ({
    key: `r_national_${category}_finals_50m_2023_149`, scope: 'national', category, format: 'outdoor',
    discipline: 'finals_50m_15', competition: 'ukraine_champ_2023_outdoor', result_score: 149,
    // Event entry: https://www.ianseo.net/TourData/2023/15224/ENE.php (KIY — м. Київ)
    participants: [{ athlete: 'vdovenko_vitalii', club: 'kyiv', position: 1 }],
  })),
  {
    key: 'r_national_men_match_50m_2026_235', scope: 'national', category: 'men', format: 'outdoor',
    discipline: 'team_match_50m_24', competition: 'ukraine_cup_final_2026', result_score: 235,
    participants: ['vdovenko_vitalii', 'lvovskyi_dmytro', 'sova_anton'].map((athlete, i) => ({ athlete, club: 'kyiv', position: i + 1 })),
  },
  {
    key: 'r_kharkiv_m3x4_2012', scope: 'regional', category: 'men', format: 'indoor',
    discipline: 'team_elim_m3x4', competition: 'bukovina_cup_2012', result_score: 3396,
    participants: [
      { athlete: 'golovko_vadym', club: 'kharkivska', position: 1, leg_scores: '287,284,289,287' },
      { athlete: 'komarov_oleksandr', club: 'kharkivska', position: 2, leg_scores: '286,287,282,287' },
      { athlete: 'tkach_oleksandr', club: 'ukraine', position: 3, leg_scores: '276,276,277,278' },
    ],
  },
  {
    key: 'r_ukraine_m3x4_2010', scope: 'national', category: 'men', format: 'indoor',
    discipline: 'team_elim_m3x4', competition: 'ukraine_cup_2010', result_score: 3476,
    participants: [
      { athlete: 'lvovskyi_dmytro', club: 'sb_kyiv', position: 1, leg_scores: '296,291,295,289' },
      { athlete: 'yaremenko_oleksandr', club: 'sb_kyiv', position: 2, leg_scores: '290,290,286,292' },
      { athlete: 'pymonenko_myhaylo', club: 'sb_kyiv', position: 3, leg_scores: '288,279,288,292' },
    ],
  },
  {
    key: 'r_kharkiv_m3x2_2018_1733', scope: 'regional', category: 'men', format: 'indoor',
    discipline: 'team_elim_m3x2', competition: 'ruban_cup_2018', result_score: 1733,
    participants: [
      { athlete: 'sokolov_oleksandr', club: 'dynamo', position: 1, leg_scores: '286,293' },
      { athlete: 'mylchenko_mykyta', club: 'dynamo', position: 2, leg_scores: '289,289' },
      { athlete: 'golovko_vadym', club: 'fslho', position: 3, leg_scores: '288,288' },
    ],
  },
  {
    key: 'r_kharkiv_finals_18m_2018_233', scope: 'regional', category: 'men', format: 'indoor',
    discipline: 'finals_18m_24', competition: 'ruban_cup_2018', result_score: 233,
    participants: [
      { athlete: 'sokolov_oleksandr', club: 'dynamo', position: 1 },
      { athlete: 'mylchenko_mykyta', club: 'dynamo', position: 2 },
      { athlete: 'golovko_vadym', club: 'fslho', position: 3 },
    ],
  },
  {
    key: 'r_ukraine_m3x2_2016_1737', scope: 'national', category: 'men', format: 'indoor',
    discipline: 'team_elim_m3x2', competition: 'ukraine_cup_2016', result_score: 1737,
    participants: [
      { athlete: 'kardash_igor', club: 'ukraine', position: 1, leg_scores: '291,289' },
      { athlete: 'shkolnyi_konstiantyn', club: 'dynamo', position: 2, leg_scores: '288,291' },
      { athlete: 'krasylnykov_oleh', club: 'ukraine', position: 3, leg_scores: '289,289' },
    ],
  },
  {
    key: 'r_ukraine_finals_18m_2017_236', scope: 'national', category: 'men', format: 'indoor',
    discipline: 'finals_18m_24', competition: 'ukraine_cup_2017', result_score: 236,
    participants: [
      { athlete: 'volnenko_taras', club: 'ukraine_kyiv', position: 1 },
      { athlete: 'danyliuk_myhaylo', club: 'ukraine_kyiv', position: 2 },
      { athlete: 'lvovskyi_dmytro', club: 'ukraine_kyiv', position: 3 },
    ],
  },
];
