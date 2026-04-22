import React from 'react';

interface StateFilterProps {
  states: string[];
  selectedState: string;
  onStateSelect: (state: string) => void;
  showTabSwitcher?: boolean;
  activeTab?: 'completed' | 'ongoing';
  onTabChange?: (tab: 'completed' | 'ongoing') => void;
  showPrivateTab?: boolean;
  isPrivateActive?: boolean;
  onPrivateTabClick?: () => void;
}

/**
 * State filter navigation component
 */
export const StateFilter: React.FC<StateFilterProps> = ({
  states,
  selectedState,
  onStateSelect,
  showTabSwitcher = false,
  activeTab = 'completed',
  onTabChange,
  showPrivateTab = false,
  isPrivateActive = false,
  onPrivateTabClick,
}) => {
  return (
    <nav className="sticky top-[64px] p-2 pt-4 overflow-x-auto overflow-y-hidden border-y border-border bg-background/95 backdrop-blur z-40">
      <div className="max-w-[1400px] mx-auto px-[5%] py-2 flex flex-wrap items-center gap-3">
        <div
          className="flex flex-1 gap-2 justify-start md:flex-wrap flex-nowrap"
        >
          {states.map((state) => (
            <button
              key={state}
              onClick={() => onStateSelect(state)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                !isPrivateActive && selectedState === state
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {showTabSwitcher && (
            <div className="relative inline-grid grid-cols-2 rounded-full border border-border bg-muted/60 p-1">
              <span
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                  activeTab === 'ongoing' ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
              <button
                type="button"
                onClick={() => onTabChange?.('completed')}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === 'completed'
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Completed
              </button>
              <button
                type="button"
                onClick={() => onTabChange?.('ongoing')}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === 'ongoing'
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Ongoing
              </button>
            </div>
          )}
          {showPrivateTab && (
            <button
              type="button"
              onClick={onPrivateTabClick}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isPrivateActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              Private Projects
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
