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
  productName: z.string().describe('The recommended product name.'),
  reason: z.string().describe('The reason for the recommendation.'),
});
export type RecommendProductOutput = z.infer<typeof RecommendProductOutputSchema>;

export async function recommendProduct(input: RecommendProductInput): Promise<RecommendProductOutput> {
  return recommendProductFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductPrompt',
  input: {schema: RecommendProductInputSchema},
  output: {schema: RecommendProductOutputSchema},
  prompt: `You are a product recommendation expert.

  Based on the user's browsing history, recommend a product and explain why.

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
