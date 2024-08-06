import { NavbarSpace } from './navigation'

interface Props {
  children: React.ReactNode
}

export const PageLayout: React.FC<Props> = ({ children }): JSX.Element => {
  return (
    <>
      <NavbarSpace />
      <main className='layout-page'>
        <section className='page-container'>
          {children}
        </section>
      </main>
    </>
  )
}
