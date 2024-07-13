[out:json][timeout:25];
// fetch area “Leipzig” to search in
{{geocodeArea:Leipzig}}->.searchArea;
// gather results
nwr["leisure"="fitness_centre"](area.searchArea);
// print results
out center;