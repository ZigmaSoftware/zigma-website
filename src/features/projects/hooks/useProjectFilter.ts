/**
 * Hook for managing project filters
 */
import { useState, useCallback, useEffect } from 'react';
import { Project } from '../types';

/**
 * Hook to manage project state filtering
 */
export const useProjectFilter = (projects: Project[]) => {
  const states = Array.from(new Set(projects.map((p) => p.state)));
  const [selectedState, setSelectedState] = useState<string>(states[0] || '');

  const filteredProjects = projects.filter((p) => p.state === selectedState);

  const handleStateSelect = useCallback((state: string) => {
    setSelectedState(state);
  }, []);

  // Ensure selected state is valid
  useEffect(() => {
    if (!states.length) return;
    if (!selectedState || !states.includes(selectedState)) {
      setSelectedState(states[0]);
    }
  }, [states, selectedState]);

  // Scroll to first project when state changes
  useEffect(() => {
    const firstProject = filteredProjects[0];
    if (!firstProject) return;

    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      const el = document.getElementById(`proj-${firstProject.id}`);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 130,
        behavior: 'smooth',
      });
    }, 0);
  }, [selectedState, filteredProjects]);

  return {
    states,
    selectedState,
    filteredProjects,
    handleStateSelect,
  };
};
