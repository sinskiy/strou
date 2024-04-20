interface CertainTime {
  hours: number;
  minutes: number;
}

interface Period {
  from: CertainTime;
  to: CertainTime;
}

interface Task {
  name: string;
  time?: CertainTime | Period;
}

export function parseSchedule(schedule: string): Task[] {
  const tasks = schedule.split("\n");

  const parsedSchedule: Task[] = tasks.map((task) => parseTask(task));
  return parsedSchedule;
}

function parseTask(task: string): Task {
  const parameters = task.split(" ");

  let parsedTask: any = {};

  parameters.forEach((parameter) => {
    if (isTime(parameter)) {
      parsedTask["time"] = toTime(parameter);
    } else {
      if (Object.hasOwn(parsedTask, "name")) {
        parsedTask["name"] += " " + parameter;
      } else {
        parsedTask["name"] = parameter;
      }
    }
  });

  return parsedTask;
}

function isTime(parameter: string): boolean {
  if (parameter.split(":").length > 1) {
    return true;
  } else {
    return false;
  }
}

function toTime(parameter: string): CertainTime | Period {
  const period = parameter.split("-");
  if (period.length === 2) {
    return toPeriod(period);
  } else if (period.length === 1) {
    return toCertainTime(parameter);
  }
  throw Error();
}

function toCertainTime(timeString: string): CertainTime {
  const [hours, minutes] = timeString.split(":").map((time) => Number(time));
  const time: CertainTime = {
    hours,
    minutes,
  };
  return time;
}

function toPeriod(period: string[]): Period {
  const [from, to] = period.map((time) => toCertainTime(time));
  const periodObject: Period = {
    from,
    to,
  };
  return periodObject;
}
