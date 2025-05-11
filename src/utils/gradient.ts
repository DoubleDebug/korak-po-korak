export function generateConicGradientCss(colors: string[]) {
  const numberOfSlices = colors.length;
  if (numberOfSlices <= 0) {
    return "none"; // Or a default color
  }

  const sliceAngle = 360 / numberOfSlices;
  let gradientString = "conic-gradient(";
  let currentAngle = 0;

  for (let i = 0; i < numberOfSlices; i++) {
    const color = colors[i % colors.length]; // Cycle through colors if not enough
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    gradientString += `${color} ${startAngle}deg ${endAngle}deg`;

    if (i < numberOfSlices - 1) {
      gradientString += ", ";
    }
    currentAngle = endAngle;
  }

  gradientString += ")";
  return gradientString;
}
