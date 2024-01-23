import React, { useEffect, useState } from "react";
import { ProductItem } from "../data/products";

type CartProductDisplayProps = {
	product: ProductItem,
	quantityAmount: number
	removeFromCart: Function,
	updateQuantity: Function
}

export default function CartProductDisplay({ product, quantityAmount, removeFromCart, updateQuantity }: CartProductDisplayProps) {

	const productPrice = product.sale ? product.salePrice! : product.price;

	const [quantity, setQuantity] = useState(quantityAmount);
	const [productCost, setProductCost] = useState(productPrice * quantityAmount);
	const [disabled, setDisabled] = useState(quantityAmount === 1);
	
	const handleQuantityDecreaseClick = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			updateQuantity(product, newQuantity);
		}
	}
	
	const handleQuantityOnChange = (event: any) => {
		if (event.target.value === "") {
			setQuantity(event.target.value);
		} else {
			const newQuantity = parseInt(event.target.value);
			setQuantity(newQuantity);
			updateQuantity(product, newQuantity);
		}
	}

	const handleQuantityOnBlur = (event: any) => {
		if (event.target.value === "" || event.target.value === "0") {
			const newQuantity = 1;
			setQuantity(newQuantity);
			updateQuantity(product, newQuantity)
		}
	}

	const handleQuantityIncreaseClick = () => {
		const newQuantity = quantity + 1
		setQuantity(newQuantity);
		updateQuantity(product, newQuantity);
	}

	const handleRemoveProductButtonClick = () => {
		removeFromCart(product);
	}

	useEffect(() => {
		setQuantity(quantityAmount)
		setProductCost(productPrice * quantityAmount)
	}, [quantityAmount])

	useEffect(() => {
		quantity < 2 ? setDisabled(true) : setDisabled(false);
	}, [quantity]);

	return (
		<div className="grid grid-cols-5 items-center">
			<div className="col-span-3">
				<a href="https://www.google.com" className="flex w-3/4">
					<img src={ product.img.toString() } className="w-32 h-32" />
					<div className="flex flex-col gap-2 justify-center pl-10">
						<p className="">{ product.name }</p>	
						<p className="text-sm text-neutral-500">{product.manufacturer}</p>
						<div className="select-none">
							<div className="flex items-center">
								<svg fill="#16a34a" className="w-3.5 h-3.5">
									<use href="src/icons_sprite.svg#checkmark" />
								</svg>
								<p className="text-xs px-1">Available to ship</p>	
							</div>
							<div className="flex items-center">
								<svg fill="#16a34a" className="w-3.5 h-3.5">
									<use href="src/icons_sprite.svg#checkmark" />
								</svg>
								<p className="text-xs px-1">Available at nearby stores</p>	
							</div>
							
						</div>
					</div>	
				</a>	
			</div>
			<div className="flex items-center">
				<div className="w-40 flex items-center justify-between ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
					<div onClick={handleQuantityDecreaseClick} className={`${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-black/10"} px-4 py-4`}>
						<svg className="w-4 h-4">
							<use href="src/icons_sprite.svg#minus"/>
						</svg>
					</div>
					<input type="number" value={quantity} onChange={handleQuantityOnChange} onBlur={handleQuantityOnBlur} className="px-0 py-0 text-center text-sm w-8 border-none focus:ring-0" />
					<div onClick={handleQuantityIncreaseClick} className="px-4 py-4 cursor-pointer hover:bg-black/10">
						<svg className="w-3.5 h-4">
							<use href="src/icons_sprite.svg#plus"/>
						</svg>
					</div>	
				</div>
				<div className="px-4">
					<svg onClick={handleRemoveProductButtonClick} className="w-5 h-5 cursor-pointer hover:scale-110 hover:fill-rose-700">
						<use href="src/icons_sprite.svg#trash"/>
					</svg>	
				</div>
			</div>	
			<p className="text-sm text-right select-none">{ productCost.toLocaleString("en-CA", { style: "currency", currency: "CAD" }) } CAD</p>
		</div>
	)
}