import { IRule, mapOperator, mapFunctions } from "../@types/advanceRule";

const getOperatorSignal = (name: string): string => {
  const signal = mapOperator.get(name)?.signal;

  if (signal) return signal;

  return name;
};

export const buildStringRule = (rule: IRule): string => {
  const { functionName, operator, value, parameters } = rule;

  const nameFunc = mapFunctions.get(functionName)
    ? mapFunctions.get(functionName)
    : functionName;

  const params: string =
    functionName === "BIT_CHECK"
      ? `(${parameters.tag}, ${parameters.bit})`
      : `(${parameters.tag})`;

  return `${nameFunc} ${params} ${getOperatorSignal(operator)} ${value}`;
};
