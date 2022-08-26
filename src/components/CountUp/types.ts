import React from 'react';

export interface ICountupProps {
  interval: number;
  value: number;
  decimal?: boolean;
  wrapper?: React.ElementType;
  thousandsUnit?: string; 
  millionsUnit?: string;
  billionsUnit?: string;
  trillionsUnit?: string;
  quadrillionsUnit?: string;
}
