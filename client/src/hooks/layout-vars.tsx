import { useOutletContext } from 'react-router-dom';
import { SetLayoutContext } from '../pages/components/Layout';

export const useLayoutVars = () => useOutletContext<SetLayoutContext>();
