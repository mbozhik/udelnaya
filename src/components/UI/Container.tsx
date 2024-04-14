export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="w-[70%] xl:w-[60%] sm:w-[90%] mx-auto">{children}</main>
}
