import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import ContactSection from "../components/CheckoutPage/ContactSection";
import DeliverySection from "../components/CheckoutPage/DeliverySection";
import PaymentSection from "../components/CheckoutPage/PaymentSection";
import {useCart} from "../components/CartContext";
import {ProductItem, getAllProductsFromDB} from "../data/products";
import {getInLocalLangAndCurrency} from "../data/products";
import {useParams} from "react-router-dom";

type CheckoutProps = {
	locale: {
		localLang: {
			text: any;
			lang: "english" | "french";
		};
		localCurrency: "cad" | "usd";
	};
	setLocale: Function;
};

export default function Checkout({locale, setLocale}: CheckoutProps) {
	const {cart, totalCost} = useCart();
	
	// use params for "Buy Now" feature
	const {product_name} = useParams();

	const [product, setProduct] = useState({} as ProductItem);
	const [quantity, setQuantity] = useState(0);
	const [shippingFee, setShippingFee] = useState(-1);

	// list containing all of the products, will be populated with useeffect calling backend API
	const [productList, setProductList] = useState<ProductItem[]>([]);

	const localLang = locale.localLang.text;

	const productPrice = product.id
		? product.salePrice
			? product.salePrice[locale.localCurrency] * quantity
			: product.price[locale.localCurrency] * quantity
		: 0;

	const shippingFeeDisplay =
		shippingFee > -1
			? shippingFee === 0
				? localLang.checkout_shipping_free
				: getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, shippingFee)
			: localLang.checkout_shipping_add_address;

	const subtotal = product.id
		? getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, productPrice)
		: getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, totalCost);

	const taxes = product.id
		? locale.localCurrency === "cad"
			? (productPrice * 13) / 100
			: (productPrice * 6) / 100
		: locale.localCurrency === "cad"
		? (totalCost * 13) / 100
		: (totalCost * 6) / 100;

	const subtotalPlusExtraFees =
		shippingFee > -1
			? product.id
				? productPrice + shippingFee + taxes
				: totalCost + shippingFee + taxes
			: product.id
				? productPrice + taxes
				: totalCost + taxes;

	const total = getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, subtotalPlusExtraFees);

	const getProductPrice = (prod: ProductItem): string => {
		const productPrice = prod.salePrice
			? prod.salePrice[locale.localCurrency] * cart.get(prod)!
			: prod.price[locale.localCurrency] * cart.get(prod)!;
		return getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, productPrice);
	};

	const handleDeliverySelection = (fee: number) => {
		setShippingFee(fee);
	};

	// call API to retreive list of products
	useEffect(() => {
		const getProductList = async () => {
			const data = await getAllProductsFromDB();
			setProductList(data);
		}
		getProductList();
	}, [])

	useEffect(() => {
		// update product when accessing new url
		productList.forEach(prod => {
			if (prod.name === decodeURIComponent(product_name!)) {
				setProduct(prod);
			}
		});
	}, [product_name]);

	useEffect(() => {
		let newQuantity = 0;
		Array.from(cart.keys()).map(k => {
			if (k.id === product.id) {
				newQuantity = cart.get(k)!;
				setQuantity(newQuantity);
			}
		});
	}, [product]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<NavBar localLang={locale.localLang} setLocale={setLocale} />
			<section className="relative flex justify-center -mt-24">
				<div className="hidden lg:flex absolute w-full h-full pointer-events-none">
					<div className="w-3/5 h-full"></div>
					<div className="w-2/5 h-full bg-stone-100"></div>
				</div>
				<div className="w-full max-w-screen-xl flex flex-col lg:flex-row">
					<div className="lg:w-3/5 flex flex-col gap-8 px-12 pt-[8.5rem] sm:pt-44 pb-12 lg:pb-20">
						<ContactSection localLang={localLang} />
						<DeliverySection handleDeliverySelection={handleDeliverySelection} locale={locale} />
						<div className="hidden lg:inline">
							<PaymentSection localLang={localLang} />
						</div>
					</div>
					<div className="lg:w-2/5 border-l px-12 py-12 lg:pt-44 lg:pb-20 bg-stone-100">
						<div className="sticky top-32 flex flex-col gap-8">
							<div className="flex flex-col gap-2">
								{product.id ? (
									<div className="relative flex items-center justify-between overflow-hidden gap-4">
										<div className="flex items-center gap-4">
											<img
												src={product.img.toString()}
												className="w-20 h-20 rounded border px-2 py-2 my-2 bg-white"
											/>
											<div
												className={`${
													quantity >= 10 ? "w-7" : "w-6"
												} absolute top-0 left-16 h-6 text-white rounded-xl bg-blue-800 flex justify-center items-center group-hover:border-primary`}
											>
												<p className="text-xs pl-px">{quantity}</p>
											</div>
											<p className="text-sm line-clamp-2">{product.name}</p>
										</div>
										<p className="text-sm">{getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, productPrice)}</p>
									</div>
								) : (
									Array.from(cart.keys()).map((prod, index) => (
										<div
											key={index}
											className="relative flex items-center justify-between overflow-hidden gap-4"
										>
											<div className="flex items-center gap-4">
												<img
													src={prod.img.toString()}
													className="w-20 h-20 rounded border px-2 py-2 my-2 bg-white"
												/>
												<div
													className={`${
														cart.get(prod)! >= 10 ? "w-7" : "w-6"
													} absolute top-0 left-16 h-6 text-white rounded-xl bg-blue-800 flex justify-center items-center group-hover:border-primary`}
												>
													<p className="text-xs pl-px">{cart.get(prod)}</p>
												</div>
												<p className="text-sm line-clamp-2">{prod.name}</p>
											</div>
											<p className="text-sm">{getProductPrice(prod)}</p>
										</div>
									))
								)}
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex justify-between">
									<p className="text-sm">{localLang.checkout_subtotal}</p>
									<p className="text-sm">{subtotal}</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm">{localLang.checkout_taxes}</p>
									<p className="text-sm">
										{getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, taxes)}
									</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm">{localLang.checkout_shipping}</p>
									<p className={`${shippingFee > -1 ? "text-sm" : "text-xs text-neutral-500"}`}>
										{shippingFeeDisplay}
									</p>
								</div>
								<div className="flex justify-between">
									<p className="font-semibold">{localLang.checkout_total}</p>
									<div className="flex items-center gap-2">
										<p className="text-xs text-neutral-500 pt-1">
											{locale.localCurrency === "cad" ? "CAD" : "USD"}
										</p>
										<p className="text-lg font-semibold">{total}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:hidden px-12 py-12">
						<PaymentSection localLang={localLang} />
					</div>
				</div>
			</section>
			<div className="flex justify-center border-t">
				<div className="w-full max-w-screen-xl px-12">
					<p className="text-xs text-neutral-500 py-12">{localLang.footer_copyright}</p>
				</div>
			</div>
		</>
	);
}
