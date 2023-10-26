export const colors = [
  '#ff49b0',
  '#66c7f4',
  '#28666e',
  '#553e4e',
  '#a4243b',
  '#40c9a2',
  '#ffbafd',
  '#f9b3d1',
]

export const generateHighContrastColor = () => {
  // Generate a random hue value between 0 and 360
  const hue = Math.floor(Math.random() * 360);

  // Set high saturation and lightness values
  const saturation = 80; // Adjust this value for desired saturation
  const lightness = 50;  // Adjust this value for desired lightness

  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hueToRgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  return `rgb(${r}, ${g}, ${b})`;
}

export const COLOR_MODE_FALLBACK = 'dark'
