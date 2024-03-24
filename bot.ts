import { Bot, session } from "grammy";

import {
  Conversation,
  ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { Context } from "grammy";
import { config } from "dotenv";
import { getUser } from "./db/actions";
import { getPhone } from "./user/getPhone";
import { groupsMenu } from "./menus/groupsLink";

config();

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

const bot = new Bot<MyContext>(process.env.BOT_TOKEN || "");

bot.use(
  session({
    initial() {
      return {};
    },
  })
);
bot.use(groupsMenu);
bot.use(conversations());
bot.use(createConversation(getPhone));

bot.command("start", async (ctx) => {
  const user = await getUser(ctx.from!.id);
  await ctx.conversation.enter("getPhone");
});

export async function sendContactToGroup(
  phone: string,
  first_name?: string,
  last_name?: string
) {
  try {
    const groupId: string = "-1002133384618";
    await bot.api.sendMessage(
      groupId,
      `New contact received: ${first_name} ${last_name ?? ""} ${phone}`
    );
    console.log("Contact sent to group:");
  } catch {}
}

bot.start();
