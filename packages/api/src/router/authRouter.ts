/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { supabaseClient } from "@bb/auth";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const LoginPayload = z.object({
  email: z.string(),
  emailRedirectTo: z.optional(z.string())
})

export type LoginPayload = z.infer<typeof LoginPayload>

export const authRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return ctx.db.profiles.findFirstOrThrow({
      where: {
        id: ctx.user.id,
      },
    });
  }),
  login: publicProcedure
    .input(LoginPayload)
    .mutation( async ({ ctx, input }) => {
      const res = await supabaseClient().auth.signInWithOtp({
        email: input.email,
        options: {
          emailRedirectTo: input?.emailRedirectTo ?? ""
        }
      })
      console.log({res})
      return res
  })
});