import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { ProductItem, allProducts } from "../data/products";
import StarRatings from "react-star-ratings";
import { useCart } from "../components/CartContext";

type ProductInfoProps = {
	locale: {
		localLang: {
			text: any,
			lang: "english" | "french"
		},
		localCurrency: "cad" | "usd"
	},
	setLocale: Function
}

export default function ProductInfo({ locale, setLocale }: ProductInfoProps) {
	const { cart, addItemToCart, removeItemFromCart, updateItemQuantity } = useCart();

	const [product, setProduct] = useState({} as ProductItem);
	// used for logic (backend quantity)
	const [quantity, setQuantity] = useState(0);
	// merely used for displaying the item quantity (frontend quantity)
	const [quantityDisplay, setQuantityDisplay] = useState(quantity);
	const [disabled, setDisabled] = useState(quantity === 1);
	// recommended list of products frequently bought with this product
	const [similarProducts, setSimilarProducts] = useState(Array<ProductItem>);
	const [productAddedToCart, setProductAddedToCart] = useState(null);

	const { product_name } = useParams();

	const localLang = locale.localLang.text;

	const { img, manufacturer, name, rating, numOfReviews, stock } = product;

	// always displays to two decimal places
	const price = product.id
		? (locale.localCurrency === "cad"
			? locale.localLang.lang === "english"
				? product.price[locale.localCurrency].toLocaleString("en-CA", {style: "currency", currency: "CAD"})
				: product.price[locale.localCurrency].toLocaleString("fr-CA", {style: "currency", currency: "CAD"})
			: product.price[locale.localCurrency].toLocaleString("en-US", { style: "currency", currency: "USD" }))
		: null;
	
	const salePrice = product.id && product.salePrice
		? (locale.localCurrency === "cad"
			? locale.localLang.lang === "english"
				? product.salePrice[locale.localCurrency].toLocaleString("en-CA", {style: "currency", currency: "CAD"})
				: product.salePrice[locale.localCurrency].toLocaleString("fr-CA", {style: "currency", currency: "CAD"})
			: product.salePrice[locale.localCurrency].toLocaleString("en-US", { style: "currency", currency: "USD" }))
		: null;

	const handleQuantityDecreaseClick = () => {
		if (stock > 0) {
			if (quantity > 1) {
				const newQuantity = quantity - 1;
				setQuantity(newQuantity);
				updateItemQuantity(product, newQuantity);
			} else if (quantity === 1) {
				const newQuantity = quantity - 1;
				setQuantity(newQuantity);
				removeItemFromCart(product);
			}
		}
	};

	const handleQuantityOnChange = (event: any) => {
		if (event.target.value === "") {
			setQuantityDisplay(event.target.value);
		} else if (event.target.value === "0") {
			if (quantity > 0) {
				removeItemFromCart(product);
			}
			const newQuantity = 0;
			setQuantity(newQuantity);
			setQuantityDisplay(newQuantity);
		} else {
			const newQuantity = parseInt(event.target.value);
			setQuantity(newQuantity);
			setQuantityDisplay(newQuantity);

			if (quantity === 0) {
				addItemToCart(product);
			} else {
				updateItemQuantity(product, newQuantity);
			}
		}
	};

	const handleQuantityOnBlur = (event: any) => {
		if (event.target.value === "") {
			const newQuantity = 0;
			setQuantity(newQuantity);
			setQuantityDisplay(newQuantity);
			removeItemFromCart(product);
		}
	};

	const handleQuantityIncreaseClick = () => {
		if (stock > 0) {
			const newQuantity = quantity + 1;
			setQuantity(newQuantity);
			addItemToCart(product);
		}
	};

	const handleAddProductToCart = () => {
		if (stock > 0) {
			addItemToCart(product);
			const newQuantity = quantity + 1;
			setQuantity(newQuantity);
		}
	};

	useEffect(() => {
		setQuantityDisplay(quantity);
		quantity < 1 ? setDisabled(true) : setDisabled(false);
	}, [quantity]);

	useEffect(() => {
		window.scrollTo(0, 0);

		let newQuantity = 0;
		Array.from(cart.keys()).map(k => {
			if (k.id === product.id) {
				newQuantity = cart.get(k)!;
				setQuantity(newQuantity);
			}
		});

		setQuantity(newQuantity);
		setQuantityDisplay(newQuantity);
	}, [product]);

	useEffect(() => {
		// get random list of products for "Similar products" list (excluding current product)
		const randomProductsList = allProducts.filter(prod => prod.id != product.id).sort(() => 0.5 - Math.random());
		setSimilarProducts(randomProductsList.slice(0, 4));
	}, [product]);

	useEffect(() => {
		// update product when accessing new url
		allProducts.forEach(prod => {
			if (prod.name === decodeURIComponent(product_name!)) {
				setProduct(prod);
			}
		});
	}, [product_name]);

	return (
		<>
			<NavBar
				product={productAddedToCart}
				setProduct={setProductAddedToCart}
				localLang={locale.localLang}
				setLocale={setLocale}
			/>
			<section className="flex justify-center">
				<div className="flex max-w-screen-xl px-12 py-12">
					<div className="w-2/3 flex flex-col items-center">
						<img src={img ? img.toString() : ""} className="w-3/5 sticky top-32 border px-8 py-8" />
					</div>
					<div className="w-1/3 flex flex-col gap-8">
						<div className="flex flex-col gap-2">
							<p className="text-xs uppercase text-neutral-500">{manufacturer}</p>
							<h1 className="text-4xl">{name}</h1>
							<div className="flex gap-2">
								<StarRatings
									rating={rating}
									starRatedColor="#fbbf24"
									starDimension="20px"
									starSpacing="1px"
								/>
								<p className="pt-0.5 font-bold">
									{rating} <span className="font-light">({numOfReviews} { localLang.product_info_reviews })</span>
								</p>
							</div>
							<div className="flex pt-4 text-xl font-bold">
								<p className={`${salePrice ? "text-sm line-through text-neutral-500 pr-4" : ""}`}>
									{price} {locale.localCurrency === "cad" ? "CAD" : "USD"}
								</p>
								<p className={`${salePrice ? "" : "hidden"}`}>{salePrice} {locale.localCurrency === "cad" ? "CAD" : "USD"}</p>
								<div
									className={`${
										salePrice ? "" : "hidden"
									} bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl mx-4`}
								>
									{ localLang.product_sale }
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-xs text-neutral-500">{ localLang.product_info_quantity }</p>
							<div className="flex items-center">
								<div className="flex items-center">
									<div
										className={`${
											stock > 0 ? "" : "cursor-not-allowed"
										} w-40 flex items-center justify-between ring-1 ring-neutral-500 hover:ring-2 transition duration-200`}
									>
										<div
											onClick={handleQuantityDecreaseClick}
											className={`${
												disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-black/10"
											} px-4 py-4`}
										>
											<svg className="w-4 h-4">
												<use href="src/icons_sprite.svg#minus" />
											</svg>
										</div>
										<input
											type="number"
											disabled={stock === 0}
											value={quantityDisplay}
											onChange={handleQuantityOnChange}
											onBlur={handleQuantityOnBlur}
											className="px-0 py-0 text-center text-sm w-8 border-none focus:ring-0 disabled:cursor-not-allowed"
										/>
										<div
											onClick={handleQuantityIncreaseClick}
											className={`${
												stock > 0 ? "cursor-pointer hover:bg-black/10" : "cursor-not-allowed"
											} px-4 py-4`}
										>
											<svg className="w-3.5 h-4">
												<use href="src/icons_sprite.svg#plus" />
											</svg>
										</div>
									</div>
								</div>
								<div
									className={`${
										stock > 0 ? "hidden" : ""
									} bg-neutral-600 text-sm text-white border px-4 py-1 rounded-2xl mx-4`}
								>
									{ localLang.product_out_of_stock }
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-3 select-none">
							<button
								onClick={handleAddProductToCart}
								className={`${
									stock > 0
										? "hover:ring-2 transition-all duration-200"
										: "cursor-not-allowed"
								} px-4 py-4 text-sm ring-1 ring-neutral-500`}
							>
								{ localLang.product_info_add_to_cart }
							</button>
							<button
								className={`${
									stock > 0
										? "hover:bg-primary hover:border-primary hover:text-white transition duration-200"
										: "cursor-not-allowed"
								} border border-black px-4 py-4 bg-black text-white text-sm`}
							>
								{ localLang.product_info_buy_now }
							</button>
						</div>
						<div className="py-4">
							<ul className="flex flex-col gap-2">
								{product.id
									? product.features[locale.localLang.lang].map((feature, index) => (
											<li key={index} className="list-disc">
												{feature}
											</li>
									  ))
									: null}
							</ul>
						</div>
					</div>
				</div>
			</section>
			<FeaturedProducts
				header={localLang.product_info_you_may_also_like}
				subheader=""
				products={similarProducts}
				viewAllPage="/shop"
				setProduct={setProductAddedToCart}
				locale={locale}
			/>
			<Footer localLang={locale.localLang.text} />
		</>
	);
}
