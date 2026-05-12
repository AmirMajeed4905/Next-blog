import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image: any;
      name: string;
      id: string;
      email: string;
      role: string;
    };
  }

  interface User {
    role: string;
  }
}