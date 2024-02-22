import { render } from '@testing-library/react';
import DashboardResults from './Dashboard.results';

describe('DashboardResults', () => {
  const mockResults = {
    totalEnergyConsumed: 100,
    theoreticalMaxDemand: 10,
    peakPowerDemand: 5,
    concurrencyFactor: 80,
  };

  it('renders the correct values', () => {
    const { getByText } = render(<DashboardResults {...mockResults} />);

    expect(getByText('Total Energy Consumed')).toBeInTheDocument();
    expect(getByText('100.00 KWh')).toBeInTheDocument();

    expect(getByText('Theoritical Max Demand')).toBeInTheDocument();
    expect(getByText('10 KW')).toBeInTheDocument();

    expect(getByText('Peak Power Demand')).toBeInTheDocument();
    expect(getByText('5 KW')).toBeInTheDocument();

    expect(getByText('Concurrency Factor')).toBeInTheDocument();
    expect(getByText('80 %')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<DashboardResults {...mockResults} />);
    expect(container).toMatchSnapshot();
  });
});