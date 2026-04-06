/**
 * Interactive metrics building for projects
 */
import { Project, InteractiveMetric } from '../types';
import { formatIndian } from './formatting';

/** Project limits for progress calculations */
export interface ProjectLimits {
  waste: number;
  land: number;
  co2: number;
}

/**
 * Build interactive metrics from a project
 */
export const buildInteractiveMetrics = (
  project: Project,
  limits: ProjectLimits,
): InteractiveMetric[] => {
  const status = project.status === 'ongoing' ? 'Ongoing' : 'Completed';
  const timeline = (project.focus || '')
    .replace(/^Project timeline:\s*/i, '')
    .replace(/\.$/, '')
    .replace(/\s*-\s*/g, ' - ')
    .trim();

  return [
    {
      key: 'waste',
      label: 'Waste Processed',
      railValue: project.waste > 0 ? `${formatIndian(project.waste)} m3` : 'No data',
      eyebrow: 'Operations',
      title: 'Waste Processed',
      displayValue: project.waste > 0 ? formatIndian(project.waste) : '-',
      unit: 'CUBIC METERS',
      status,
      progress: Math.min(100, Math.round((project.waste / limits.waste) * 100)),
      details: [],
    },
    {
      key: 'land',
      label: 'Land Reclaimed',
      railValue: project.land > 0 ? `${formatIndian(project.land)} Acres` : 'No data',
      eyebrow: 'Restoration',
      title: 'Land Reclaimed',
      displayValue: project.land > 0 ? formatIndian(project.land) : '-',
      unit: 'ACRES RESTORED',
      status,
      progress: Math.min(100, Math.round((project.land / limits.land) * 100)),
      details: [],
    },
    {
      key: 'co2',
      label: 'CO2 Mitigated',
      railValue: project.co2 > 0 ? `${formatIndian(project.co2)} MT` : 'No data',
      eyebrow: 'Climate',
      title: 'CO2 Mitigated',
      displayValue: project.co2 > 0 ? formatIndian(project.co2) : '-',
      unit: 'METRIC TONS',
      status,
      progress: Math.min(100, Math.round((project.co2 / limits.co2) * 100)),
      details: [],
    },
    {
      key: 'recovery',
      label: 'Project Status',
      railValue: timeline,
      eyebrow: 'Efficiency',
      title: 'Project Status',
      displayValue: status,
      unit: 'CURRENT PROJECT STAGE',
      status,
      progress: project.status === 'completed' ? 100 : 72,
      details: [
        { label: 'Project Timeline', value: timeline || 'Not available' },
      ],
    },
  ];
};

/**
 * Calculate project limits from an array of projects
 */
export const calculateProjectLimits = (projects: Project[]): ProjectLimits => {
  return projects.reduce(
    (acc, p) => ({
      waste: Math.max(acc.waste, p.waste),
      land: Math.max(acc.land, p.land),
      co2: Math.max(acc.co2, p.co2),
    }),
    { waste: 1, land: 1, co2: 1 },
  );
};
