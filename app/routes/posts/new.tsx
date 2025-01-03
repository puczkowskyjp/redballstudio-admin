import NewPost from '~/pages/posts/new-post'
import type { Route } from './+types/new';

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  console.log("NewPostPage", formData);
}

export default function NewPostPage() {
  return <NewPost/>;
}
