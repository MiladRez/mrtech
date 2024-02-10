import React, { useEffect, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";
import { Link } from "react-router-dom";

export default function Login({ localLang }: { localLang: any }) {
	const [passwordHidden, setPasswordHidden] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);

	return (
		<>
			<div className="h-screen flex justify-center items-center">
				<div className="w-full h-full sm:h-auto sm:w-[36rem] flex flex-col items-center justify-center gap-12 border px-12 sm:px-16 py-12 bg-stone-50 shadow-xl">
					<img src={mrtechLogo} className="w-44" />
					<form action="/home" className="flex flex-col w-full gap-2">
						<div className="flex items-center gap-2">
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="email"
									placeholder={localLang.login_email}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							<svg className="w-7 h-7 px-0.5">
								<use href="src/icons_sprite.svg#email" />
							</svg>
						</div>
						<div className="flex items-center gap-2">
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type={passwordHidden ? "password" : "text"}
									placeholder={localLang.login_password}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							{passwordHidden ? (
								<svg
									className="w-7 h-7 cursor-pointer"
									onClick={() => setPasswordHidden(!passwordHidden)}
								>
									<use href="src/icons_sprite.svg#eye-show" />
								</svg>
							) : (
								<svg
									className="w-7 h-7 cursor-pointer"
									onClick={() => setPasswordHidden(!passwordHidden)}
								>
									<use href="src/icons_sprite.svg#eye-close" />
								</svg>
							)}
						</div>
						<button className="mt-12 px-3 py-4 bg-black text-white border select-none hover:bg-primary hover:border-primary hover:text-white transition duration-200">
							{localLang.login_signin}
						</button>
					</form>
					<p>
						{localLang.login_dont_have_account}
						<Link to="/register">
							<span className="pl-1 text-primary cursor-pointer hover:text-blue-700">{ localLang.login_register_now }</span>
						</Link>
						
					</p>
				</div>
			</div>
		</>
	);
}
