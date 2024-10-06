import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductListHeader from "../components/ShopDealsPage/ProductListHeader";
import ProductList from "../components/ShopDealsPage/ProductList";
import { getAllProductsFromDB, ProductItem } from "../data/products";

type ShopProps = {
    locale: {
        localLang: {
            text: any;
            lang: "english" | "french";
        };
        localCurrency: "cad" | "usd";
    };
    setLocale: Function;
};

export default function Shop({ locale, setLocale }: ShopProps) {
	const [product, setProduct] = useState(null);
	const [productList, setProductList] = useState<ProductItem[]>([])

	useEffect(() => {
		const getProductList = async () => {
			const data = await getAllProductsFromDB();
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
                title={localLang.shop_header}
                desc={localLang.shop_subheader}
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
