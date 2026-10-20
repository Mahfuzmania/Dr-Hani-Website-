import * as editorial from './20261020_000000_editorial_publications'
import * as curation from './20261020_010000_photo_curation'
export const migrations = [
  {
    up: editorial.up,
    down: editorial.down,
    name: '20261020_000000_editorial_publications',
  },
  {
    up: curation.up,
    down: curation.down,
    name: '20261020_010000_photo_curation',
  },
]
