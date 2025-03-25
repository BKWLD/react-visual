// Get all the data attributes from a props object
export function collectDataAttributes(props: object): object {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => {
      return key.startsWith("data-");
    }),
  );
}
