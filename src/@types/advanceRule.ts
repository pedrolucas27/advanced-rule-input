enum Operators {
  EQUAL = "EQUAL",
  LARGER = "LARGER",
  SMALLER = "SMALLER",
  GREATER_EQUAL = "GREATER_EQUAL",
  LESS_EQUAL = "LESS_EQUAL",
  DIFFERENT = "DIFFERENT",
}

interface IOperator {
  name: Operators;
  label: string;
  signal: string;
}

interface Parameter {
  label: string;
  type: "text" | "number";
}

interface IParameterValue {
  tag: string;
  bit?: number;
}

export interface IOptions {
  name: string;
  label: string;
}

export interface IFunctionParameters {
  nameFunction: string;
  parameters: Parameter[];
}

export interface IRule {
  functionName: string;
  parameters: IParameterValue;
  operator: string;
  value: string;
}

export type AdvanceRuleProps = {
  functions: IOptions[];
  parameters: IFunctionParameters[];
  operators?: IOptions[];
  defaultFunction?: string;
  addRule: (rule: IRule) => void;
};

export type RuleLineProps = {
  rules: IFunctionParameters;
  addRule: (rule: IRule) => void;
};

export const comparisonOperators: IOperator[] = [
  { name: Operators.EQUAL, label: "Igual", signal: "=" },
  { name: Operators.SMALLER, label: "Menor", signal: "<" },
  { name: Operators.LARGER, label: "Maior", signal: ">" },
  { name: Operators.GREATER_EQUAL, label: "Maior igual", signal: ">=" },
  { name: Operators.LESS_EQUAL, label: "Menor igual", signal: "<=" },
  { name: Operators.DIFFERENT, label: "Diferente", signal: "!=" },
];

const mapOperator = new Map();

mapOperator.set("EQUAL", {
  name: Operators.EQUAL,
  label: "Igual",
  signal: "=",
});
mapOperator.set("SMALLER", {
  name: Operators.SMALLER,
  label: "Menor",
  signal: "<",
});
mapOperator.set("LARGER", {
  name: Operators.LARGER,
  label: "Maior",
  signal: ">",
});
mapOperator.set("GREATER_EQUAL", {
  name: Operators.GREATER_EQUAL,
  label: "Maior igual",
  signal: ">=",
});
mapOperator.set("LESS_EQUAL", {
  name: Operators.LESS_EQUAL,
  label: "Igual",
  signal: "<=",
});
mapOperator.set("DIFFERENT", {
  name: Operators.DIFFERENT,
  label: "Diferente",
  signal: "!=",
});

const mapFunctions = new Map();

mapFunctions.set("BIT_CHECK", "BitCheck");
mapFunctions.set("VALUE", "Valor");

export { mapOperator, mapFunctions };
