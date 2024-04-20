declare global {
  type SetStateFunction<Value> = (value: SetStateAction<Value>) => void;
}
export default global;
