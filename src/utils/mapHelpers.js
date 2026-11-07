export const generateShareUrl = (locationId) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?location=${locationId}`;
};

export const getLocationIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('location');
};

export const getVisitListFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const visitList = params.get('visitList');
  if (visitList) {
    return visitList.split(',');
  }
  return [];
};

export const convertPercentToPixels = (percentX, percentY, containerWidth, containerHeight) => {
  return {
    x: (percentX / 100) * containerWidth,
    y: (percentY / 100) * containerHeight,
  };
};

export const convertPixelsToPercent = (pixelX, pixelY, containerWidth, containerHeight) => {
  return {
    x: (pixelX / containerWidth) * 100,
    y: (pixelY / containerHeight) * 100,
  };
};
