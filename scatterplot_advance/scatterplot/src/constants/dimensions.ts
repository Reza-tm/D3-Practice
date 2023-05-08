export const createDimensions = (parent: HTMLDivElement) => {
  const dimensions = {
    width: parent.clientWidth,
    height: parent.clientHeight,
    margin: {
      top: 20,
      bottom: 60,
      left: 60,
      right: 30,
    },
  };

  return {
    ...dimensions,
    boundsWidth: dimensions.width - dimensions.margin.left - dimensions.margin.right,
    boundsHeight: dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
  };
};
