import { ChangeEventHandler } from "react";

declare global {
  declare type SetState<T> = Dispatch<SetStateAction<T>>;

  declare type HandleInputChange = ChangeEventHandler<HTMLInputElement>;
}
