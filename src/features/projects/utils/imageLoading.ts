/**
 * Image loading and lookup utilities for projects
 */
import { normalizeProjectKey } from './dataProcessing';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23e2e8f0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-family="Arial,sans-serif" font-size="40"></text></svg>';

const PROJECT_IMAGE_MODULES = import.meta.glob(
  '../../../assets/before after projects/*.{png,jpg,jpeg,PNG,JPG,JPEG}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>;

const PROJECT_IMAGE_BY_FILE_NAME = Object.entries(PROJECT_IMAGE_MODULES).reduce<
  Record<string, string>
>((acc, [path, url]) => {
  const fileName = path.split('/').pop()?.toLowerCase();
  if (fileName) acc[fileName] = url;
  return acc;
}, {});

/**
 * Get project image by file name
 */
export const getProjectImageByFileName = (fileName: string): string => {
  return PROJECT_IMAGE_BY_FILE_NAME[fileName.toLowerCase()] ?? PLACEHOLDER_IMAGE;
};

/**
 * Image lookup map for before/after images
 */
export const IMAGE_LOOKUP: Record<string, { beforeImage: string; afterImage: string }> = {
  [normalizeProjectKey('Kumbakonam')]: {
    beforeImage: getProjectImageByFileName('kumbakonam before.png'),
    afterImage: getProjectImageByFileName('kumbakonam after.png'),
  },
  [normalizeProjectKey('Sembakkam')]: {
    beforeImage: getProjectImageByFileName('SEMBAKKAM LAKE  before.png'),
    afterImage: getProjectImageByFileName('SEMBAKKAM LAKE  after.png'),
  },
  [normalizeProjectKey('Sector 54 NOIDA')]: {
    beforeImage: getProjectImageByFileName('noida before.png'),
    afterImage: getProjectImageByFileName('noida after.png'),
  },
  [normalizeProjectKey('Atladara- Vadodara')]: {
    beforeImage: getProjectImageByFileName('Atladara before.jpeg'),
    afterImage: getProjectImageByFileName('Atladara - after.jpeg'),
  },
  [normalizeProjectKey('Poonamallee')]: {
    beforeImage: getProjectImageByFileName('poonamallee before.png'),
    afterImage: getProjectImageByFileName('poonamallee after.png'),
  },
  [normalizeProjectKey('Vijayawada')]: {
    beforeImage: getProjectImageByFileName('VIJAYAWADA-AJITSINGH NAGAR before.png'),
    afterImage: getProjectImageByFileName('VIJAYAWADA-AJITSINGH NAGAR after.png'),
  },
  [normalizeProjectKey('Vairapalayam- Erode')]: {
    beforeImage: getProjectImageByFileName('Erode-Vairapalayam before.jpeg'),
    afterImage: getProjectImageByFileName('Erode-Vairapalayam after.jpg'),
  },
  [normalizeProjectKey('Pammal')]: {
    beforeImage: getProjectImageByFileName('pammal before.png'),
    afterImage: getProjectImageByFileName('pammal after.png'),
  },
  [normalizeProjectKey('Sector 145 NOIDA Phase 1')]: {
    beforeImage: getProjectImageByFileName('noida sector 145- before (1).png'),
    afterImage: getProjectImageByFileName('noida sector 145 after.png'),
  },
  [normalizeProjectKey('Sector 145 NOIDA Phase 2')]: {
    beforeImage: getProjectImageByFileName('Noida S-145 Site B-Before.jpg'),
    afterImage: getProjectImageByFileName('Noida S-145 Site B-After.jpg'),
  },
  [normalizeProjectKey('Tirupati')]: {
    beforeImage: getProjectImageByFileName('tirupathi before.png'),
    afterImage: getProjectImageByFileName('tirupathi before after.png'),
  },
  [normalizeProjectKey('Chidambaram')]: {
    beforeImage: getProjectImageByFileName('chidambaram before.png'),
    afterImage: getProjectImageByFileName('chidambaram after.png'),
  },
  [normalizeProjectKey('Pallavapuram')]: {
    beforeImage: getProjectImageByFileName('pallavaram before.jpg'),
    afterImage: getProjectImageByFileName('pallavaram after.png'),
  },
  [normalizeProjectKey('Karaikudi')]: {
    beforeImage: getProjectImageByFileName('karaikudi before.png'),
    afterImage: getProjectImageByFileName('karaikudi after.png'),
  },
  [normalizeProjectKey('Karur')]: {
    beforeImage: getProjectImageByFileName('karur before.png'),
    afterImage: getProjectImageByFileName('karur after.png'),
  },
  [normalizeProjectKey('Pachayankuppam- Cuddalore')]: {
    beforeImage: getProjectImageByFileName('Pachayankuppam - Cuddalore - before.jpeg'),
    afterImage: getProjectImageByFileName('Pachayankuppam - Cuddalore -after.jpeg'),
  },
  [normalizeProjectKey('Kollam')]: {
    beforeImage: getProjectImageByFileName('Kollam-Before.jpg'),
    afterImage: getProjectImageByFileName('Kollam-After.jpg'),
  },
  [normalizeProjectKey('Puducherry')]: {
    beforeImage: getProjectImageByFileName('Puducherry-Before..jpg'),
    afterImage: getProjectImageByFileName('Puducherry-After.jpg'),
  },
  [normalizeProjectKey('Muthusamy Colony')]: {
    beforeImage: getProjectImageByFileName('Erode- Muthusamy colony - before.jpeg'),
    afterImage: getProjectImageByFileName('Erode - Muthusamy colony - after.jpeg'),
  },
  [normalizeProjectKey('Dindigul')]: {
    beforeImage: getProjectImageByFileName('Dindigul-Before.jpg'),
    afterImage: getProjectImageByFileName('Dindigul-After.jpg'),
  },
  [normalizeProjectKey('Nagpur- Phase 1')]: {
    beforeImage: getProjectImageByFileName('Nagpur Bhandewadi-before.jpg'),
    afterImage: getProjectImageByFileName('Nagpur Bhandewadi-After.png'),
  },
  [normalizeProjectKey('Tiruchirappalli- Phase 1')]: {
    beforeImage: getProjectImageByFileName('Tiruchirappalli phase 1 - before.jpeg'),
    afterImage: getProjectImageByFileName('Tiruchirappalli phase 1 - after.jpeg'),
  },
  [normalizeProjectKey('Tiruchirappalli- Phase 2')]: {
    beforeImage: getProjectImageByFileName('Trichy Phase 2 before.jpeg'),
    afterImage: getProjectImageByFileName('Trichy Phase 2 after.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 1')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 1-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag-Phase 1-After.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 2')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 2-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag-Phase 2-After.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 3')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 3-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag-Phase 3-After.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 4')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 4-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag Phase 4 after.jpeg'),
  },
};

/**
 * Resolve project images by title
 */
export const resolveProjectImages = (title: string): { beforeImage: string; afterImage: string } => {
  return IMAGE_LOOKUP[normalizeProjectKey(title)] ?? {
    beforeImage: PLACEHOLDER_IMAGE,
    afterImage: PLACEHOLDER_IMAGE,
  };
};

/**
 * Get placeholder image (for ongoing projects without images)
 */
export const getPlaceholderImage = (): string => {
  return PLACEHOLDER_IMAGE;
};
