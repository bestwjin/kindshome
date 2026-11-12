interface CloudflareEnv {
  ASSETS?: Fetcher;
  IMAGES?: ImagesBinding;
  WORKER_SELF_REFERENCE?: Service;
  VISITS?: KVNamespace;
  VISITS_ADMIN_TOKEN?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  CONTACT_EMAIL?: {
    send(message: {
      from: { name: string; email: string };
      to: string;
      replyTo: string;
      subject: string;
      text: string;
    }): Promise<{ messageId: string }>;
  };
  CONTACT_RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}
