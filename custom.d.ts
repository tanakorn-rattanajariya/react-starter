declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.ttf" {
  const value: any;
  export = value;
}

declare module "*.less" {
  const value: any;
  export = value;
}
