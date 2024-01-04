import React, { useEffect, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";

const langs: string[] = ["French", "Spanish"];

function NavBar() {

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		if (currentScrollPos > prevScrollPos && currentScrollPos > 500) {
			setVisible(false);
		} else {
			setVisible(true)
		}

		setPrevScrollPos(currentScrollPos)
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll)
	})

	return (
		<nav className={`fixed ${visible ? "max-h-64" : "max-h-0"} w-screen flex justify-center bg-neutral-50 z-10 transition-all duration-300 overflow-hidden`}>
			<div className="flex w-full max-w-screen-xl justify-between px-12 py-4">
				<div className="flex items-center">
					<img src={mrtechLogo} className="w-20" />
					<div className="pl-8">
						<div className="flex gap-8 text-sm">
							<a className="hover:text-primary select-none">Home</a>
							<a className="hover:text-primary select-none">Shop</a>
							<a className="hover:text-primary select-none">Discounts</a>
							<a className="hover:text-primary select-none">Contact</a>
							<select defaultValue={'default'} className="select-none bg-neutral-50 focus:outline-none hover:text-primary">
								<option value="default">
									English
								</option>
								{langs.map((lang, index) => (
									<option value={lang} key={index}>
										{lang}
									</option>
								))}
							</select>
							<a className="uppercase select-none hover:text-primary">Register / Sign in</a>
						</div>
					</div>					
				</div>
				<div className="flex items-center gap-6">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-primary">
						<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:text-primary">
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
					</svg>
				</div>
			</div>
		</nav>
	)
}

export default NavBar;