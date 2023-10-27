export function translateGestureToEmoji(gesture: string): string {
  switch (gesture) {
    case "Unknown":
      return "❓";
    case "Closed_Fist":
      return "✊";
    case "Open_Palm":
      return "👋";
    case "Pointing_Up":
      return "☝️";
    case "Thumb_Down":
      return "👎";
    case "Thumb_Up":
      return "👍";
    case "Victory":
      return "✌️";
    case "ILoveYou":
      return "🤟";
    default:
      return "";
  }
}
