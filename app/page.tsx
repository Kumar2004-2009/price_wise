import HeroCarousel from '@/components/HeroCarousel'
import Searchbar from '@/components/Searchbar'
import Image from 'next/image'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home = async () => {
  const allProducts = await getAllProducts()
  return (
    <>
    <section className='bg-[#050816] px-6 md:px-20 py-24'>
      <div className='flex max-xl:flex-col gap-16'>
        <div className='flex flex-col justify-center'>
          <p className='flex gap-2 text-sm font-medium text-[#E43030]'>
            Smart Shopping Starts Here

            <Image
              src="/assets/icons/arrow-right.svg"
              width={16}
              height={16}
              alt="arrow-right"
              />
          </p>

          <h1 className='mt-4 text-white text-6xl leading-[72px] font-bold tracking-[-1.2px] '>
            Unleash the Power of 
            <span className='text-[#E43030]'> PriceWise</span>
          </h1>

          <p className='mt-6 text-white'>
            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
          </p>

          <Searchbar/>
        </div>
        <HeroCarousel/>
      </div>
    </section>

    <section className='bg-[#050816] flex flex-col gap-10 px-6 md:px-20 py-24'>
      <h2 className='text-[32px] font-semibold text-white'>Trending</h2>
      <div className='flex flex-wrap gap-x-8 gap-y-16'>
        {allProducts?.map
          ((item) => (
            <ProductCard key={item._id} product={item}/>
          ))
        }
      </div>
    </section>
    </>
  )
}

export default Home
