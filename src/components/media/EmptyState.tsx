export function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid min-h-48 place-items-center rounded-ui bg-surface p-8 text-center">
      <p className="text-sm uppercase tracking-widest text-muted">{message}</p>
    </div>
  );
}
