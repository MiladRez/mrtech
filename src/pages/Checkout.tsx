import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContactSection from "../components/CheckoutPage/ContactSection";
import DeliverySection from "../components/CheckoutPage/DeliverySection";
import PaymentSection from "../components/CheckoutPage/PaymentSection";

type CheckoutProps = {
	locale: {
		localLang: {
			text: any;
			lang: "english" | "french";
		};
		localCurrency: "cad" | "usd";
	};
	setLocale: Function;
};

export default function Checkout({locale, setLocale}: CheckoutProps) {
	return (
		<>
			<NavBar localLang={locale.localLang} setLocale={setLocale} />
			<section className="flex justify-center">
				<div className="w-full max-w-screen-xl px-12 py-20">
					<div className="w-3/5 flex flex-col gap-8">
						<ContactSection />
						<DeliverySection />
						<PaymentSection />
					</div>
					<div className="w-2/5">
						<div></div>
						<div></div>
					</div>
				</div>
			</section>
			<Footer localLang={locale.localLang.text} />
		</>
	);
}
