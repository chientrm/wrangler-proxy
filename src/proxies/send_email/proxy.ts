import { createMimeMessage } from 'mimetext';
import { Proxy } from '../proxy';

interface Payload {
  sebName: string;
  name: string;
  addr: string;
  recipent: string;
  subject: string;
  contentType: string;
  data: string;
}

class SendEmailProxy extends Proxy<Payload> {
  static readonly proxyType = 'SendEmailProxy';
  constructor({
    host,
    name,
    payload,
  }: {
    host?: string;
    name: string;
    payload: Payload;
  }) {
    const proxyType = SendEmailProxy.proxyType;
    super({ proxyType, host, name, payload });
  }
  async execute(env: any) {
    const { sebName, name, addr, recipent, subject, contentType, data } =
        this.payload,
      seb = env[sebName] as SendEmail,
      msg = createMimeMessage();
    msg.setSender({ name, addr });
    msg.setRecipient(recipent);
    msg.setSubject(subject);
    msg.addMessage({ contentType, data });
    const { EmailMessage } = await import('cloudflare:email');
    const message = new EmailMessage(addr, recipent, msg.asRaw());
    await seb.send(message);
    return {};
  }
}

export { SendEmailProxy };
