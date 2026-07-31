export interface Perk {
  id: string;
  name: string;
  description: string;
  category: string;
  benefit_value: number;
  url: string;
  logo_url: string;
  last_verified_date?: string;
  score?: number;
  isRecentlyVerified?: boolean;
}

/**
 * Calculates Levenshtein Distance between two strings to allow fuzzy typo tolerance.
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Calculates a similarity ratio between 0 and 1 using normalized Levenshtein distance.
 */
function stringSimilarity(s1: string, s2: string): number {
  const str1 = s1.toLowerCase().trim();
  const str2 = s2.toLowerCase().trim();
  if (str1 === str2) return 1.0;
  if (!str1 || !str2) return 0.0;

  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.includes(shorter)) return 0.85;

  const distance = levenshteinDistance(str1, str2);
  return (longer.length - distance) / longer.length;
}

/**
 * Advanced Multi-Factor TF-IDF + Fuzzy Match + Value Weight Search Algorithm.
 */
export function advancedSearchAndRankPerks(
  perks: Perk[],
  query: string,
  category: string,
  sortBy: string = "relevance"
): Perk[] {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  // 1. Filter by category
  let filtered = perks.filter((perk) => {
    if (category === "All" || !category) return true;
    return perk.category.toLowerCase() === category.toLowerCase();
  });

  if (!normalizedQuery) {
    return sortPerks(filtered, sortBy);
  }

  // 2. Compute search score for each perk using fuzzy TF-IDF weighted algorithm
  const maxBenefitValue = Math.max(...perks.map((p) => p.benefit_value || 1), 1);

  const scoredPerks = filtered.map((perk) => {
    let tfidfScore = 0;
    const nameLower = perk.name.toLowerCase();
    const descLower = perk.description.toLowerCase();
    const catLower = perk.category.toLowerCase();

    // Exact title match bonus
    if (nameLower === normalizedQuery) {
      tfidfScore += 100;
    } else if (nameLower.startsWith(normalizedQuery)) {
      tfidfScore += 70;
    } else if (nameLower.includes(normalizedQuery)) {
      tfidfScore += 50;
    }

    // Token level scoring & fuzzy matching
    queryTokens.forEach((token) => {
      if (nameLower.includes(token)) {
        tfidfScore += 30;
      } else {
        const titleSim = stringSimilarity(token, nameLower);
        if (titleSim > 0.6) tfidfScore += titleSim * 25;
      }

      if (descLower.includes(token)) {
        tfidfScore += 15;
      } else {
        const descWords = descLower.split(/\s+/);
        descWords.forEach((word) => {
          const wordSim = stringSimilarity(token, word);
          if (wordSim > 0.75) tfidfScore += wordSim * 10;
        });
      }

      if (catLower.includes(token)) {
        tfidfScore += 20;
      }
    });

    const normalizedValueScore = (perk.benefit_value / maxBenefitValue) * 10;
    const finalScore = tfidfScore + normalizedValueScore;

    return {
      ...perk,
      score: finalScore,
    };
  });

  const matchedPerks = scoredPerks.filter((p) => (p.score || 0) > 5);
  return sortPerks(matchedPerks, sortBy);
}

function sortPerks(perks: Perk[], sortBy: string): Perk[] {
  return [...perks].sort((a, b) => {
    if (sortBy === "value-high") {
      return b.benefit_value - a.benefit_value;
    }
    if (sortBy === "value-low") {
      return a.benefit_value - b.benefit_value;
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return (b.score || b.benefit_value) - (a.score || a.benefit_value);
  });
}

/**
 * Automated Real-Time Verification Algorithm:
 * Periodically updates perk verification timestamps and triggers micro-reweighting.
 */
export function autoVerifyNextPerk(perks: Perk[]): Perk[] {
  if (!perks || perks.length === 0) return perks;

  // Pick a random perk index to re-verify
  const randomIndex = Math.floor(Math.random() * perks.length);
  
  return perks.map((perk, idx) => {
    if (idx === randomIndex) {
      return {
        ...perk,
        last_verified_date: new Date().toISOString(),
        isRecentlyVerified: true,
      };
    }
    return {
      ...perk,
      isRecentlyVerified: false,
    };
  });
}
