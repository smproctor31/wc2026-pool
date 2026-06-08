// ── TEAMS ──────────────────────────────────────────────────────────────────
// All 52 qualified teams sorted by FIFA rank for draft order.
// 52 teams / 4 players = 13 rounds, 13 teams each.
export const ALL_TEAMS = [
  // ── Round 1: FIFA Ranks 1–4 ──
  { id: 1,  name: "France",         flag: "🇫🇷", fifaRank: 1,  confederation: "UEFA",     group: "I" },
  { id: 2,  name: "Spain",          flag: "🇪🇸", fifaRank: 2,  confederation: "UEFA",     group: "H" },
  { id: 3,  name: "Argentina",      flag: "🇦🇷", fifaRank: 3,  confederation: "CONMEBOL", group: "J" },
  { id: 4,  name: "England",        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fifaRank: 4,  confederation: "UEFA",     group: "L" },
  // ── Round 2: FIFA Ranks 5–8 ──
  { id: 5,  name: "Portugal",       flag: "🇵🇹", fifaRank: 5,  confederation: "UEFA",     group: "K" },
  { id: 6,  name: "Brazil",         flag: "🇧🇷", fifaRank: 6,  confederation: "CONMEBOL", group: "C" },
  { id: 7,  name: "Netherlands",    flag: "🇳🇱", fifaRank: 7,  confederation: "UEFA",     group: "F" },
  { id: 8,  name: "Morocco",        flag: "🇲🇦", fifaRank: 8,  confederation: "CAF",      group: "C" },
  // ── Round 3: FIFA Ranks 9–13 ──
  { id: 9,  name: "Belgium",        flag: "🇧🇪", fifaRank: 9,  confederation: "UEFA",     group: "G" },
  { id: 10, name: "Germany",        flag: "🇩🇪", fifaRank: 10, confederation: "UEFA",     group: "E" },
  { id: 11, name: "Croatia",        flag: "🇭🇷", fifaRank: 11, confederation: "UEFA",     group: "L" },
  { id: 12, name: "Colombia",       flag: "🇨🇴", fifaRank: 13, confederation: "CONMEBOL", group: "K" },
  // ── Round 4: FIFA Ranks 14–17 ──
  { id: 13, name: "Senegal",        flag: "🇸🇳", fifaRank: 14, confederation: "CAF",      group: "I" },
  { id: 14, name: "Mexico",         flag: "🇲🇽", fifaRank: 15, confederation: "CONCACAF", group: "A" },
  { id: 15, name: "United States",  flag: "🇺🇸", fifaRank: 16, confederation: "CONCACAF", group: "D" },
  { id: 16, name: "Uruguay",        flag: "🇺🇾", fifaRank: 17, confederation: "CONMEBOL", group: "H" },
  // ── Round 5: FIFA Ranks 18–22 ──
  { id: 17, name: "Japan",          flag: "🇯🇵", fifaRank: 18, confederation: "AFC",      group: "F" },
  { id: 18, name: "Switzerland",    flag: "🇨🇭", fifaRank: 19, confederation: "UEFA",     group: "B" },
  { id: 19, name: "Iran",           flag: "🇮🇷", fifaRank: 20, confederation: "AFC",      group: "G" },
  { id: 20, name: "South Korea",    flag: "🇰🇷", fifaRank: 22, confederation: "AFC",      group: "A" },
  // ── Round 6: FIFA Ranks 23–27 ──
  { id: 21, name: "Ecuador",        flag: "🇪🇨", fifaRank: 23, confederation: "CONMEBOL", group: "E" },
  { id: 22, name: "Austria",        flag: "🇦🇹", fifaRank: 24, confederation: "UEFA",     group: "J" },
  { id: 23, name: "Türkiye",        flag: "🇹🇷", fifaRank: 25, confederation: "UEFA",     group: "D" },
  { id: 24, name: "Australia",      flag: "🇦🇺", fifaRank: 27, confederation: "AFC",      group: "D" },
  // ── Round 7: FIFA Ranks 28–32 ──
  { id: 25, name: "Algeria",        flag: "🇩🇿", fifaRank: 28, confederation: "CAF",      group: "J" },
  { id: 26, name: "Canada",         flag: "🇨🇦", fifaRank: 30, confederation: "CONCACAF", group: "B" },
  { id: 27, name: "Egypt",          flag: "🇪🇬", fifaRank: 31, confederation: "CAF",      group: "G" },
  { id: 28, name: "Norway",         flag: "🇳🇴", fifaRank: 32, confederation: "UEFA",     group: "I" },
  // ── Round 8: FIFA Ranks 33–42 ──
  { id: 29, name: "Panama",         flag: "🇵🇦", fifaRank: 33, confederation: "CONCACAF", group: "L" },
  { id: 30, name: "Scotland",       flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", fifaRank: 38, confederation: "UEFA",     group: "C" },
  { id: 31, name: "Paraguay",       flag: "🇵🇾", fifaRank: 40, confederation: "CONMEBOL", group: "D" },
  { id: 32, name: "Sweden",         flag: "🇸🇪", fifaRank: 42, confederation: "UEFA",     group: "F" },
  // ── Round 9: FIFA Ranks 43–48 ──
  { id: 33, name: "Czechia",        flag: "🇨🇿", fifaRank: 43, confederation: "UEFA",     group: "A" },
  { id: 52, name: "Ivory Coast",    flag: "🇨🇮", fifaRank: 45, confederation: "CAF",      group: "E" },
  { id: 34, name: "Tunisia",        flag: "🇹🇳", fifaRank: 47, confederation: "CAF",      group: "F" },
  { id: 35, name: "DR Congo",       flag: "🇨🇩", fifaRank: 48, confederation: "CAF",      group: "K" },
  // ── Round 10: FIFA Ranks 50–55 ──
  { id: 47, name: "Venezuela",      flag: "🇻🇪", fifaRank: 50, confederation: "CONMEBOL", group: null },
  { id: 36, name: "Ghana",          flag: "🇬🇭", fifaRank: 51, confederation: "CAF",      group: "L" },
  { id: 37, name: "Bosnia & Herz.", flag: "🇧🇦", fifaRank: 52, confederation: "UEFA",     group: "B" },
  { id: 38, name: "South Africa",   flag: "🇿🇦", fifaRank: 55, confederation: "CAF",      group: "A" },
  // ── Round 11: FIFA Ranks 55–61 ──
  { id: 51, name: "Saudi Arabia",   flag: "🇸🇦", fifaRank: 55, confederation: "AFC",      group: "H" },
  { id: 39, name: "Iraq",           flag: "🇮🇶", fifaRank: 58, confederation: "AFC",      group: "I" },
  { id: 49, name: "Qatar",          flag: "🇶🇦", fifaRank: 58, confederation: "AFC",      group: "B" },
  { id: 48, name: "Costa Rica",     flag: "🇨🇷", fifaRank: 61, confederation: "CONCACAF", group: null },
  // ── Round 12: FIFA Ranks 63–72 ──
  { id: 40, name: "Cape Verde",     flag: "🇨🇻", fifaRank: 63, confederation: "CAF",      group: "H" },
  { id: 41, name: "Jordan",         flag: "🇯🇴", fifaRank: 67, confederation: "AFC",      group: "J" },
  { id: 42, name: "Jamaica",        flag: "🇯🇲", fifaRank: 70, confederation: "CONCACAF", group: null },
  { id: 43, name: "Uzbekistan",     flag: "🇺🇿", fifaRank: 72, confederation: "AFC",      group: "K" },
  // ── Round 13: FIFA Ranks 76–93 ──
  { id: 44, name: "Honduras",       flag: "🇭🇳", fifaRank: 76, confederation: "CONCACAF", group: null },
  { id: 45, name: "Curaçao",        flag: "🇨🇼", fifaRank: 80, confederation: "CONCACAF", group: "E" },
  { id: 50, name: "Haiti",          flag: "🇭🇹", fifaRank: 90, confederation: "CONCACAF", group: "C" },
  { id: 46, name: "New Zealand",    flag: "🇳🇿", fifaRank: 93, confederation: "OFC",      group: "G" },
];

export const PLAYER_COLORS = ["#e63946", "#2196f3", "#4caf50", "#ff9800"];

// ── FULL SCHEDULE ─────────────────────────────────────────────────────────────
// All 104 matches. Knockout matches start with TBD teams (filled in as tournament progresses)
// matchNum: FIFA match number, date: ET date/time
export const SCHEDULE = [
  // ── GROUP STAGE ──────────────────────────────────────────────────────────
  // Group A
  { matchNum: 1,  stage: "Group A", date: "2026-06-11", time: "3:00 PM ET",  team1: "Mexico",       team2: "South Africa", city: "Mexico City" },
  { matchNum: 2,  stage: "Group A", date: "2026-06-11", time: "10:00 PM ET", team1: "South Korea",  team2: "Czechia",      city: "Guadalajara" },
  { matchNum: 3,  stage: "Group A", date: "2026-06-18", time: "12:00 PM ET", team1: "Czechia",      team2: "South Africa", city: "Atlanta" },
  { matchNum: 4,  stage: "Group A", date: "2026-06-18", time: "9:00 PM ET",  team1: "Mexico",       team2: "South Korea",  city: "Guadalajara" },
  { matchNum: 5,  stage: "Group A", date: "2026-06-24", time: "9:00 PM ET",  team1: "Czechia",      team2: "Mexico",       city: "Mexico City" },
  { matchNum: 6,  stage: "Group A", date: "2026-06-24", time: "9:00 PM ET",  team1: "South Africa", team2: "South Korea",  city: "Monterrey" },
  // Group B
  { matchNum: 7,  stage: "Group B", date: "2026-06-12", time: "3:00 PM ET",  team1: "Canada",       team2: "Bosnia & Herz.", city: "Toronto" },
  { matchNum: 8,  stage: "Group B", date: "2026-06-13", time: "3:00 PM ET",  team1: "Qatar",        team2: "Switzerland",  city: "San Francisco" },
  { matchNum: 9,  stage: "Group B", date: "2026-06-18", time: "3:00 PM ET",  team1: "Switzerland",  team2: "Bosnia & Herz.", city: "Los Angeles" },
  { matchNum: 10, stage: "Group B", date: "2026-06-18", time: "6:00 PM ET",  team1: "Canada",       team2: "Qatar",        city: "Vancouver" },
  { matchNum: 11, stage: "Group B", date: "2026-06-24", time: "3:00 PM ET",  team1: "Switzerland",  team2: "Canada",       city: "Vancouver" },
  { matchNum: 12, stage: "Group B", date: "2026-06-24", time: "3:00 PM ET",  team1: "Bosnia & Herz.", team2: "Qatar",      city: "Seattle" },
  // Group C
  { matchNum: 13, stage: "Group C", date: "2026-06-13", time: "6:00 PM ET",  team1: "Brazil",       team2: "Morocco",      city: "New York/NJ" },
  { matchNum: 14, stage: "Group C", date: "2026-06-13", time: "9:00 PM ET",  team1: "Haiti",        team2: "Scotland",     city: "Boston" },
  { matchNum: 15, stage: "Group C", date: "2026-06-19", time: "6:00 PM ET",  team1: "Scotland",     team2: "Morocco",      city: "Boston" },
  { matchNum: 16, stage: "Group C", date: "2026-06-19", time: "9:00 PM ET",  team1: "Brazil",       team2: "Haiti",        city: "Philadelphia" },
  { matchNum: 17, stage: "Group C", date: "2026-06-24", time: "6:00 PM ET",  team1: "Scotland",     team2: "Brazil",       city: "Miami" },
  { matchNum: 18, stage: "Group C", date: "2026-06-24", time: "6:00 PM ET",  team1: "Morocco",      team2: "Haiti",        city: "Atlanta" },
  // Group D
  { matchNum: 19, stage: "Group D", date: "2026-06-12", time: "9:00 PM ET",  team1: "United States", team2: "Paraguay",    city: "Los Angeles" },
  { matchNum: 20, stage: "Group D", date: "2026-06-13", time: "12:00 AM ET", team1: "Australia",    team2: "Türkiye",      city: "Vancouver" },
  { matchNum: 21, stage: "Group D", date: "2026-06-19", time: "3:00 PM ET",  team1: "United States", team2: "Australia",   city: "Seattle" },
  { matchNum: 22, stage: "Group D", date: "2026-06-19", time: "12:00 AM ET", team1: "Türkiye",      team2: "Paraguay",     city: "San Francisco" },
  { matchNum: 23, stage: "Group D", date: "2026-06-25", time: "10:00 PM ET", team1: "Türkiye",      team2: "United States", city: "Los Angeles" },
  { matchNum: 24, stage: "Group D", date: "2026-06-25", time: "10:00 PM ET", team1: "Paraguay",     team2: "Australia",    city: "San Francisco" },
  // Group E
  { matchNum: 25, stage: "Group E", date: "2026-06-14", time: "1:00 PM ET",  team1: "Germany",      team2: "Curaçao",      city: "Houston" },
  { matchNum: 26, stage: "Group E", date: "2026-06-14", time: "7:00 PM ET",  team1: "Ivory Coast",  team2: "Ecuador",      city: "Philadelphia" },
  { matchNum: 27, stage: "Group E", date: "2026-06-20", time: "4:00 PM ET",  team1: "Germany",      team2: "Ivory Coast",  city: "Toronto" },
  { matchNum: 28, stage: "Group E", date: "2026-06-20", time: "8:00 PM ET",  team1: "Ecuador",      team2: "Curaçao",      city: "Kansas City" },
  { matchNum: 29, stage: "Group E", date: "2026-06-25", time: "4:00 PM ET",  team1: "Ecuador",      team2: "Germany",      city: "New York/NJ" },
  { matchNum: 30, stage: "Group E", date: "2026-06-25", time: "4:00 PM ET",  team1: "Curaçao",      team2: "Ivory Coast",  city: "Philadelphia" },
  // Group F
  { matchNum: 31, stage: "Group F", date: "2026-06-14", time: "4:00 PM ET",  team1: "Netherlands",  team2: "Japan",        city: "Dallas" },
  { matchNum: 32, stage: "Group F", date: "2026-06-14", time: "10:00 PM ET", team1: "Sweden",       team2: "Tunisia",      city: "Monterrey" },
  { matchNum: 33, stage: "Group F", date: "2026-06-20", time: "1:00 PM ET",  team1: "Netherlands",  team2: "Sweden",       city: "Houston" },
  { matchNum: 34, stage: "Group F", date: "2026-06-20", time: "12:00 AM ET", team1: "Tunisia",      team2: "Japan",        city: "Monterrey" },
  { matchNum: 35, stage: "Group F", date: "2026-06-25", time: "7:00 PM ET",  team1: "Japan",        team2: "Sweden",       city: "Dallas" },
  { matchNum: 36, stage: "Group F", date: "2026-06-25", time: "7:00 PM ET",  team1: "Tunisia",      team2: "Netherlands",  city: "Kansas City" },
  // Group G
  { matchNum: 37, stage: "Group G", date: "2026-06-15", time: "3:00 PM ET",  team1: "Belgium",      team2: "Egypt",        city: "Seattle" },
  { matchNum: 38, stage: "Group G", date: "2026-06-15", time: "9:00 PM ET",  team1: "Iran",         team2: "New Zealand",  city: "Los Angeles" },
  { matchNum: 39, stage: "Group G", date: "2026-06-21", time: "3:00 PM ET",  team1: "Belgium",      team2: "Iran",         city: "Los Angeles" },
  { matchNum: 40, stage: "Group G", date: "2026-06-21", time: "9:00 PM ET",  team1: "New Zealand",  team2: "Egypt",        city: "Vancouver" },
  { matchNum: 41, stage: "Group G", date: "2026-06-26", time: "11:00 PM ET", team1: "Egypt",        team2: "Iran",         city: "Seattle" },
  { matchNum: 42, stage: "Group G", date: "2026-06-26", time: "11:00 PM ET", team1: "New Zealand",  team2: "Belgium",      city: "Vancouver" },
  // Group H
  { matchNum: 43, stage: "Group H", date: "2026-06-15", time: "12:00 PM ET", team1: "Spain",        team2: "Cape Verde",   city: "Atlanta" },
  { matchNum: 44, stage: "Group H", date: "2026-06-15", time: "6:00 PM ET",  team1: "Saudi Arabia", team2: "Uruguay",      city: "Miami" },
  { matchNum: 45, stage: "Group H", date: "2026-06-21", time: "12:00 PM ET", team1: "Spain",        team2: "Saudi Arabia", city: "Atlanta" },
  { matchNum: 46, stage: "Group H", date: "2026-06-21", time: "6:00 PM ET",  team1: "Uruguay",      team2: "Cape Verde",   city: "Miami" },
  { matchNum: 47, stage: "Group H", date: "2026-06-26", time: "8:00 PM ET",  team1: "Cape Verde",   team2: "Saudi Arabia", city: "Houston" },
  { matchNum: 48, stage: "Group H", date: "2026-06-26", time: "8:00 PM ET",  team1: "Uruguay",      team2: "Spain",        city: "Guadalajara" },
  // Group I
  { matchNum: 49, stage: "Group I", date: "2026-06-16", time: "3:00 PM ET",  team1: "France",       team2: "Senegal",      city: "New York/NJ" },
  { matchNum: 50, stage: "Group I", date: "2026-06-16", time: "6:00 PM ET",  team1: "Iraq",         team2: "Norway",       city: "Boston" },
  { matchNum: 51, stage: "Group I", date: "2026-06-22", time: "5:00 PM ET",  team1: "France",       team2: "Iraq",         city: "Philadelphia" },
  { matchNum: 52, stage: "Group I", date: "2026-06-22", time: "8:00 PM ET",  team1: "Norway",       team2: "Senegal",      city: "New York/NJ" },
  { matchNum: 53, stage: "Group I", date: "2026-06-26", time: "3:00 PM ET",  team1: "Norway",       team2: "France",       city: "Boston" },
  { matchNum: 54, stage: "Group I", date: "2026-06-26", time: "3:00 PM ET",  team1: "Senegal",      team2: "Iraq",         city: "Toronto" },
  // Group J
  { matchNum: 55, stage: "Group J", date: "2026-06-16", time: "9:00 PM ET",  team1: "Argentina",    team2: "Algeria",      city: "Kansas City" },
  { matchNum: 56, stage: "Group J", date: "2026-06-16", time: "12:00 AM ET", team1: "Austria",      team2: "Jordan",       city: "San Francisco" },
  { matchNum: 57, stage: "Group J", date: "2026-06-22", time: "1:00 PM ET",  team1: "Argentina",    team2: "Austria",      city: "Dallas" },
  { matchNum: 58, stage: "Group J", date: "2026-06-22", time: "11:00 PM ET", team1: "Jordan",       team2: "Algeria",      city: "San Francisco" },
  { matchNum: 59, stage: "Group J", date: "2026-06-27", time: "10:00 PM ET", team1: "Algeria",      team2: "Austria",      city: "Kansas City" },
  { matchNum: 60, stage: "Group J", date: "2026-06-27", time: "10:00 PM ET", team1: "Jordan",       team2: "Argentina",    city: "Dallas" },
  // Group K
  { matchNum: 61, stage: "Group K", date: "2026-06-17", time: "1:00 PM ET",  team1: "Portugal",     team2: "DR Congo",     city: "Houston" },
  { matchNum: 62, stage: "Group K", date: "2026-06-17", time: "10:00 PM ET", team1: "Uzbekistan",   team2: "Colombia",     city: "Mexico City" },
  { matchNum: 63, stage: "Group K", date: "2026-06-23", time: "1:00 PM ET",  team1: "Portugal",     team2: "Uzbekistan",   city: "Houston" },
  { matchNum: 64, stage: "Group K", date: "2026-06-23", time: "10:00 PM ET", team1: "Colombia",     team2: "DR Congo",     city: "Guadalajara" },
  { matchNum: 65, stage: "Group K", date: "2026-06-27", time: "7:30 PM ET",  team1: "Colombia",     team2: "Portugal",     city: "Miami" },
  { matchNum: 66, stage: "Group K", date: "2026-06-27", time: "7:30 PM ET",  team1: "DR Congo",     team2: "Uzbekistan",   city: "Atlanta" },
  // Group L
  { matchNum: 67, stage: "Group L", date: "2026-06-17", time: "4:00 PM ET",  team1: "England",      team2: "Croatia",      city: "Dallas" },
  { matchNum: 68, stage: "Group L", date: "2026-06-17", time: "7:00 PM ET",  team1: "Ghana",        team2: "Panama",       city: "Toronto" },
  { matchNum: 69, stage: "Group L", date: "2026-06-23", time: "4:00 PM ET",  team1: "England",      team2: "Ghana",        city: "Boston" },
  { matchNum: 70, stage: "Group L", date: "2026-06-23", time: "7:00 PM ET",  team1: "Panama",       team2: "Croatia",      city: "Toronto" },
  { matchNum: 71, stage: "Group L", date: "2026-06-27", time: "5:00 PM ET",  team1: "Panama",       team2: "England",      city: "New York/NJ" },
  { matchNum: 72, stage: "Group L", date: "2026-06-27", time: "5:00 PM ET",  team1: "Croatia",      team2: "Ghana",        city: "Philadelphia" },
  // ── ROUND OF 32 ───────────────────────────────────────────────────────────
  { matchNum: 73,  stage: "Round of 32", date: "2026-06-28", time: "3:00 PM ET",  team1: "TBD", team2: "TBD", city: "Los Angeles",   tbdNote: "Runner-up A vs Runner-up B" },
  { matchNum: 74,  stage: "Round of 32", date: "2026-06-29", time: "1:00 PM ET",  team1: "TBD", team2: "TBD", city: "Houston",       tbdNote: "Winner C vs Runner-up F" },
  { matchNum: 75,  stage: "Round of 32", date: "2026-06-29", time: "4:30 PM ET",  team1: "TBD", team2: "TBD", city: "Boston",        tbdNote: "Winner E vs Best 3rd" },
  { matchNum: 76,  stage: "Round of 32", date: "2026-06-29", time: "9:00 PM ET",  team1: "TBD", team2: "TBD", city: "Monterrey",     tbdNote: "Winner F vs Runner-up C" },
  { matchNum: 77,  stage: "Round of 32", date: "2026-06-30", time: "1:00 PM ET",  team1: "TBD", team2: "TBD", city: "Dallas",        tbdNote: "Runner-up E vs Runner-up I" },
  { matchNum: 78,  stage: "Round of 32", date: "2026-06-30", time: "5:00 PM ET",  team1: "TBD", team2: "TBD", city: "New York/NJ",   tbdNote: "Winner I vs Best 3rd" },
  { matchNum: 79,  stage: "Round of 32", date: "2026-06-30", time: "9:00 PM ET",  team1: "TBD", team2: "TBD", city: "Mexico City",   tbdNote: "Winner A vs Best 3rd" },
  { matchNum: 80,  stage: "Round of 32", date: "2026-07-01", time: "12:00 PM ET", team1: "TBD", team2: "TBD", city: "Atlanta",       tbdNote: "Winner L vs Best 3rd" },
  { matchNum: 81,  stage: "Round of 32", date: "2026-07-01", time: "4:00 PM ET",  team1: "TBD", team2: "TBD", city: "Seattle",       tbdNote: "Winner G vs Best 3rd" },
  { matchNum: 82,  stage: "Round of 32", date: "2026-07-01", time: "8:00 PM ET",  team1: "TBD", team2: "TBD", city: "San Francisco", tbdNote: "Winner D vs Best 3rd" },
  { matchNum: 83,  stage: "Round of 32", date: "2026-07-02", time: "3:00 PM ET",  team1: "TBD", team2: "TBD", city: "Los Angeles",   tbdNote: "Winner H vs Runner-up J" },
  { matchNum: 84,  stage: "Round of 32", date: "2026-07-02", time: "7:00 PM ET",  team1: "TBD", team2: "TBD", city: "Toronto",       tbdNote: "Runner-up K vs Runner-up L" },
  { matchNum: 85,  stage: "Round of 32", date: "2026-07-02", time: "11:00 PM ET", team1: "TBD", team2: "TBD", city: "Vancouver",     tbdNote: "Winner B vs Best 3rd" },
  { matchNum: 86,  stage: "Round of 32", date: "2026-07-03", time: "2:00 PM ET",  team1: "TBD", team2: "TBD", city: "Dallas",        tbdNote: "Runner-up D vs Runner-up G" },
  { matchNum: 87,  stage: "Round of 32", date: "2026-07-03", time: "6:00 PM ET",  team1: "TBD", team2: "TBD", city: "Miami",         tbdNote: "Winner J vs Runner-up H" },
  { matchNum: 88,  stage: "Round of 32", date: "2026-07-03", time: "9:30 PM ET",  team1: "TBD", team2: "TBD", city: "Kansas City",   tbdNote: "Winner K vs Best 3rd" },
  // ── ROUND OF 16 ──────────────────────────────────────────────────────────
  { matchNum: 89,  stage: "Round of 16", date: "2026-07-04", time: "1:00 PM ET",  team1: "TBD", team2: "TBD", city: "Houston",       tbdNote: "Match 74 winner vs Match 76 winner" },
  { matchNum: 90,  stage: "Round of 16", date: "2026-07-04", time: "5:00 PM ET",  team1: "TBD", team2: "TBD", city: "Philadelphia",  tbdNote: "Match 75 winner vs Match 77 winner" },
  { matchNum: 91,  stage: "Round of 16", date: "2026-07-05", time: "4:00 PM ET",  team1: "TBD", team2: "TBD", city: "New York/NJ",   tbdNote: "Match 78 winner vs Match 79 winner" },
  { matchNum: 92,  stage: "Round of 16", date: "2026-07-05", time: "8:00 PM ET",  team1: "TBD", team2: "TBD", city: "Mexico City",   tbdNote: "Match 80 winner vs Match 88 winner" },
  { matchNum: 93,  stage: "Round of 16", date: "2026-07-06", time: "3:00 PM ET",  team1: "TBD", team2: "TBD", city: "Dallas",        tbdNote: "Match 81 winner vs Match 82 winner" },
  { matchNum: 94,  stage: "Round of 16", date: "2026-07-06", time: "8:00 PM ET",  team1: "TBD", team2: "TBD", city: "Seattle",       tbdNote: "Match 83 winner vs Match 87 winner" },
  { matchNum: 95,  stage: "Round of 16", date: "2026-07-07", time: "12:00 PM ET", team1: "TBD", team2: "TBD", city: "Atlanta",       tbdNote: "Match 84 winner vs Match 85 winner" },
  { matchNum: 96,  stage: "Round of 16", date: "2026-07-07", time: "4:00 PM ET",  team1: "TBD", team2: "TBD", city: "Vancouver",     tbdNote: "Match 73 winner vs Match 86 winner" },
  // ── QUARTERFINALS ────────────────────────────────────────────────────────
  { matchNum: 97,  stage: "Quarterfinals", date: "2026-07-09", time: "4:00 PM ET",  team1: "TBD", team2: "TBD", city: "Boston",      tbdNote: "QF 1" },
  { matchNum: 98,  stage: "Quarterfinals", date: "2026-07-10", time: "3:00 PM ET",  team1: "TBD", team2: "TBD", city: "Los Angeles", tbdNote: "QF 2" },
  { matchNum: 99,  stage: "Quarterfinals", date: "2026-07-11", time: "5:00 PM ET",  team1: "TBD", team2: "TBD", city: "Miami",       tbdNote: "QF 3" },
  { matchNum: 100, stage: "Quarterfinals", date: "2026-07-11", time: "9:00 PM ET",  team1: "TBD", team2: "TBD", city: "Kansas City", tbdNote: "QF 4" },
  // ── SEMIFINALS ───────────────────────────────────────────────────────────
  { matchNum: 101, stage: "Semifinals", date: "2026-07-14", time: "3:00 PM ET", team1: "TBD", team2: "TBD", city: "Dallas",   tbdNote: "SF 1" },
  { matchNum: 102, stage: "Semifinals", date: "2026-07-15", time: "3:00 PM ET", team1: "TBD", team2: "TBD", city: "Atlanta",  tbdNote: "SF 2" },
  // ── THIRD PLACE ──────────────────────────────────────────────────────────
  { matchNum: 103, stage: "3rd Place",  date: "2026-07-18", time: "5:00 PM ET", team1: "TBD", team2: "TBD", city: "Miami",       tbdNote: "3rd Place Play-off" },
  // ── FINAL ────────────────────────────────────────────────────────────────
  { matchNum: 104, stage: "Final",      date: "2026-07-19", time: "3:00 PM ET", team1: "TBD", team2: "TBD", city: "New York/NJ",  tbdNote: "THE FINAL 🏆" },
];

export const STORAGE_KEY = "wc2026_pool_v2";
