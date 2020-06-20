export default function getBotInvite(clientId: string) {
  return `Invite the bot to your server at https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot`
}