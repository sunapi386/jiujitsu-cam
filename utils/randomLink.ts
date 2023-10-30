function generateRandomCharacter(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateSegment(): string {
  let segment = "";
  for (let i = 0; i < 4; i++) {
    segment += generateRandomCharacter();
  }
  return segment;
}

export default function generateMeetLink(): string {
  return `${generateSegment()}-${generateSegment()}-${generateSegment()}`;
}
