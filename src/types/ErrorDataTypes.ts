export const isErrorData = (data: unknown): data is { error: string } => {
  return (data as { error: string }).error !== undefined;
};
