import Color from 'color';

export function adjustSaturation(color: string, amount: number): string {
  const original = Color(color);

  const increasedSaturation = Math.min(
    100,
    original.saturationl() + amount * 100
  );

  const decreasedLightness = Math.max(0, original.lightness() - amount * 100);

  const modified = original
    .saturationl(increasedSaturation)
    .lightness(decreasedLightness);

  return modified.hex();
}
