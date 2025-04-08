export default function minutesToTimeString(minutes: number) {
  const runtime = `${Math.floor(minutes / 60)} ч ${minutes % 60} мин`
  return runtime
}
