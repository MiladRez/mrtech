import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { BlogItem, getAllBlogsFromDB } from "../data/blogs";
import ShareBlogButton from "../components/BlogPage/ShareBlogButton";

export default function BlogPost({ localLang, setLocale }: { localLang: { text: any; lang: "english" | "french" }; setLocale: Function }) {
    const { blog_title } = useParams();
	const [blog, setBlog] = useState({} as BlogItem);
	const [copyLinkVisible, setCopyLinkVisible] = useState(false);
	const [blogList, setBlogList] = useState<BlogItem[]>([]);

    const { img, author } = blog;
    const title = blog.id ? blog.title[localLang.lang] : null;
    const date = blog.id ? blog.date[localLang.lang] : null;
    const content = blog.id ? blog.content[localLang.lang] : null;

    useEffect(() => {
    	window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        blogList.forEach((blog) => {
            if (blog.title["english"] === decodeURIComponent(blog_title!)) {
                setBlog(blog);
            }
        });
	}, [blog_title, blogList]);
	
	useEffect(() => {
		const getBlogsList = async () => {
			const data = await getAllBlogsFromDB();
			setBlogList(data);
		}
		getBlogsList();
	}, [])

    return (
        <>
            <NavBar
                localLang={localLang}
                setLocale={setLocale}
            />
            <section className="flex justify-center">
                <div className="flex flex-col max-w-screen-xl px-12 py-10 sm:py-20">
                    <div className="flex flex-col gap-6 md:gap-12">
                        <img
                            src={img ? img.toString() : ""}
                            className="md:h-[36rem] object-cover"
                        />
                        <div className="flex flex-col items-center">
                            <div className="big:w-2/3 flex flex-col gap-4">
                                <div className="flex items-end justify-between">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl">{title}</h2>
                                    <div className="hidden md:inline">
										<ShareBlogButton
											id={1}
											localLang={localLang.text}
											copyLinkVisible={copyLinkVisible}
											setCopyLinkVisible={setCopyLinkVisible}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2 md:pt-4">
                                        <p className="text-xs text-neutral-500">{date}</p>
                                        <p className="text-sm pb-px">~</p>
                                        <p className="text-sm pb-px">{author}</p>
                                    </div>
                                    <div className="md:hidden">
										<ShareBlogButton
											id={2}
											localLang={localLang.text}
											copyLinkVisible={copyLinkVisible}
											setCopyLinkVisible={setCopyLinkVisible}
                                        />
                                    </div>
                                </div>
                                <p className={`${copyLinkVisible ? "pt-12 md:pt-4" : "pt-4"} text-sm leading-loose md:text-base text-neutral-800 whitespace-pre-line md:leading-loose transition-[padding] duration-200`}>{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer localLang={localLang.text} />
        </>
    );
}
