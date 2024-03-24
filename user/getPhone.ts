import { MyContext, MyConversation, sendContactToGroup } from "../bot";
import { createUser, getUser } from "../db/actions";
import { groupsMenu } from "../menus/groupsLink";

export async function getPhone(conversation: MyConversation, ctx: MyContext) {
  const message = await ctx.reply(`Please share your phone number:`, {
    reply_markup: {
      keyboard: [[{ text: "Share My Phone Number", request_contact: true }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });

  let phone = await conversation.wait();
  const phonenumber = phone.msg?.contact?.phone_number;

  ctx.reply(`You have to join this group!`, { reply_markup: groupsMenu });
  const user = await getUser(ctx.from!.id);
  if (phonenumber && !user) {
    await createUser(ctx, phonenumber);
    await sendContactToGroup(
      phonenumber,
      ctx.from?.first_name,
      ctx.from?.last_name
    );
  }
}
