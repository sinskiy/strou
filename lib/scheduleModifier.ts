export function check(schedule: string, checked: boolean, index: number) {
  const tasks = schedule.split("\n");

  if (checked) {
    tasks[index] += " x";
  } else {
    tasks[index] = tasks[index].slice(0, -2);
  }
  return tasks.join("\n");
}
