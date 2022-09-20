import { AutoComplete } from "antd";
import { useEffect, useState } from "react";

import "./index.css";

interface Option {
  value: string;
}

const grammar = ["function", "params", "comparison", "value", "operator"];

const mapOptions = new Map();
mapOptions.set("function", [{ value: "BITCHECK" }, { value: "VALUE" }]);
mapOptions.set("comparison", [{ value: "=" }, { value: ">" }]);
mapOptions.set("operator", [{ value: "AND" }, { value: "OR" }]);

const App = () => {
  const [rule, setRule] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [stage, setStage] = useState<number>(0);

  const limitedStage = stage === 0 || stage === 2 || stage === 4;
  const inputValue = rule.join(" ");

  useEffect(() => {
    if (limitedStage) {
      setOptions(mapOptions.get(grammar[stage]));
    } else {
    }
  }, [stage]);

  const processInput = (value: string) => {
    if (value.length < inputValue.length) {
      limitedStage ? processBackSpaceOptions() : processBackSpace();
      return;
    }

    if (value.endsWith(" ")) {
      if (stage + 1 === 2) {
        const lastElement = rule[rule.length - 1];
        if (!lastElement.includes(")"))
          setRule([...updateTextDigitLastElement(")")]);
      }
      setStage(stage + 1 > 4 ? 0 : stage + 1);
    } else {
      if (stage === 1 || stage === 3) {
        setRule([...updateTextDigitLastElement(value[value.length - 1])]);
      }
    }
  };

  const onSelect = (value: string) => {
    setStage(stage + 1 > 4 ? 0 : stage + 1);

    if (stage === 0) {
      setRule([...rule, value, "("]);
    } else if (stage === 2) {
      setRule([...rule, value, ""]);
    } else {
      setRule([...rule, value]);
    }
  };

  /*
    Stages: 0 -> 4 (A transição de "Stages" é feita com a tecla de espaço)
    0 - Função
    1 - Parâmetros (dígito)
    2 - Operador
    3 - Valor (dígito)
    4 - Operador lógico
    
    0, 1, 2 ... 0, 1, 2, ....
  */

  const updateTextDigitLastElement = (value: string): string[] => {
    const tempRule = rule;
    tempRule[tempRule.length - 1] = tempRule[tempRule.length - 1].concat(value);

    return tempRule;
  };

  const updateTextBackSpaceLastElement = (): string[] => {
    const tempRule = rule;
    tempRule[tempRule.length - 1] = tempRule[tempRule.length - 1].slice(0, -1);

    return tempRule;
  };

  const processBackSpace = () => {
    if (stage === 1) {
      const lastStageOne = rule[rule.length - 1];
      if (lastStageOne.length - 1 === 0) {
        setRule([...rule.slice(0, -2)]);
        setStage(stage - 1);
      } else {
        setRule([...updateTextBackSpaceLastElement()]);
      }
    } else if (stage === 3) {
      const lastStageThree = rule[rule.length - 1];
      if (lastStageThree.length === 0) {
        setRule(rule.slice(0, -2));
        setStage(stage - 2);
      } else {
        setRule([...updateTextBackSpaceLastElement()]);
      }
    }
  };

  const processBackSpaceOptions = () => {
    setRule([...rule.slice(0, -1)]);
    setStage(stage - 1 < 0 ? 4 : stage - 1);
  };

  return (
    <div className="container-app">
      <div className="container-input">
        <AutoComplete
          className="input-component"
          size="large"
          value={inputValue}
          autoFocus={true}
          options={options}
          onChange={(value) => processInput(value)}
          onSelect={onSelect}
          open={limitedStage}
        />
      </div>
      <div className="helpers-rule">
        <p>
          <strong>Descrição</strong>
        </p>
        <p>
          <strong>Funções</strong>: BitCheck (<mark>param1</mark>,{" "}
          <mark>param2</mark>), Value (<mark>param1</mark>).
        </p>
        <p>
          <strong>Operadores de comparação</strong>:<mark>{">"}</mark>,
          <mark>{"="}</mark>
        </p>
        <p>
          <strong>Operadores lógicos</strong>: <mark>AND</mark>, <mark>OR</mark>
        </p>
      </div>
    </div>
  );
};

export default App;
