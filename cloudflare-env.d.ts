interface CloudflareEnv {
  ASSETS?: Fetcher;
  IMAGES?: ImagesBinding;
  WORKER_SELF_REFERENCE?: Service;
  VISITS?: KVNamespace;
  VISITS_ADMIN_TOKEN?: string;
}
