import * as migration_20250604_141200 from './20250604_141200';

export const migrations = [
  {
    up: migration_20250604_141200.up,
    down: migration_20250604_141200.down,
    name: '20250604_141200'
  },
];
