export const relative = (link?: string | undefined) => {
  const linkUrl = link ? new URL(link) : undefined;
  const linkPath = linkUrl ? `${linkUrl.pathname}${linkUrl.search}` : undefined;
  return linkPath;
};

export const getUrlParams = (url: string) => {
  const urlParams = new URLSearchParams(url);
  const params: Record<string, string> = {};
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
