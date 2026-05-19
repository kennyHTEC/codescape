import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { HomeScreen } from '../src/components/HomeScreen';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('HomeScreen', () => {
  it('renders section card and navigates to first concept', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText('JavaScript'));

    expect(getByText('Explore object-oriented programming concepts in JavaScript.')).toBeTruthy();
    expect(push).toHaveBeenCalledWith('/javascript/inheritance');
  });
});
