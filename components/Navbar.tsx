import Link from "next/link"
import Image from "next/image"

const navIcons=[
  {src: '/assets/icons/search.svg', alt: 'search'},
  {src: '/assets/icons/black-heart.svg', alt: 'heart'},
  {src: '/assets/icons/user.svg', alt: 'user'},
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-start gap-1">

          <Image
          src="/assets/icons/logo.svg"
          width={27}
          height={27}
          alt="logo"
          />
          <p className="font-spaceGrotesk text-[21px] text-[#282828] font-bold">
            Price <span className="text-[#E43030]">Wise</span>
          </p>
        </Link>

        <div className="flex items-center gap-5 cursor-pointer">
          {navIcons.map((icon, index) => (
            <Image
            key={index}
            src={icon.src}
            width={24}
            height={24}
            alt={icon.alt}
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
