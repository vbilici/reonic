import { render, fireEvent } from '@testing-library/react';
import ConfigForm from './Dashboard.form';

describe('ConfigForm', () => {
  const mockOnSubmit = jest.fn();
  it('renders the form correctly', () => {
    const { getByText } = render(<ConfigForm onSubmit={mockOnSubmit} />);

    expect(getByText('Number of Chargepoints:')).toBeInTheDocument();

    expect(getByText('Charging Power per Chargepoint (Kw):')).toBeInTheDocument();

    expect(getByText('Consumption of Cars:')).toBeInTheDocument();

    expect(getByText('Run The Simulation')).toBeInTheDocument();
  });

  it('calls onSubmit with the correct form state when submitted', () => {
    const { getByText, getByTestId } = render(<ConfigForm onSubmit={mockOnSubmit} />);

    const numberOfChargepointsInput = getByTestId('numberOfChargepoints');
    const chargingPowerInput = getByTestId('chargingPowerPerChargepoint');
    const consumptionOfCarsInput = getByTestId('consumptionOfCars');

    fireEvent.change(numberOfChargepointsInput, { target: { value: '30' } });
    fireEvent.change(chargingPowerInput, { target: { value: '15' } });
    fireEvent.change(consumptionOfCarsInput, { target: { value: '20' } });

    fireEvent.click(getByText('Run The Simulation'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      numberOfChargepoints: 30,
      chargingPowerPerChargepoint: 15,
      consumptionOfCars: 20,
      arrivalProbabilityMultiplier: 100
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ConfigForm onSubmit={mockOnSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });
});