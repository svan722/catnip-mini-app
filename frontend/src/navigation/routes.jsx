import Home from '@/pages/Home';
import Earn from '@/pages/Earn';
import Invite from '@/pages/Invite';
import Leaderboard from '@/pages/Leaderboard';
import Catnip from '@/pages/Catnip';
import Boost from '@/pages/Boost';

/**
 * @typedef {object} Route
 * @property {string} path
 * @property {import('react').ComponentType} Component
 * @property {string} [title]
 * @property {import('react').JSX.Element} [icon]
 */

/**
 * @type {Route[]}
 */
export const routes = [
  { path: '/', Component: Home },
  { path: '/earn', Component: Earn },
  { path: '/invite', Component: Invite },
  { path: '/leaderboard', Component: Leaderboard },
  { path: '/catnip', Component: Catnip },
  { path: '/boost', Component: Boost },
];
