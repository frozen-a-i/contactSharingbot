import { Menu } from "@grammyjs/menu";
import { MyContext } from "../bot";

export const groupsMenu = new Menu<MyContext>("group-menu")
  .url("Group1", "https://t.me/sharecontacthere")
  .row();
