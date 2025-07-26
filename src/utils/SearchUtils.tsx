import React from "react";

export interface SearchResult {
  hasMatch: boolean;
  highlightedText: React.ReactNode;
}

/**
 * Highlights search terms in text and returns the highlighted component
 * along with a flag indicating if there was a match
 */
export const highlightSearchTerm = (
  text: string,
  searchTerm: string
): SearchResult => {
  if (!searchTerm.trim()) {
    return {
      hasMatch: true, // No search term means everything matches
      highlightedText: text,
    };
  }

  const regex = new RegExp(
    `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);
  let hasMatch = false;

  const highlightedText = parts.map((part, index) => {
    if (regex.test(part)) {
      hasMatch = true;
      return (
        <span
          key={index}
          style={{
            backgroundColor: "#ffd700",
            color: "#000",
            fontWeight: "bold",
            padding: "0 2px",
            borderRadius: "2px",
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });

  return {
    hasMatch,
    highlightedText: <>{highlightedText}</>,
  };
};

/**
 * Checks if a relic matches the search term in either its name or effects
 */
export const doesRelicMatch = (
  itemName: string,
  effectNames: string[],
  searchTerm: string
): boolean => {
  if (!searchTerm.trim()) {
    return true; // No search term means everything matches
  }

  const lowerSearchTerm = searchTerm.toLowerCase();

  // Check item name
  if (itemName.toLowerCase().includes(lowerSearchTerm)) {
    return true;
  }

  // Check effect names
  return effectNames.some((effectName) =>
    effectName.toLowerCase().includes(lowerSearchTerm)
  );
};
