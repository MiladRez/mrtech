import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Contact({localLang, setLocale}: {localLang: {text: any, lang: "english" | "french"}, setLocale: Function}) {

	const text = localLang.text;

	return (
		<>
			<NavBar localLang={localLang} setLocale={setLocale} />
			<section className="flex justify-center">
				<div className="flex justify-between gap-24 max-w-screen-xl px-12 py-20">
					<div className="w-full flex flex-col gap-6">
						<h1 className='text-2xl sm:text-4xl font-bold text-center lg:text-start'>
							{ text.contact_header }
						</h1>
						<p className='text-stone-600 text-center w-4/5 lg:text-start'>
							{ text.contact_subheader }
						</p>
						<div className="flex flex-col gap-2 pt-2">
							<a href="tel:1234567890" className="flex items-center gap-2 w-fit transition duration-200 hover:text-primary cursor-pointer">
								<svg className="w-5 h-5">
									<use href="src/icons_sprite.svg#phone" />
								</svg>
								<h3 className="font-semibold">(123)-456-7890</h3>
							</a>
							<a href="https://mail.google.com/mail/?view=cm&fs=1&to=mrtech@business.com" className="flex items-center gap-2 w-fit transition duration-200 hover:text-primary cursor-pointer">
								<svg className="w-5 h-5">
									<use href="src/icons_sprite.svg#mail" />
								</svg>
								<h3 className="font-semibold">mrtech@business.com</h3>
							</a>
						</div>
					</div>
					<form className='flex flex-col gap-6 w-full sm:px-10 lg:px-0 items-end'>
						<div className='flex flex-col w-full'>
							<label htmlFor="fullName" className='text-sm'>
								{ text.contact_full_name }
							</label>
							<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input id="fullName" type="text" placeholder='John Doe' className='w-full bg-gray-100 px-2 py-3 border border-neutral-400 text-sm placeholder:opacity-50 focus:bg-white focus:ring-0 focus:border-neutral-400 peer' />
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor="emailAddress" className="text-sm">
								{ text.contact_email }
							</label>
							<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input id="emailAddress" type="email" placeholder='johndoe@example.com' className='w-full bg-gray-100 px-2 py-3 border border-neutral-400 text-sm placeholder:opacity-50 focus:bg-white focus:ring-0 focus:border-neutral-400 peer' />	
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor="phoneNumber" className="text-sm">
								{ text.contact_phone_number }
							</label>
							<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<input id="phoneNumber" type="tel" placeholder='1112223333' className='w-full bg-gray-100 px-2 py-3 border border-neutral-400 text-sm placeholder:opacity-50 focus:bg-white focus:ring-0 focus:border-neutral-400 peer' />	
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>	
						</div>
						<div className='flex flex-col w-full'>
							<label htmlFor="message" className="text-sm">
								{ text.contact_message }
							</label>
							<div className="relative focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
								<textarea
									id="message"
									rows={7}
									placeholder={text.contact_message_placeholder}
									className='w-full h-full bg-gray-100 px-2 py-2 border border-neutral text-sm placeholder:opacity-50 focus:bg-white focus:ring-0 focus:border-neutral-400 peer'
								/>	
								<div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
							</div>
						</div>
						<button className='w-full bg-primary py-5 text-lg text-white rounded hover:bg-blue-800 transition duration-300 group mt-2'>
							{ text.contact_send_message }
							<svg fill="none" strokeWidth={1.5} stroke="currentColor" className="w-10 h-6 inline text-white group-hover:translate-x-1 transition duration-200">
								<use href="src/icons_sprite.svg#send" />
							</svg>
						</button>
					</form>
				</div>
			</section>
			<Footer localLang={text} />
		</>
	)
}