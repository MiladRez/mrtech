import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProductListHeader from "../components/ShopDealsPage/ProductListHeader";
import ProductList from "../components/ShopDealsPage/ProductList";
import Footer from "../components/Footer";
import { getProductsOnSaleFromDB, ProductItem } from "../data/products";

type DealsProps = {
    locale: {
        localLang: {
            text: any;
            lang: "english" | "french";
        };
        localCurrency: "cad" | "usd";
    };
    setLocale: Function;
};

export default function Deals({ locale, setLocale }: DealsProps) {
	const [product, setProduct] = useState(null);
	const [productList, setProductList] = useState<ProductItem[]>([])

	useEffect(() => {
		const getProductList = async () => {
			const data = await getProductsOnSaleFromDB();
			setProductList(data);
		}
		getProductList();
	}, []);

    const localLang = locale.localLang.text;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <NavBar
                product={product}
                setProduct={setProduct}
                localLang={locale.localLang}
                setLocale={setLocale}
            />
            <ProductListHeader
                title={localLang.deals_header}
                desc={localLang.deals_subheader}
            />
            <ProductList
                products={productList}
                setProduct={setProduct}
                locale={locale}
            />
            <Footer localLang={locale.localLang.text} />
        </>
    );
}
