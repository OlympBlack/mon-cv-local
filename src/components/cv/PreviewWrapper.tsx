export default function PreviewWrapper({ children }: any) {
  return (
    <div className="bg-muted/30 rounded-xl p-4 flex justify-center">
      <div className="bg-white w-full max-w-[420px] aspect-[1/1.414] shadow-xl">
        {children}
      </div>
    </div>
  );
}
