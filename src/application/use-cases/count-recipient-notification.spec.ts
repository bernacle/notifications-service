import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Recipient notification', () => {
  it('should be able to count the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
