
interface Props {
  children: React.ReactNode
}

export const PageLayout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <div className='h-[72px]' />
      <main className='flex justify-center w-full'>
        <section className='px-2 sm:px-8 md:px-12 py-2 sm:py-4 min-h-page-container max-w-page-container w-full'>
          {children}
        </section>
      </main>
    </>
  )
}
