interface Props {
  className: string
}

export const PackageIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24' height='24'
      viewBox='0 0 24 24'
    >
      <path
        d='M20.714 6.317V.857A.857.857 0 0 0 19.857 0h-2.571v1.714H19v5.76s2.571.435 2.571 3.669v11.143H19V24h3.429a.857.857 0 0 0 .857-.857v-12c0-2.959-1.657-4.306-2.572-4.826Zm-6 0V.857A.857.857 0 0 0 13.857 0h-2.571v1.714H13v5.76s2.571.435 2.571 3.669v11.143H13V24h3.429a.857.857 0 0 0 .857-.857v-12c0-2.959-1.657-4.306-2.572-4.826Zm-6 0V.857A.857.857 0 0 0 7.857 0H4.43a.857.857 0 0 0-.858.857v5.46C2.657 6.837 1 8.184 1 11.143v12a.857.857 0 0 0 .857.857h8.572a.857.857 0 0 0 .857-.857v-12c0-2.959-1.657-4.306-2.572-4.826Zm.857 15.969H2.714V11.143c0-3.233 2.572-3.669 2.572-3.669v-5.76H7v5.76s2.571.436 2.571 3.669v11.143Z'
      />
    </svg>
  )
}
