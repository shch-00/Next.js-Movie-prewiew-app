export default function capitalize(str: string): string {
  return str[0].toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}
