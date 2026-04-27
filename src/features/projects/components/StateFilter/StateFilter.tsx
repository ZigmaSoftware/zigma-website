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
    <nav className="sticky top-16 border-y border-border bg-background/95 backdrop-blur z-40">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-[5%] py-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">

        {/* Completed/Ongoing switcher + Private — shown first on mobile */}
        {(showTabSwitcher || showPrivateTab) && (
          <div className="flex items-center gap-2 sm:ml-auto sm:order-2 shrink-0">
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
                  className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:py-2 sm:text-sm ${
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
                  className={`relative z-10 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:py-2 sm:text-sm ${
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
        )}

        {/* State filter pills — horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pb-0 sm:order-1">
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

      </div>
    </nav>
  );
};
