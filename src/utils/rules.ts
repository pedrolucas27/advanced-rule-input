const checkContainsLastCharacter = (
  str: string,
  character: string
): boolean => {
  const lastCharacter = str[str.length - 1];

  if (lastCharacter) {
    return lastCharacter === character;
  }

  return false;
};

const removeLastElement = (steps: string[]): string[] => {
  let indexLast = steps.length - 1;

  if (indexLast > -1) {
    return steps.filter((item, index) => index !== indexLast);
  }

  return [];
};

const buildStringRule = (steps: string[]): string => {
  let rule = "";

  for (let i = 0; i < steps.length; i++) {
    rule += steps[i];
  }

  return rule;
};

const buildParams = (value: string, func: "BitCheck" | "Value"): string => {
  if (func === "BitCheck") {
    return ` (${value}) `;
  } else {
    return ` (${value.trimStart()}) `;
  }
};

const getTextParamLastFunctionOfRule = (rule: string) => {
  let param: string = "";
  let parts = rule.split("(");

  if (parts.length > 0) {
    param = parts[parts.length - 1];
  }

  return param;
};

const replaceLast = (parts: string[], item: string): string[] => {
  let newData = removeLastElement(parts);

  if (newData.length < parts.length) {
    newData.push(item);
  }

  return newData;
};

export {
  checkContainsLastCharacter,
  removeLastElement,
  buildStringRule,
  buildParams,
  getTextParamLastFunctionOfRule,
  replaceLast,
};
