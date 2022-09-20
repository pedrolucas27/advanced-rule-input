import { useEffect, useState } from "react";
import AdvanceRule from "../../components/advancedRule";

import { IFunctionParameters, IOptions, IRule } from "../../@types/advanceRule";
import { buildStringRule } from "../../utils/advancedRule";

const rulesFunctions: IOptions[] = [
  { name: "VALUE", label: "Valor" },
  { name: "BIT_CHECK", label: "BitCheck" },
];

const logicalOperators: IOptions[] = [
  { name: "AND", label: "AND" },
  { name: "OR", label: "OR" },
];

const parametersFunctions: IFunctionParameters[] = [
  { nameFunction: "VALUE", parameters: [{ label: "Tag", type: "text" }] },
  {
    nameFunction: "BIT_CHECK",
    parameters: [
      { label: "Tag", type: "text" },
      { label: "Bit", type: "number" },
    ],
  },
];

const Aplicativo = () => {
  const [rules, setRules] = useState<IRule[]>([]);
  const [stringRule, setStringRule] = useState<string>("");

  useEffect(() => {
    console.log(rules);
    if (rules.length > 0) {
      const lastRule: IRule = rules[rules.length - 1];
      setStringRule(stringRule.concat(buildStringRule(lastRule)));
    }
  }, [rules]);

  return (
    <div style={{ margin: 50 }}>
      <AdvanceRule
        defaultFunction="BIT_CHECK"
        functions={rulesFunctions}
        parameters={parametersFunctions}
        operators={logicalOperators}
        addRule={(rule) => setRules([...rules, rule])}
      />

      <div className="build-role">
        <p>{stringRule}</p>
      </div>
    </div>
  );
};

export default Aplicativo;
