import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { AES } from "crypto-js";
import { generateCode } from "~/utils";

export const userRouter = createTRPCRouter({
  signInByPassword: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username }
      })
      if (!user) return {
        ok: false,
        message: "User not found"
      }
      return {
        ok: user?.password === input.password,
        codeSalt: user?.guardSalt as string
      }
    }),
  signInByCode: publicProcedure
    .input(z.object({ username: z.string(), code: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username }
      })
      if (!user) return {
        ok: false,
        message: "User not found"
      }

      console.log(generateCode(user?.guardSalt as string), input.code)
      return {
        ok: generateCode(user?.guardSalt as string) === input.code,
        codeSalt: user?.guardSalt as string
      }
    })
  ,
  signUp: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username }
      })
      if (user?.password === input.password) {
        return {
          ok: false,
          messgage: "User already exists"
        }
      } else {
        await ctx.prisma.user.create({
          data: {
            username: input.username,
            password: input.password,
            guardSalt: AES.encrypt(input.password, input.username).toString()
          }
        })
        return {
          ok: true,
        }
      }

    })

});
