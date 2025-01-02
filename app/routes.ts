import { 
  type RouteConfig, 
  index, 
  prefix,
  layout, 
  route 
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/dashboard.tsx"),
    ...prefix("posts", [
      index("routes/posts/manage-posts.tsx"),
      route("new", "routes/posts/new.tsx"),
      route("edit/:id", "routes/posts/edit.tsx"),
    ]),
  ]),
  layout("routes/auth-layout.tsx", [
    route("login", "routes/login.tsx"),
  ])
] satisfies RouteConfig;
