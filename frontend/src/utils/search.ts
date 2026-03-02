export function getSearchTerm(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return (value[0] ?? "").trim();
  }

  return "";
}

export function getSnippet(body: string, maxLength = 180): string {
  const compactBody = body.replace(/\s+/g, " ").trim();

  if (compactBody.length <= maxLength) {
    return compactBody;
  }

  return `${compactBody.slice(0, maxLength).trim()}...`;
}
