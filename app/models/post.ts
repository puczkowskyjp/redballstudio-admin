import * as z from "zod";

type Post = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author_id: number;
  slug: string;
  category: string;
  // status: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
};

type PostDTO = Partial<Post>;

export const PostSchema = z.object({
  // id: z.number().optional(),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters long",
  }),
  excerpt: z.string().min(10, {
    message: "Excerpt must be at least 10 characters long",
  })
});

type zPostSchema = z.infer<typeof PostSchema>

export type {
  Post,
  PostDTO,
  zPostSchema
}