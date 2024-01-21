import React, { useEffect, useState } from "react";
import { ProductItem } from "../data/products";

type ProductCartDisplayProps = {
	product: Array<string>,
	removeFromCart: Function,
	updateQuantity: Function
}

export default function ProductCartDisplay({ product, removeFromCart, updateQuantity }: ProductCartDisplayProps) {

	const productItem: ProductItem = product[0] as unknown as ProductItem;
	const productPrice = productItem.sale ? productItem.salePrice! : productItem.price;

	const [quantity, setQuantity] = useState(parseInt(product[1]));
	const [quantityDisplay, setQuantityDisplay] = useState(quantity);
	const [productCost, setProductCost] = useState(productPrice * quantity);

	const handleQuantityOnChange = (event: any) => {
		if (event.target.value === "") {
			const newQuantity = 0;
			setQuantity(newQuantity);
			updateQuantity(productItem, newQuantity)
			setQuantityDisplay(event.target.value);
		} else {
			const newQuantity = parseInt(event.target.value);
			setQuantity(newQuantity);
			updateQuantity(productItem, newQuantity);
		}
	}

	const handleQuantityIncreaseClick = () => {
		const newQuantity = quantity + 1
		setQuantity(newQuantity);
		updateQuantity(productItem, newQuantity);
	}

	const handleQuantityDecreaseClick = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			updateQuantity(productItem, newQuantity);
		}
	}

	function handleRemoveProductButtonClick() {
		removeFromCart(productItem);
	}

	useEffect(() => {
		setProductCost(productPrice * quantity)
		setQuantityDisplay(quantity)
	}, [quantity])

	return (
		<div className="grid grid-cols-5 items-center">
			<div className="col-span-3">
				<a href="https://www.google.com" className="flex w-3/4">
					<img src={ productItem.img.toString() } className="w-32 h-32" />
					<div className="flex flex-col gap-2 justify-center pl-10">
						<p className="">{ productItem.name }</p>	
						<p className="text-sm text-neutral-500">{productItem.manufacturer}</p>
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
			<div className="">
				<div className="flex items-center">
					<div className="w-40 flex items-center justify-between ring-1 ring-neutral-500 hover:ring-2 transition duration-200">
						<div onClick={handleQuantityDecreaseClick} className="px-4 py-4 cursor-pointer hover:bg-black/10">
							<svg className="w-4 h-4">
								<use href="src/icons_sprite.svg#minus"/>
							</svg>
						</div>
						<input type="number" value={quantityDisplay} placeholder="0" onChange={handleQuantityOnChange} className="px-0 py-0 text-center text-sm w-8 border-none focus:ring-0" />
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
			</div>
			<p className="text-sm text-right select-none">{ productCost.toLocaleString("en-CA", { style: "currency", currency: "CAD" }) } CAD</p>
		</div>
	)
}