export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <p className="text-sm text-muted-foreground">Analyzing job description...</p>
    </div>
  );
}
