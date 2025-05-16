export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="md:flex h-full">{children}</div>;
}
