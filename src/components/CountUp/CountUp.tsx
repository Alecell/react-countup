import { useState } from 'react';
import useInterval from '../../utils/useInterval';
import { ICountupProps } from './types';

const MINIMUM_FRACTION_MS = 100;
const DEFAULT_WRAPPER = 'span';
const MILLION = 1_000_000;
const BILLION = 1_000_000_000;
const TRILLION = 1_000_000_000_000;
const QUADRILLION = 1_000_000_000_000_000;

const factor = (
  value: ICountupProps['value'],
  interval: ICountupProps['interval']
) => {
  let factorInterval = interval;
  let factorValue = value;

  while (factorInterval > MINIMUM_FRACTION_MS) {
    factorInterval /= 2;
    factorValue /= 2;
  }

  return {
    factorValue,
    factorInterval,
  }
};

function CountUp({ 
  millionsUnit, 
  billionsUnit, 
  trillionsUnit, 
  quadrillionsUnit, 
  ...props
}: ICountupProps) {
  const Wrapper = props.wrapper || DEFAULT_WRAPPER;
  const { factorValue, factorInterval } = factor(props.value, props.interval);
  const [value, setValue] = useState(0);
  const interval = props.value !== value ? factorInterval : null;
  const hasQuadrillionsUnit = value >= QUADRILLION && quadrillionsUnit;
  const hasTrillionsUnit = value >= TRILLION && trillionsUnit;
  const hasBillionsUnit = value >= BILLION && billionsUnit;
  const hasMillionsUnit = value >= MILLION && millionsUnit;

  const calcNextValue = () => {
    let nextValue = value + factorValue;

    if (nextValue > props.value) nextValue = props.value;
    
    return nextValue;
  };

  const renderValueWithUnit = () => {
    let result = value;
    let unit = '';

    if (hasMillionsUnit) {
      result = value / MILLION;
      unit = millionsUnit;
    }
    if (hasBillionsUnit) {
      result = value / BILLION
      unit = billionsUnit;
    }
    if (hasTrillionsUnit) {
      result = value / TRILLION
      unit = trillionsUnit;
    }
    if (hasQuadrillionsUnit) {
      result = value / QUADRILLION;
      unit = quadrillionsUnit;
    }

    if(!props.decimal) result = Math.round(result);

    return `${result} ${unit}`;
  };

  useInterval(() => {
    setValue(calcNextValue());
  }, interval);

  return (
    <div>
      <Wrapper>
        {renderValueWithUnit()}
      </Wrapper>
    </div>
  );
}

export default CountUp;
