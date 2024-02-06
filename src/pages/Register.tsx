import React, { useState } from "react";
import mrtechLogo from "../images/mrtech-logo.png";
import { Link } from "react-router-dom";

export default function Register({ localLang }: { localLang: any }) {
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

	return (
		<>
			<div className="h-screen my-12 flex justify-center items-center">
				<div className="w-[36rem] flex flex-col items-center gap-12 border px-16 py-12 bg-stone-50 shadow-xl">
					<img src={mrtechLogo} className="w-44" />
					<form action="/" className="flex flex-col w-full gap-2">
						<div className="flex flex-col pr-[2.15rem] pb-8 gap-2">
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="text"
									placeholder={localLang.register_first_name}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="text"
									placeholder={localLang.register_last_name}
									className="w-full border-neutral-400 text-sm focus:ring-0 peer"
									required
								/>
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
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
							<div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input
									type="email"
									placeholder={localLang.register_email}
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
						<div className="w-56 text-xs text-neutral-500 flex flex-col gap-0.5 select-none">
							<div className="flex justify-between gap-1">
								<p className="">{ localLang.register_pw_req_1 }</p>
								{checkPasswordValidity ? (
									containsMinChars ? (
										<svg fill="#16a34a" className="w-3 h-3">
											<use href="src/icons_sprite.svg#checkmark" />
										</svg>
									) : (
										<svg stroke="#b91c1c" className="w-3 h-3">
											<use href="src/icons_sprite.svg#cross" />
										</svg>
									)
								) : null}
							</div>
							<div className="flex justify-between gap-1">
								<p>{ localLang.register_pw_req_2 }</p>
								{checkPasswordValidity ? (
									containsNum ? (
										<svg fill="#16a34a" className="w-3 h-3">
											<use href="src/icons_sprite.svg#checkmark" />
										</svg>
									) : (
										<svg stroke="#b91c1c" className="w-3 h-3">
											<use href="src/icons_sprite.svg#cross" />
										</svg>
									)
								) : null}
							</div>
							<div className="flex justify-between gap-1">
								<p>{ localLang.register_pw_req_3 }</p>
								{checkPasswordValidity ? (
									containsSpecialChar ? (
										<svg fill="#16a34a" className="w-3 h-3">
											<use href="src/icons_sprite.svg#checkmark" />
										</svg>
									) : (
										<svg stroke="#b91c1c" className="w-3 h-3">
											<use href="src/icons_sprite.svg#cross" />
										</svg>
									)
								) : null}
							</div>
							<div className="flex justify-between gap-1">
								<p>{ localLang.register_pw_req_4 }</p>
								{checkPasswordValidity ? (
									containsUpperChar ? (
										<svg fill="#16a34a" className="w-3 h-3">
											<use href="src/icons_sprite.svg#checkmark" />
										</svg>
									) : (
										<svg stroke="#b91c1c" className="w-3 h-3">
											<use href="src/icons_sprite.svg#cross" />
										</svg>
									)
								) : null}
							</div>
							<div className="flex justify-between gap-1">
								<p>{ localLang.register_pw_req_5 }</p>
								{checkPasswordValidity ? (
									containsLowerChar ? (
										<svg fill="#16a34a" className="w-3 h-3">
											<use href="src/icons_sprite.svg#checkmark" />
										</svg>
									) : (
										<svg stroke="#b91c1c" className="w-3 h-3">
											<use href="src/icons_sprite.svg#cross" />
										</svg>
									)
								) : null}
							</div>
						</div>
						<button
							disabled={isValidPassword ? false : true}
							className={`${
								isValidPassword ? "hover:bg-primary hover:border-primary hover:text-white transition duration-200" : "cursor-not-allowed"
							} mt-12 px-3 py-4 bg-black text-white border select-none`}
						>
							{ localLang.register_register_button }
						</button>
					</form>
					<p>
						{ localLang.register_already_have_account }
						<Link to="/login">
							<span className="pl-1 text-primary cursor-pointer hover:text-blue-700">{ localLang.register_sign_in }</span>
						</Link>
						
					</p>
				</div>
			</div>
		</>
	);
}
