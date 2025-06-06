"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const paresedURL = new URL(url);
    const hostname = paresedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon.co.uk")
    )
      return true;
  } catch (error) {
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [searchProp, setSearchProp] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchProp);

    if (!isValidLink) return alert("Please enter a valid Amazon product link");

    try {
      setisLoading(true);

      // Scraping
      const product = await scrapeAndStoreProduct(searchProp);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchProp}
        onChange={(e) => setSearchProp(e.target.value)}
        placeholder="Enter product link"
        className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-200 focus:outline-none"
      />

      <button
        type="submit"
        disabled={searchProp === ""}
        className="bg-gray-800 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
