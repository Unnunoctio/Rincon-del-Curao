import { Breadcrumb } from '@/components/breadcrumb'
import { LegalGroup } from '@/components/legal/legal-group'
import { createBreadcrumbLinks } from '@/helpers/path'
import { Metadata } from 'next'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Información Legal'
}

export default function LegalInfomationPage ({ searchParams }: Props): JSX.Element {
  const tab = searchParams.tab ?? 'terms'

  return (
    <>
      <Breadcrumb links={createBreadcrumbLinks(['Home', 'Información Legal'])} />
      <LegalGroup tab={tab as string} />
    </>
  )
}
