import VRHeadset from "../images/vr-headset.jpeg";
import CommunitySTEM from "../images/community-STEM.jpeg";
import IPhone from "../images/iphone.jpeg";
import SSDvsHDD from "../images/ssd-vs-hdd.png";

export type BlogItem = {
    id: string;
    img: File;
    author: string;
    title: {
        english: string;
        french: string;
    };
    date: {
        english: string;
        french: string;
    };
    desc: {
        english: string;
        french: string;
    };
    content: {
        english: string;
        french: string;
    };
};

const blogs_IDtoImgMap = new Map<number, File>([
    [1, VRHeadset],
    [2, CommunitySTEM],
    [3, IPhone],
    [4, SSDvsHDD],
]);

export const getAllBlogsFromDB = async (): Promise<BlogItem[]> => {
    const response = await fetch("http://127.0.0.1:5000/blogs");
    const data = await response.json();

    // iterate through each blog in list and add a new field "img" with the corresponding image file saved locally
    data.forEach((blog: any) => {
        blog["img"] = blogs_IDtoImgMap.get(parseInt(blog.id));
    });

    // console.log("response:", data)
    return data;
};
