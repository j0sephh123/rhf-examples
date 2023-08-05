export type SetValue = (
  newValue: string | ((prevState: string) => string)
) => void;
