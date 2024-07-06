import React from "react";
import Image from "next/image";
//========== Import Components
import { AutoPlaySlider } from "@/components";
//========== Import Images
import workBg from "media/images/workBg.png"
import arrow from "media/icons/arrowOrg.png"


const Work = ({ content }) => {
    const { title, para, workData } = content;
    return (
        <>
            <section className="py-10 lg:py-20">
                <div className="container">
                    <div className="heading mb-12">
                        <h2 className="text-[30px] lg:text-[50px] 2xl:text-[55px] tracking-wide font-bold font-sans text-black text-center leading-tight">{title}</h2>
                        <p className="text-[15px] tracking-wide font-poppins text-black text-center my-4 lg:my-6">{para}</p>
                    </div>

                    <div className="relative z-10 rounded-[25px] overflow-hidden px-10 pt-5 pb-8 lg:pb-14">
                        <Image src={workBg} alt="Brand" fill={true} className="-z-10 object-cover object-bottom w-full h-full" />
                        <AutoPlaySlider arrowPosition="hidden" options={{ align: "start" }}>
                            {workData.map((item, index) => (
                                <div key={index} className="grow-0 shrink-0 basis-[100%] md:basis-1/3 pl-5">
                                    <div className="flex flex-col gap-8">
                                        <Image src={item.imgSrc} alt="Brand" className="z-10" />
                                        <div className="flex flex-col gap-4 2xl:gap-7 bg-[#292929] px-5 pt-12 2xl:pt-16 pb-6 lg:pb-8 rounded-t-none rounded-[30px] mt-[-20%] md:mt-[-30%] lg:mt-[-20%] xl:mt-[-15%]">
                                            <h3 className="text-[16px] lg:text-[24px] tracking-wide font-bold font-sans text-white text-center leading-tight">{item.title}</h3>
                                            <p className="text-[12px] xl:text-[16px] tracking-wide font-sans text-white text-center leading-snug">{item.description}</p>
                                            <a href="tel:123456789">
                                                <Image src={arrow} alt="Brand" className="w-[15%] mx-auto" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </AutoPlaySlider>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Work;