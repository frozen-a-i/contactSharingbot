import { MyContext } from "../bot";
import { knex } from "./database";

export async function createUser(ctx: MyContext, phone_number: string) {
  return await knex("contacts").insert({
    user_id: ctx.from!.id,
    first_name: ctx.from?.first_name,
    last_name: ctx.from?.last_name,
    phone_number,
  });
}
export async function getUser(user_id: number) {
  const id = user_id;
  return await knex("contacts").select("*").where({ user_id: id }).first();
}
