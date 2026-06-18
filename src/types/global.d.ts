declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

declare namespace React {
  namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}