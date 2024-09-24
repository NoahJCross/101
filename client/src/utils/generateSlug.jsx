export function generateSlug(name) {
  if (name.toLowerCase() === "home") return "/";
  return "/" + name.replace(/\s+/g, "-").toLowerCase();
}
