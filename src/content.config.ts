import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('General'),
    publishedAt: z.coerce.date(),
    publishAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    references: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
      type: z.string().optional(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    publishAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, thoughts };
