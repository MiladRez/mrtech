import React from "react";
import FooterColumn from "./FooterColumn";

export default function Footer({ localLang }: { localLang: any }) {
    return (
        <footer className="bg-neutral-100 select-none">
            <div className="flex justify-center border">
                <div className="w-full max-w-screen-xl grid lg:grid-cols-3 px-12">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-2 gap-8 py-12">
                        <FooterColumn
                            header={localLang.footer_section_1_header}
                            items={[localLang.footer_section_1_link1, localLang.footer_section_1_link2, localLang.footer_section_1_link3, localLang.footer_section_1_link4]}
                        />
                        <FooterColumn
                            header={localLang.footer_section_2_header}
                            items={[localLang.footer_section_2_link1, localLang.footer_section_2_link2, localLang.footer_section_2_link3, localLang.footer_section_2_link4]}
                        />
                        <FooterColumn
                            header={localLang.footer_section_3_header}
                            items={[localLang.footer_section_3_link1, localLang.footer_section_3_link2, localLang.footer_section_3_link3, localLang.footer_section_3_link4]}
                        />
                        <FooterColumn
                            header={localLang.footer_section_4_header}
                            items={[localLang.footer_section_4_link1, localLang.footer_section_4_link2, localLang.footer_section_4_link3, localLang.footer_section_4_link4]}
                        />
                        <FooterColumn
                            header={localLang.footer_section_5_header}
                            items={[localLang.footer_section_5_link1, localLang.footer_section_5_link2, localLang.footer_section_5_link3]}
                        />
                        <FooterColumn
                            header={localLang.footer_section_6_header}
                            items={[localLang.footer_section_6_link1, localLang.footer_section_6_link2]}
                        />
                    </div>
                    <div className="flex flex-col gap-4 lg:col-span-1 border-t lg:border-t-0 lg:border-l lg:px-8 py-12">
                        <h3 className="text-sm font-bold">{localLang.footer_signup_email_header}</h3>
                        <p className="text-xs">{localLang.footer_signup_email_subheader}</p>
                        <div className="flex">
                            <div className="relative w-full focus-within:ring-4 focus-within:ring-blue-800/10 focus-within:rounded-sm transition-all duration-[400ms]">
                                <input
                                    name="emailAddress"
                                    className="w-full px-2 py-3 border border-neutral-400 text-sm rounded-none focus:outline-none peer"
                                    placeholder={localLang.footer_signup_email}
                                />
                                <div className="absolute top-0 w-full h-full pointer-events-none border-2 border-transparent peer-focus:border-blue-800 transition-[border-color] duration-[400ms]"></div>
                            </div>
                            <button className="w-32 border border-primary px-4 py-3 text-white text-sm bg-primary hover:bg-blue-800 hover:border-blue-800 transition duration-300">{localLang.footer_signup_email_button}</button>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-full flex justify-between max-w-96 lg:justify-between pt-4">
                                <a
                                    href="https://www.facebook.com/MRtech"
                                    target="_blank"
                                >
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={0.5}
                                        className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer"
                                    >
                                        <use href="src/icons_sprite.svg#facebook" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.instagram.com/MRtechCA"
                                    target="_blank"
                                >
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={0.1}
                                        className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer"
                                    >
                                        <use href="src/icons_sprite.svg#instagram" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/MRtech"
                                    target="_blank"
                                >
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={0.5}
                                        className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer"
                                    >
                                        <use href="src/icons_sprite.svg#linkedin" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.pinterest.com/MRtech"
                                    target="_blank"
                                >
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={0.5}
                                        className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer"
                                    >
                                        <use href="src/icons_sprite.svg#pinterest" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.x.com/MRtechCA"
                                    target="_blank"
                                >
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={0.5}
                                        className="w-4 h-4 mt-1 hover:fill-primary hover:text-primary cursor-pointer"
                                    >
                                        <use href="src/icons_sprite.svg#twitterx" />
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/MRtechCA" target="_blank">
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={0.5}
                                        className="w-6 h-6 hover:fill-primary hover:text-primary cursor-pointer"
                                    >
                                        <use href="src/icons_sprite.svg#youtube" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl px-12">
                    <p className="text-xs text-neutral-500 py-12">{localLang.footer_copyright}</p>
                </div>
            </div>
        </footer>
    );
}
