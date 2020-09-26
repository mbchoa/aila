import * as z from 'zod'

export const addRestaurantSchema = z.object({
  cuisineType: z.string().min(1),
  name: z.string().min(1),
  tags: z.string().array().nonempty(),
});
