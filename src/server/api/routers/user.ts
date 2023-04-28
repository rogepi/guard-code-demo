import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { AES } from "crypto-js";

export const exampleRouter = createTRPCRouter({
  loginByPassword: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username }
      })
      return {
        ok: user?.password === input.password
      }
    }),
  signIn: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username }
      })
      if (user) {
        return {
          message: 'User already exists',
          ok: false
        }
      } else {
        await ctx.prisma.user.create({
          data: {
            username: input.username,
            password: input.password,
            guardSlat: AES.encrypt(input.username, input.password).toString()
          }
        })
        return {
          ok: true
        }
      }
    }),
});
