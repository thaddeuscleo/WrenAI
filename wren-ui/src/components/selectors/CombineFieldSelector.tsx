import { useEffect, useState } from 'react';
import { Select, Input } from 'antd';

interface Value {
  model?: string;
  field?: string;
}

interface Props {
  modelOptions: { label: string; value: string }[];
  fieldOptions: { label: string; value: string }[];
  modelDisabled?: boolean;
  fieldDisabled?: boolean;
  modelValue?: string;
  fieldValue?: string;
  value?: Value;
  onModelChange?: (modelLabel: string) => void;
  onFieldChange?: (fieldLabel: string) => void;
  onChange?: (value: Value) => void;
}

export default function CombineFieldSelector(props: Props) {
  const {
    modelValue,
    fieldValue,
    value = {},
    onModelChange,
    onFieldChange,
    onChange,
    modelOptions,
    fieldOptions,
    modelDisabled,
    fieldDisabled,
  } = props;

  const [internalValue, setInternalValue] = useState<Value>({
    model: modelValue,
    field: fieldValue,
    ...value,
  });

  const syncOnChange = () => {
    if (internalValue?.model && internalValue?.field) {
      onChange && onChange(internalValue);
    }
  };

  useEffect(syncOnChange, [internalValue]);

  const changeModel = async (model: string, option) => {
    onModelChange && onModelChange(option.label);
    setInternalValue({ ...internalValue, model });
  };

  const changeField = (field: string, option) => {
    onFieldChange && onFieldChange(option.label);
    setInternalValue({ ...internalValue, field });
  };

  return (
    <Input.Group className="d-flex" compact>
      <Select
        style={{ width: 120 }}
        options={modelOptions}
        onChange={changeModel}
        placeholder="Model"
        value={value?.model || modelValue}
        disabled={modelDisabled}
      />
      <Select
        className="flex-grow-1"
        options={fieldOptions}
        onChange={changeField}
        placeholder="Field"
        value={value?.field || fieldValue}
        disabled={fieldDisabled}
      />
    </Input.Group>
  );
}
