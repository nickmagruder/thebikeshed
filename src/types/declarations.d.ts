
// Declaration file for modules without TypeScript definitions
declare module 'lodash.memoize';

// SVG imports
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
