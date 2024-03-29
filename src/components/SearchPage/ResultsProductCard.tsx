import React from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../data/products";
import { getInLocalLangAndCurrency } from "../../data/products";

type ResultsProductCardProps = {
    product: ProductItem;
    locale: {
        localLang: {
            text: any;
            lang: "english" | "french";
        };
        localCurrency: "cad" | "usd";
    };
};

export default function ResultsProductCard({ product, locale }: ResultsProductCardProps) {
    const { name, img, manufacturer, stock } = product;

    // always displays to two decimal places
    const price = getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, product.price[locale.localCurrency]);

    const salePrice = product.salePrice ? getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, product.salePrice[locale.localCurrency]) : null;

    return (
        <>
            <Link to={`/product/${encodeURIComponent(name)}`}>
                <div className="sm:h-96 group border px-4 py-4">
					<div className="relative flex justify-center">
						<img
							src={img.toString()}
							className={`${stock > 0 ? "" : "grayscale"} w-72 px-6 py-6 group-hover:scale-105 transition duration-300`}
						/>
						<div className={`${salePrice ? "" : "hidden"} absolute bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 left-0`}>{locale.localLang.text.product_sale}</div>
						<div className={`${stock > 0 ? "hidden" : ""} absolute bg-neutral-600 text-sm text-white border px-4 py-1 rounded-2xl bottom-2 right-0`}>{locale.localLang.text.product_out_of_stock}</div>
					</div>
					<div className="pt-2">
						<p className="text-sm line-clamp-2 group-hover:underline">{name}</p>
						<div className="flex items-center justify-between pt-4">
							<p className="text-xs text-neutral-400 uppercase py-2">{manufacturer}</p>
							{salePrice ? (
								<p className="text-blue-800 px-2 py-2">
									<span className="pr-2">{locale.localCurrency === "cad" ? "CAD" : "USD"}</span>
									{salePrice}
								</p>
							) : (
									<p className="px-2 py-2">
										<span className="pr-2">{locale.localCurrency === "cad" ? "CAD" : "USD"}</span>
									{price}
								</p>
							)}
						</div>
					</div>
                </div>
            </Link>
        </>
    );
}
