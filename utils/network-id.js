export const networkID = (fromID, toID) => {
  if (fromID < toID) return `${fromID}-${toID}`;
  return `${toID}-${fromID}`;
};
