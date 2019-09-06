import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Mail from '../../lib/Mail';

class CancellationMail {
  // Cria chave única do JOB
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Canceled schedule',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM 'de' yyyy', às' H:mm'h'",
          { locale: pt }
        ),
      },
    });
  }
}

export default new CancellationMail();
