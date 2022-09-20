import { ReactElement, useEffect, useState } from "react";

import { Radio, Space } from "antd";

import RuleLine from "./organisms/ruleLine";
import {
  AdvanceRuleProps,
  IFunctionParameters,
  IRule,
} from "../../@types/advanceRule";

const AdvanceRule = ({
  functions,
  parameters,
  defaultFunction,
  operators,
  addRule,
}: AdvanceRuleProps): ReactElement => {
  const [funcSelected, setFuncSelected] = useState<string | undefined>(
    defaultFunction
  );
  const [parametersByFunction, setParametersByFunction] =
    useState<IFunctionParameters | null>(null);

  useEffect(() => {
    if (funcSelected) {
      getParametersByFunction();
    }
  }, [funcSelected]);

  const getParametersByFunction = () => {
    setParametersByFunction(
      parameters.filter((item) => item.nameFunction === funcSelected)[0]
    );
  };

  const checkRule = (rule: IRule) => {
    if (funcSelected) addRule({ ...rule, functionName: funcSelected });
  };

  return (
    <div className="container-advance-rule">
      <div className="container-main">
        <Space direction="horizontal" size="large">
          <Radio.Group
            onChange={(e) => setFuncSelected(e.target.value)}
            defaultValue={defaultFunction}
            buttonStyle="solid"
          >
            {functions.map((func) => (
              <Radio.Button key={func.name} value={func.name}>
                {func.label}
              </Radio.Button>
            ))}
          </Radio.Group>

          {operators && (
            <Radio.Group buttonStyle="solid">
              {operators.map((op) => (
                <Radio.Button key={op.name} value={op.name}>
                  {op.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          )}
        </Space>
      </div>
      {funcSelected && parametersByFunction && (
        <div className="container-rule-line">
          <RuleLine
            key={parametersByFunction.nameFunction}
            rules={parametersByFunction}
            addRule={(rule) => checkRule(rule)}
          />
        </div>
      )}
    </div>
  );
};

export default AdvanceRule;
