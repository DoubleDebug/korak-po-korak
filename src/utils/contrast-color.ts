export function getContrastColor(bgColor: string | undefined) {
  switch (bgColor) {
    case "limegreen":
    case "tomato":
    case "orange":
      return "black";
    default:
      return "white";
  }
}
