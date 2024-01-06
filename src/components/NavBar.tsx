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
					<svg stroke="currentColor" className="w-6 h-6 hover:fill-current hover:text-primary">
						<use href="src/icons_sprite.svg#search" />
					</svg>
					<svg stroke="currentColor" className="w-7 h-7 hover:fill-current hover:text-primary">
						<use href="src/icons_sprite.svg#cart" />
					</svg>
				</div>
			</div>
		</nav>
	)
}

export default NavBar;