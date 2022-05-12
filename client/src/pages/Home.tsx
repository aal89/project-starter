import React from 'react';
import { Link } from './components/Link';
import Listings from './components/Listings';

export const Home: React.FC = () => (
  <div>
    Hello world,
    {' '}
    <Link to="/test">this is a normal link</Link>
    .
    <Listings />
  </div>
);

export default Home;
