import { ReactElement, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Row, Col, Button, Select, Form } from "antd";

import {
  RuleLineProps,
  comparisonOperators,
  IRule,
} from "../../../../@types/advanceRule";
import Input from "antd/lib/input/Input";

const RuleLine = ({ rules, addRule }: RuleLineProps): ReactElement => {
  const [form] = Form.useForm();
  const [rule, setRule] = useState<IRule>({} as IRule);

  const maskOnlyNumber = (text: string): number => {
    let n: string = "";

    if (text) {
      n = String(text).replace(/\D/g, "");
    }

    return isNaN(Number(n)) ? 0 : Number(n);
  };

  const onChangeValueRule = (value: string) => setRule({ ...rule, value });

  const onChangeParams = (value: string, type: "text" | "number") => {
    if (type === "number") {
      setRule({
        ...rule,
        parameters: { ...rule.parameters, bit: maskOnlyNumber(value) },
      });
    } else {
      setRule({
        ...rule,
        parameters: { ...rule.parameters, tag: value },
      });
    }
  };

  const submit = (rule: IRule) => {
    form.resetFields();
    setRule({} as IRule);
    addRule(rule);
  };

  return (
    <Form form={form}>
      <Row gutter={[15, 15]}>
        {rules.parameters.map((param) => (
          <Col key={param.label} span={6}>
            <Form.Item name={param.label}>
              <Input
                placeholder={param.label}
                onChange={(e) => onChangeParams(e.target.value, param.type)}
              />
            </Form.Item>
          </Col>
        ))}
        <Col span={4}>
          <Form.Item name="operator">
            <Select
              placeholder="Operador"
              onChange={(operator) => setRule({ ...rule, operator })}
              className="input-rule"
            >
              {comparisonOperators.map((op) => (
                <Select.Option key={op.name}>
                  {`${op.label} (${op.signal})`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="value">
            <Input
              placeholder="Valor"
              onChange={(e) => onChangeValueRule(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => submit(rule)}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default RuleLine;
