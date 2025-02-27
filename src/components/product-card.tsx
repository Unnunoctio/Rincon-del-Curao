import { StarIcon } from "@/icons/star"
import { StarBorderIcon } from "@/icons/star-border"
import { StarHalfIcon } from "@/icons/star-half"
import { ProductView } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface Props extends ProductView {}

export const ProductCard = ({ slug, title, image, price, bestPrice, discount, average }: Props) => {
  return (
    <Link href={`/product/${slug}`} className="group block relative bg-c-onix-black p-3 rounded-xl w-[248px] h-[324px] overflow-hidden">
      <section className="flex flex-col items-center gap-y-1 group-hover:opacity-0 w-full h-full transition-opacity duration-400">
        <Image src={image} alt={title} width={188} height={188} className="rounded-lg w-[188px] h-[188px] object-cover" />
        <h3 className="h-[54px] font-medium text-[18px] text-center line-clamp-2">{title}</h3>
        <div className="flex justify-between items-center gap-2 w-full h-[50px]">
          <div className="flex flex-col">
            {
              price !== bestPrice && <span className="text-[14px] text-c-steel-gray line-through leading-5">${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
            }
            <span className="font-medium text-[20px] text-c-old-gold">${bestPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          </div>
          <div className="flex gap-x-1">
            {
              discount !== 0 && <span className="bg-c-lead-gray px-2 py-0.5 rounded-full h-full text-[14px]">{discount} %</span>
            }
            <div className="flex items-center gap-x-0.5 bg-c-lead-gray py-0.5 pr-1.5 pl-2 rounded-full">
              <span className="h-full text-[14px]">{average}</span>
              { average === 0 && <StarBorderIcon className="fill-c-snow-white w-4 h-4" /> }
              { (average > 0 && average < 5) && <StarHalfIcon className="fill-c-snow-white w-4 h-4" /> }
              { average === 5 && <StarIcon className="fill-c-snow-white w-4 h-4" /> }
            </div>
          </div>
        </div>
      </section>
      <section className="top-0 left-0 absolute flex justify-center items-center opacity-0 group-hover:opacity-100 w-full h-full transition-opacity duration-400">
        <Image src={image} alt={title} width={188} height={188} className="rounded-lg w-[188px] h-[188px] object-cover group-hover:scale-125 duration-400 tranistion-transform" />
      </section>
    </Link>
  )
}
