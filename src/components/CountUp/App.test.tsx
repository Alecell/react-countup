import { render, waitFor } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';

import Countup from './CountUp';

describe('CountUp Component', () => {
  it('renders the CountUp component', () => {
    const interval = 3000;
    const value = 399;
  
    const { getByText } = render(
      <Countup interval={interval} value={value} />
    );
    const container = getByText(/\d+/);
  
    expect(container).toBeInTheDocument();
  });

  it('starts the value as zero', async () => {
    const interval = 200;
    const value = 3_000_000_000;
    
    const { getByText } = render(
      <Countup interval={interval} value={value} />
    );
    const container = getByText(/\d+/);
    
    expect(container.textContent?.trim()).toBe("0")
  });

  it('displays a value between the max value and zero', async () => {
    const interval = 4500;
    const value = 500;
    
    const { getByText } = render(
      <Countup interval={interval} value={value} />
    );
    const container = getByText(/\d+/);
    
    await waitFor(() => {
      const currentValue = parseInt(container.textContent!, 10);
      const isBetween = currentValue > 0 && currentValue < value;
      
      expect(isBetween).toBeTruthy();
    }, { timeout: interval/2 });
  });
  
  it('displays the full value after the provided interval', async () => {
    const interval = 3700;
    const value = 14502;
    
    const { getByText } = render(
      <Countup interval={interval} value={value} />
    );
    const container = getByText(/\d+/);
    
    await waitFor(() => expect(container.textContent?.trim()).toBe(`${value}`), {
      timeout: interval
    })
  });

  it('can have decimal places', async () => {
    const interval = 1000;
    const value = 560014;
    
    const { getByText } = render(
      <Countup decimal interval={interval} value={value} />
    );

    const container = getByText(/\d+/);
    
    await waitFor(() => {
      const hasDecimal = /\./.test(container.textContent!);

      expect(hasDecimal).toBeTruthy()
    }, { timeout: interval/3 })
  });

  it('can have a custom wrapper', async () => {
    type TWrapper = React.FC<PropsWithChildren>;
    
    const className = 'foo-bar'
    const interval = 2000;
    const value = 80000;

    const wrapper: TWrapper  = ({ children }) => (
      <div className={className}>{children}</div>
    );
    
    const { getByText } = render(
      <Countup
        interval={interval}
        value={value}
        wrapper={wrapper}
      />
    );

    const container = getByText(/\d+/);
    expect(container.className).toBe(className)
  });

  it('supports custom unit for million', async () => {
    const interval = 2000;
    const value = 3_000_000;
    const unit = 'mi';
    
    const { getByText } = render(
      <Countup
        interval={interval}
        value={value}
        millionsUnit={unit}
      />
    );
    
    const unitRegex = new RegExp(unit, 'g');
    
    await waitFor(() => {
      const container = getByText(unitRegex);
      expect(container).toBeInTheDocument();
    }, { timeout: interval })
  });

  it('supports custom unit for billion', async () => {
    const interval = 4000;
    const value = 3_000_000_000;
    const unit = 'bi';
    
    const { getByText } = render(
      <Countup
        interval={interval}
        value={value}
        billionsUnit={unit}
      />
    );
    
    const unitRegex = new RegExp(unit, 'g');
    
    await waitFor(() => {
      const container = getByText(unitRegex);
      expect(container).toBeInTheDocument();
    }, { timeout: interval })
  });

  it('supports custom unit for trillion', async () => {
    const interval = 4000;
    const value = 3_000_000_000_000;
    const unit = 'tri';
    
    const { getByText } = render(
      <Countup
        interval={interval}
        value={value}
        trillionsUnit={unit}
      />
    );
    
    const unitRegex = new RegExp(unit, 'g');
    
    await waitFor(() => {
      const container = getByText(unitRegex);
      expect(container).toBeInTheDocument();
    }, { timeout: interval })
  });

  it('supports custom unit for quadrillion', async () => {
    const interval = 3000;
    const value = 3_000_000_000_000_000;
    const unit = 'quad';
    
    const { getByText } = render(
      <Countup
        interval={interval}
        value={value}
        quadrillionsUnit={unit}
      />
    );
    
    const unitRegex = new RegExp(unit, 'g');
    
    await waitFor(() => {
      const container = getByText(unitRegex);
      expect(container).toBeInTheDocument();
    }, { timeout: interval })
  });
})

