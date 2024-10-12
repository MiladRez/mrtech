import React, { useEffect, useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import iconsSprite from "../icons_sprite.svg";
import httpClient from "../utils/httpClient";

export default function Register({localLang}: {localLang: any}) {
	const navigate = useNavigate();
	const prevPage = useLocation().state || "/home";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordHidden, setPasswordHidden] = useState(true);
	const [checkPasswordValidity, setCheckPasswordValidity] = useState(false);
	const [containsMinChars, setContainsMinChars] = useState(false);
	const [containsNum, setContainsNum] = useState(false);
	const [containsSpecialChar, setContainsSpecialChar] = useState(false);
	const [containsUpperChar, setContainsUpperChar] = useState(false);
	const [containsLowerChar, setContainsLowerChar] = useState(false);

	const validSpecialChars = /[ `!@#$%^&*()_+\-=\[\]{};:\\.\/?~]/;
	const isValidPassword =
		containsMinChars && containsNum && containsSpecialChar && containsUpperChar && containsLowerChar;

	const handlePasswordInput = (event: any) => {
		setPassword(event.target.value);

		if (event.target.value != "") {
			setCheckPasswordValidity(true);
		} else {
			setCheckPasswordValidity(false);
		}

		if (event.target.value.length > 7) {
			setContainsMinChars(true);
		} else {
			setContainsMinChars(false);
		}

		if (/\d/.test(event.target.value)) {
			setContainsNum(true);
		} else {
			setContainsNum(false);
		}

		if (validSpecialChars.test(event.target.value)) {
			setContainsSpecialChar(true);
		} else {
			setContainsSpecialChar(false);
		}

		if (event.target.value != event.target.value.toLowerCase()) {
			setContainsUpperChar(true);
		} else {
			setContainsUpperChar(false);
		}

		if (event.target.value != event.target.value.toUpperCase()) {
			setContainsLowerChar(true);
		} else {
			setContainsLowerChar(false);
		}
	};

	const passwordValidity = (name: string, metRequirement: boolean) => {
		return (
			<div className="flex justify-between gap-1">
				<p>{name}</p>
				{checkPasswordValidity ? (
					metRequirement ? (
						<svg fill="#16a34a" className="w-3 h-3">
							<use href={`${iconsSprite}#checkmark`} />
						</svg>
					) : (
						<svg stroke="#b91c1c" className="w-3 h-3">
							<use href={`${iconsSprite}#cross`} />
						</svg>
					)
				) : null}
			</div>
		);
	}

	const handleRegisterButtonClick = async (event: any) => {
		event.preventDefault()

		try {
			await httpClient.post("http://localhost:5000/register", {email, password});
			navigate(prevPage);
		} catch (error: any) {
			if (error.response.status === 409) {
				alert("User already exists.");
			}
		}
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);

	return (
		<>
			<div className="h-screen sm:my-12 flex justify-center items-center">
				<div className="w-full sm:w-[36rem] flex flex-col items-center gap-12 border px-12 sm:px-16 py-12 bg-stone-50 shadow-xl">
					<img src={mrtechLogo} className="w-44" />
					<form action="/" className="flex flex-col w-full gap-2">
						<div className="flex flex-col pr-[2.15rem] pb-8 gap-2">
							{/* First Name */}
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="text"
									placeholder={localLang.register_first_name}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							{/* Last Name */}
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="text"
									placeholder={localLang.register_last_name}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							{/* Phone Number */}
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="text"
									placeholder={localLang.register_phone_number}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							{/* Email */}
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="email"
									placeholder={localLang.register_email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							<svg className="w-7 h-7 px-0.5">
								<use href={`${iconsSprite}#email`} />
							</svg>
						</div>
						<div className="flex items-center gap-2">
							{/* Password */}
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type={passwordHidden ? "password" : "text"}
									placeholder={localLang.register_password}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									onChange={handlePasswordInput}
									required
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
						<div className="w-56 text-xs text-neutral-500 flex flex-col gap-0.5 select-none">
							{passwordValidity(localLang.register_pw_req_1, containsMinChars)}
							{passwordValidity(localLang.register_pw_req_2, containsNum)}
							{passwordValidity(localLang.register_pw_req_3, containsSpecialChar)}
							{passwordValidity(localLang.register_pw_req_4, containsUpperChar)}
							{passwordValidity(localLang.register_pw_req_5, containsLowerChar)}
						</div>
						<button
							disabled={isValidPassword ? false : true}
							onClick={(e) => handleRegisterButtonClick(e)}
							className={`${
								isValidPassword ? "hover:bg-primary hover:border-primary hover:text-white transition duration-200" : "cursor-not-allowed"
							} mt-12 px-3 py-4 bg-black text-white border select-none`}
						>
							{ localLang.register_register_button }
						</button>
					</form>
					<div className="flex flex-col items-center gap-2">
						{ localLang.register_already_have_account }
						<Link to="/login">
							<p className="pl-1 text-primary cursor-pointer hover:text-blue-700">{ localLang.register_sign_in }</p>
						</Link>
						
					</div>
				</div>
			</div>
		</>
	);
}
