export function BackgroundPattern() {
    return (
      <svg className="fixed inset-0 -z-10 h-full w-full stroke-slate-200 dark:stroke-white">
        <defs>
          <pattern 
            id="pattern-26" 
            patternUnits="userSpaceOnUse" 
            width="12" 
            height="12"
            className="opacity-[0.05]"
          >
            <rect 
              width="2" 
              height="2" 
              x="0" 
              y="0" 
              fill="currentColor dark:fill-white"
              className="text-slate-800 dark:text-slate-100"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-26)" />
      </svg>
    )
  }