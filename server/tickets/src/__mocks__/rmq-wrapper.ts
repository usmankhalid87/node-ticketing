export const MockRabbitMQWrapper = {
  connect: jest.fn().mockResolvedValue(void 0),
  channel: {
    publish: jest
      .fn()
      .mockImplementation(
        (exchange: string, routingKey: string, content: Buffer) => {}
      ),
    assertQueue: jest.fn(),
    sendToQueue: jest.fn(),
    assertExchange: jest.fn(),
  },
};
