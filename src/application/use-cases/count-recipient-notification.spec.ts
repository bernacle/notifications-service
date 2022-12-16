import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Recipient notification', () => {
  it('should be able to count the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New notification'),
        recipientId: 'example-id',
      }),
    );
    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New notification'),
        recipientId: 'example-id',
      }),
    );
    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New notification'),
        recipientId: 'wrong-example-id',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-id',
    });

    expect(count).toEqual(2);
  });
});
