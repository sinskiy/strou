import type { Period } from "./datetimeTypes";

export interface Task extends Period {
  name: string;
}
