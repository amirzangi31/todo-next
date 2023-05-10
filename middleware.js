export { default } from "next-auth/middleware";


export const config = { matcher: ["/todo/:path*" , "/add-todo" , "/profile/:path*"] }