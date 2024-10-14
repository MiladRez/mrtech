import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import FeaturedProducts from "../components/HomePage/FeaturedProducts";
import { ProductItem, getAllProductsFromDB } from "../data/products";
import StarRatings from "react-star-ratings";
import { useCart } from "../components/CartContext";
import {getInLocalLangAndCurrency} from "../data/products";
import iconsSprite from "../icons_sprite.svg";
import httpClient from "../utils/httpClient";
import api from "../utils/flaskEndpoint";

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
	const {cart, addItemToCart, removeItemFromCart, updateItemQuantity} = useCart();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	// list containing all of the products, will be populated with useeffect calling backend API
	const [productList, setProductList] = useState<ProductItem[]>([]);

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
		? getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, product.price[locale.localCurrency])
		: null;
	
	const salePrice = product.id && product.salePrice
		? getInLocalLangAndCurrency(locale.localCurrency, locale.localLang.lang, product.salePrice[locale.localCurrency])
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
		const randomProductsList = productList.filter(prod => prod.id != product.id).sort(() => 0.5 - Math.random());
		setSimilarProducts(randomProductsList.slice(0, 4));
	}, [product]);

	useEffect(() => {
		// update product when accessing new url
		productList.forEach(prod => {
			if (prod.name === decodeURIComponent(product_name!)) {
				setProduct(prod);
			}
		});
	}, [product_name, productList]);

	useEffect(() => {
		const getProductList = async () => {
			const data = await getAllProductsFromDB();
			setProductList(data);
		}
		getProductList();
	}, [])

	useEffect(() => {
		const checkUserToken = async () => {
			const response = await httpClient.get(`${api}/authorized`);
			if (response.data.authorized) {
				console.log("User is authorized via Google")
				setIsLoggedIn(true);
			} else {
				console.log("User is not authorized")
				setIsLoggedIn(false);
			}
		}
		checkUserToken();
	}, []);

	//`${stock > 0 ? `/checkout/${encodeURIComponent(name)}` : ""}`

	return (
		<>
			<NavBar
				product={productAddedToCart}
				setProduct={setProductAddedToCart}
				localLang={locale.localLang}
				setLocale={setLocale}
			/>
			<section className="flex justify-center select-none">
				<div className="flex flex-col big:flex-row items-center big:items-start max-w-screen-xl px-12 py-12">
					<div className="big:w-1/2 xl:w-2/3 flex flex-col items-center h-full">
						<img src={img ? img.toString() : ""} className="sm:w-4/5 big:w-3/5 sticky top-32 border px-8 py-8" />
					</div>
					<div className="big:w-1/2 xl:w-1/3 flex flex-col gap-8 my-5 big:my-0">
						<div className="flex flex-col gap-2">
							<p className="text-xs uppercase text-neutral-500 hidden big:inline">{manufacturer}</p>
							<h1 className="text-lg sm:text-2xl big:text-4xl">{name}</h1>
							<p className="text-xs uppercase text-neutral-500 big:hidden">{manufacturer}</p>
							<div className="flex gap-2">
								<StarRatings
									rating={rating}
									starRatedColor="#fbbf24"
									starDimension="20px"
									starSpacing="1px"
								/>
								<p className="pt-0.5 font-semibold">
									{rating} <span className="font-light">({numOfReviews} { localLang.product_info_reviews })</span>
								</p>
							</div>
							<div className="flex items-center pt-4 font-semibold">
								<div className="w-full sm:w-auto flex">
									<p className={`${salePrice ? "text-sm line-through text-neutral-500 pr-4 pt-px" : ""}`}>
										<span className="whitespace-pre-wrap">{locale.localCurrency === "cad" ? "CAD  " : "USD  "}</span>
										{price}
									</p>
									<p className={`${salePrice ? "text-lg" : "hidden"}`}>
										<span className="pr-2">{locale.localCurrency === "cad" ? "CAD" : "USD"}</span>
										{salePrice}
									</p>
								</div>
								<div
									className={`${
										salePrice ? "" : "hidden"
									} bg-blue-800 text-sm text-white border px-4 py-1 rounded-2xl sm:mx-4 w-fit big:w-auto`}
								>
									{ localLang.product_sale }
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className="text-xs text-neutral-500">{ localLang.product_info_quantity }</p>
							<div className="flex items-center justify-between sm:justify-start">
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
												<use href={`${iconsSprite}#minus`} />
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
												<use href={`${iconsSprite}#plus`} />
											</svg>
										</div>
									</div>
								</div>
								<div
									className={`${
										stock > 0 ? "hidden" : ""
									} bg-neutral-600 text-sm text-white border px-4 py-1 rounded-2xl sm:mx-4 text-center`}
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
							<Link to={
								isLoggedIn ?
									stock > 0 ? `/checkout/${encodeURIComponent(name)}` : ""
								:
									"/login"
								}
								state={"/checkout"}
							>
								<button
									onClick={handleAddProductToCart}
									className={`${
										stock > 0
											? "hover:bg-primary hover:border-primary hover:text-white transition duration-200"
											: "cursor-not-allowed"
									} w-full border border-black px-4 py-4 bg-black text-white text-sm`}
								>
									{ localLang.product_info_buy_now }
								</button>
							</Link>
						</div>
						<div className="py-4">
							<ul className="flex flex-col gap-2 select-none">
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
