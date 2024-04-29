import { modes } from "./lib/const";

declare global {
  type SetStateFunction<Value> = (value: SetStateAction<Value>) => void;
  export type Modes = (typeof modes)[number];
  export type HandleAddTodo = (e: React.FormEvent<HTMLFormElement>) => void;
}
export default global;
