export function msToHumanReadable(ms: number) {
  const minutes = String(Math.floor(ms / 60000));
  const seconds = String(Math.floor((ms % 600000) / 1000));
  console.log(ms);
  return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
