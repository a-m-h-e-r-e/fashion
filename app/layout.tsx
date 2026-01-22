// Root layout is not used with next-intl middleware
// All routes go through app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
