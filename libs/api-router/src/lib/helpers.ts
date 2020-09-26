import { CuisineTag } from '@aila/api-interfaces';

export function parseCuisineTags(input: string): CuisineTag[] {
  return input.split(',') as CuisineTag[];
}
