import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // curl -i --proxy brd.superproxy.io:33335 --proxy-user
  // brd-customer-hl_44f25013-zone-pricewise:1031d5xao3xg -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price-whole")
    );
    const originalPrice = extractPrice(
      $(".a-price.a-text-price span.a-offscreen")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images = $("#landingImage").attr("data-a-dynamic-image") || "{}";
    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));
    const discount = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const items:any = [];
    $("ul.a-unordered-list.a-vertical.a-spacing-mini > li").each((i, el) => {
      const text = $(el).text().trim();
      if (text) {
        items.push(text);
      }
    });

    const stars = $('.a-popover-trigger span.a-size-base').first().text().trim();
const ratingCount = extractPrice($('#acrCustomerReviewText').first());


    const data = {
      url,
      currency: currency || "$ ",
      title,
      currentPrice:Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      image:imageUrls[0],
      discountRate:Number(discount),
      description:items,
      priceHistory: [],
      reviewsCount:Number(ratingCount),
      stars: Number(stars),
      isOutOfStock:outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice:Number(originalPrice) || Number(currentPrice),
      averagePrice:Number(currentPrice) || Number(originalPrice),
      category:'category',
    };

    return data;
    
  } catch (error: any) {
    throw new Error(`Failed to scrape Amazon product: ${error.message}`);
  }
}
