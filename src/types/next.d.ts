declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template: string };
    description?: string;
    keywords?: string[];
    authors?: { name: string }[];
    openGraph?: any;
    twitter?: any;
  }

  export interface MetadataRoute {
    Robots: any;
    Sitemap: any;
  }
}

declare module 'next/image' {
  const Image: any;
  export default Image;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): any;
}
