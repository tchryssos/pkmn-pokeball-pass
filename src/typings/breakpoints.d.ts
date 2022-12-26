const breakpointSizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type BreakpointSize = typeof breakpointSizes[number];
export type BreakpointObject<T> = { [key in BreakpointSize]: T };
