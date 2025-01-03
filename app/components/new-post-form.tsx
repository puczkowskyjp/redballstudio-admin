import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { PostSchema, type zPostSchema } from "~/models/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as RRForm } from "react-router";
import RichTextEditor from "./tip-tap";

export default function NewPostForm() {
  const form = useForm<zPostSchema>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
    },
    mode: "onChange",
  });

  console.log("form", form);

  return (
    <RRForm method="post" className="space-y-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Post Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Excerpt</FormLabel>
              <FormControl>
                <Input placeholder="Post Excerpt" {...field} />
              </FormControl>
              <FormMessage />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Content</FormLabel>
              <FormControl>
                <RichTextEditor content={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          // disabled={
          //   status === "executing" ||
          //   !form.formState.isValid ||
          //   !form.formState.isDirty
          // }
          type="submit"
        >
          Save Post
          {/* {editMode ? "Save Changes" : "Create Product"} */}
        </Button>
      </Form>
    </RRForm>
  )
}


