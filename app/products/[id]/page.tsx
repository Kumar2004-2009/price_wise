import { getProductById, getSimilarProducts } from "@/lib/actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import React from "react";
import PriceInfoCard from "@/components/PriceInfoCard";
import Modal from "@/components/Modal";



const ProductDetails = async ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24 bg-[#050816]">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="flex-grow xl:max-w-[50%] max-w-full py-16 border border-[#CDDBFF] rounded-[17px]">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-white font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-white opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.png"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.png"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-white font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-gray-300 opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-[#D48D3B] font-semibold">
                    {product.stars || "25"}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-gray-400 font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm text-white opacity-50">
                <span className="text-[#41d449] font-semibold">93% </span> of
                buyers have recommeded this.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard 
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />
              <PriceInfoCard 
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />
              <PriceInfoCard 
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceInfoCard 
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
            </div>
          </div>

          <Modal productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-white font-semibold">
            Product Description
          </h3>

          <div className="flex flex-col">
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              {product?.description?.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>

        <button className="bg-white w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px] py-4 px-4 hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold">
          <Image
            src="/assets/icons/bag.png"
            alt="check"
            width={22}
            height={22}
          />

          <Link href="/" className="text-base text-black ">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text text-white">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
