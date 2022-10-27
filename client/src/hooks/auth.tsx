import { useContext } from 'react';
import { AuthContext } from '../providers/auth';

export const useAuth = () => useContext(AuthContext);
