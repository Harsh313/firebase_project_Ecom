'use server';

/**
 * @fileOverview Recommends products to the user based on their browsing history.
 *
 * - recommendProduct - A function that recommends a product to the user.
 * - RecommendProductInput - The input type for the recommendProduct function.
 * - RecommendProductOutput - The return type for the recommendProduct function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProductInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The user browsing history as a string of product names.'),
});
export type RecommendProductInput = z.infer<typeof RecommendProductInputSchema>;

const RecommendProductOutputSchema = z.object({
  productName: z.string().describe('The recommended clothing item name.'),
  reason: z.string().describe('The reason for the recommendation, explaining why it complements the user\'s style.'),
});
export type RecommendProductOutput = z.infer<typeof RecommendProductOutputSchema>;

export async function recommendProduct(input: RecommendProductInput): Promise<RecommendProductOutput> {
  return recommendProductFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductPrompt',
  input: {schema: RecommendProductInputSchema},
  output: {schema: RecommendProductOutputSchema},
  prompt: `You are a fashion stylist and personal shopper.

  Based on the user's browsing history of clothing items, recommend another clothing item and explain why it would be a good addition to their wardrobe.

  Browsing History: {{{browsingHistory}}}
  `,
});

const recommendProductFlow = ai.defineFlow(
  {
    name: 'recommendProductFlow',
    inputSchema: RecommendProductInputSchema,
    outputSchema: RecommendProductOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
