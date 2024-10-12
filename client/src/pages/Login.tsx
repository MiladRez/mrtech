import React, { useEffect, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import iconsSprite from "../icons_sprite.svg";
import httpClient from "../utils/httpClient";

export default function Login({localLang}: {localLang: any}) {
	const navigate = useNavigate();
	const prevPage = useLocation().state || "/home";

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordHidden, setPasswordHidden] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);

	const authenticateWithGoogle = async (e: any) => {
		e.preventDefault();
		try {
			window.location.href = `http://localhost:5000/googleLogin?prevPage=${encodeURIComponent(prevPage)}`;
		} catch (error: any) {
			if (error.response.status === 401) {
				alert("Invalid credentials")
			}
			navigate("/login")
		}
	}

	const manualAuthenticate = async (e: any) => {
		e.preventDefault();

		try {
			await httpClient.post("http://localhost:5000/login", {email, password});
			navigate(prevPage);
		} catch (error: any) {
			if (error.response.status === 401) {
				alert("Invalid Credentials");
			}
		}
	}

	return (
		<>
			<div className="h-screen flex justify-center items-center">
				<div className="w-full h-full sm:h-auto sm:w-[36rem] flex flex-col items-center justify-center gap-12 border px-12 sm:px-16 py-12 bg-stone-50 shadow-xl">
					<img src={mrtechLogo} className="w-44" />
					<a href="/home" className="underline cursor-pointer hover:text-primary">
						Start shopping now
					</a>
					<form action="/home" className="flex flex-col w-full gap-2">
						<div className="flex items-center gap-2">
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="email"
									placeholder={localLang.login_email}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
									onChange={(e) => setEmail(e.target.value)}
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							<svg className="w-7 h-7 px-0.5">
								<use href={`${iconsSprite}#email`} />
							</svg>
						</div>
						<div className="flex items-center gap-2">
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type={passwordHidden ? "password" : "text"}
									placeholder={localLang.login_password}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							{passwordHidden ? (
								<svg
									className="w-7 h-7 cursor-pointer"
									onClick={() => setPasswordHidden(!passwordHidden)}
								>
									<use href={`${iconsSprite}#eye-show`} />
								</svg>
							) : (
								<svg
									className="w-7 h-7 cursor-pointer"
									onClick={() => setPasswordHidden(!passwordHidden)}
								>
									<use href={`${iconsSprite}#eye-close`} />
								</svg>
							)}
						</div>
						<button
							className="mt-12 px-3 py-4 bg-black text-white border select-none hover:bg-primary hover:border-primary hover:text-white transition duration-200"
							onClick={(e) => manualAuthenticate(e)}
						>
							{localLang.login_signin}
						</button>
						<button
							className="flex items-center justify-center gap-4 mt-2 px-3 py-4 bg-white text-black border border-neutral-400 select-none hover:bg-primary hover:border-primary hover:text-white transition duration-200"
							onClick={(e) => authenticateWithGoogle(e)}
						>
							{localLang.login_signin_with_google}
							<svg className="w-7 h-7">
								<use href={`${iconsSprite}#google`} />
							</svg>
						</button>
					</form>
					<div className="flex flex-col items-center gap-2">
						{localLang.login_dont_have_account}
						<Link to="/register" state={prevPage}>
							<p className="pl-1 text-primary cursor-pointer hover:text-blue-700">{ localLang.login_register_now }</p>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
