import { Route } from "apps/website/flags/audience.ts";

const decoSiteMapUrl = "/sitemap/deco.xml";

const buildProxyRoutes = (
  {
    includeSiteMap,
    generateDecoSiteMap,
    excludePathsFromDecoSiteMap,
  }: {
    includeSiteMap?: string[];
    generateDecoSiteMap?: boolean;
    excludePathsFromDecoSiteMap: string[];
  },
) => {
  try {
    const [include, routes] = generateDecoSiteMap
      ? [[...(includeSiteMap ?? []), decoSiteMapUrl], [{
        pathTemplate: decoSiteMapUrl,
        handler: {
          value: {
            excludePaths: excludePathsFromDecoSiteMap,
            __resolveType: "website/handlers/sitemap.ts",
          },
        },
      }]]
      : [includeSiteMap, []];

    return [
      ...routes,
      {
        pathTemplate: "/sitemap.xml",
        handler: {
          value: {
            include,
            __resolveType: "website/handlers/sitemap.ts",
          },
        },
      },
      {
        pathTemplate: "/sitemap/*",
        handler: {
          value: {
            __resolveType: "website/handlers/sitemap.ts",
          },
        },
      },
    ];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export interface Props {
  /**
   * @title Other site maps to include
   */
  includeSiteMap?: string[];
  /**
   * @title If deco site map should be exposed at /deco-sitemap.xml
   */
  generateDecoSiteMap?: boolean;
  /**
   * @title Exclude paths from /deco-sitemap.xml
   */
  excludePathsFromDecoSiteMap?: string[];
}

/**
 * @title Sitemap
 */
function loader(
  {
    includeSiteMap = [],
    generateDecoSiteMap = true,
    excludePathsFromDecoSiteMap = [],
  }: Props,
  _req: Request,
): Route[] {
  return buildProxyRoutes({
    generateDecoSiteMap,
    excludePathsFromDecoSiteMap,
    includeSiteMap,
  });
}

export default loader;
