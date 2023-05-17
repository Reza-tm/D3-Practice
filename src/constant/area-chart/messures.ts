export const width = 600;
export const messures = {
  margins: { top: 120, bottom: 120, left: 120, right: 120 },
  width: width,
  height: width,
  radius: width / 2,
};
export const boundsMessures = {
  width: messures.width - messures.margins.right - messures.margins.left,
  height: messures.height - messures.margins.top - messures.margins.bottom,
  radius: messures.radius - (messures.margins.left + messures.margins.right) / 2,
};
