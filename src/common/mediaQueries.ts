export const breakpoints = {
  phone: 320,
  phoneWide: 480,
  tablet: 640,
  tabletWide: 880,
  laptop: 1024,
  desktop: 1440,
};

type MediaType = "max" | "min";

export const mq = (mediaType: MediaType) => {
  const result: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(breakpoints)) {
    result[key] =
      mediaType === "max"
        ? `@media (max-width: ${value}px)`
        : `@media (min-width: ${value}px)`;
  }
  return result;
};
