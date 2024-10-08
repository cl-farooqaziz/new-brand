"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Axios from "axios";
import { usePathname } from "next/navigation"
//========== Import Components
import CTA from "@/components/cta/CTA";
//========== Import Images
import contactBg from "media/images/contactBg.png"
import contactImg from "media/images/contactImg.png"
import arrowCta from "media/icons/arrowCta.png"


const Contact = () => {
    //========== Form
    const [ip, setIP] = useState('');
    const [pagenewurl, setPagenewurl] = useState('');
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState('Submit');
    const [isDisabled, setIsDisabled] = useState(false);
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    //========== Fetch IP data from the API
    const getIPData = async () => {
        try {
            const res = await Axios.get('https://ipwho.is/');
            setIP(res.data);
        } catch (error) {
            console.error('Error fetching IP data:', error);
        }
    };

    useEffect(() => {
        getIPData();
        setPagenewurl(window.location.href);
    }, []);

    const router = usePathname();
    const currentRoute = router;

    const handleDataChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const formValidateHandle = () => {
        let errors = {};
        if (!data.name.trim()) {
            errors.name = "Name is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email.match(emailRegex)) {
            errors.email = "Valid email is required";
        }
        const phoneRegex = /^[0-9]+$/;
        if (!data.phone.match(phoneRegex)) {
            errors.phone = "Valid phone number is required";
        }
        return errors;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("Processing...");
        setIsDisabled(true);

        const errors = formValidateHandle();
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const currentdate = new Date().toLocaleString();
            const dataToSend = {
                ...data,
                pageUrl: pagenewurl,
                IP: `${ip.ip} - ${ip.country} - ${ip.city}`,
                currentdate: currentdate,
            };
            const JSONdata = JSON.stringify(dataToSend);

            try {
                //========== First API call to your server
                await fetch('/api/email/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSONdata
                });

                //========== Second API call to SheetDB
                let headersList = {
                    "Accept": "*/*",
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                    "Authorization": "Bearer ke2br2ubssi4l8mxswjjxohtd37nzexy042l2eer",
                    "Content-Type": "application/json"
                };
                let bodyContent = JSON.stringify({
                    "IP": `${ip.ip} - ${ip.country} - ${ip.city}`,
                    "Brand": "New Brand",
                    "Page": `${currentRoute}`,
                    "Date": currentdate,
                    "Time": currentdate,
                    "JSON": JSONdata,
                });
                await fetch("https://sheetdb.io/api/v1/orh55uv03rvh4", {
                    method: "POST",
                    body: bodyContent,
                    headers: headersList
                });

                setFormStatus("Success...");
                setTimeout(() => {
                    window.location.href = '/thank-you';
                }, 2000);
            } catch (error) {
                console.error('Error during form submission:', error);
                setFormStatus("Failed...");
                setIsDisabled(false);
            }
        } else {
            setFormStatus("Failed...");
            setIsDisabled(false);
        }
    };

    return (
        <>
            <section className="py-10 lg:py-20">
                <div className="container">
                    <div className="px-4 md:px-10 lg:px-16 py-10 lg:py-20 relative z-10 rounded-[25px] overflow-hidden">
                        <Image src={contactBg} alt="Brand" fill={true} className="-z-10 object-cover object-top w-full h-full" />
                        <div className="grid grid-cols-12 gap-y-6 md:gap-10">
                            <div className="col-span-12 lg:col-span-5">
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-[18px] lg:text-[20px] tracking-wide font-bold font-sans text-primary-100 leading-tight">30 Minutes Strategy Session</h4>
                                    <h3 className="text-[20px] md:text-[24px] lg:text-[26px] xl:text-[40px] tracking-wide font-bold font-sans text-white leading-tight mt-2 mb-5">Get Your Free 30 Minute Strategy Session With An
                                        Experienced App Experts Valued At $300</h3>
                                    <div className="w-max">
                                        <CTA
                                            text="Get A Quote"
                                            bg="bg-white !text-black"
                                        />
                                    </div>
                                    <div className="hidden lg:block absolute bottom-0 left-[10%] xl:left-[22%] -z-10">
                                        <Image src={contactImg} alt="Brand" className="w-[40%] xl:w-[28%]" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-7">
                                <div className="ps-0 lg:ps-12">
                                    <h3 className="text-[24px] md:text-[34px] xl:text-[40px] tracking-wide font-bold font-sans text-white leading-tight mb-3">Start Your Mobile App Development Journey With Us?</h3>
                                    <p className="text-[15px] tracking-wide font-sans text-justify md:text-left text-[#737373]">Excited to turn your app concept into reality? Get in touch for a detailed consultation. We're keen to explore your project and demonstrate how our assistance can make a difference. Choosing Bitswits means partnering with a team dedicated to your app's success</p>
                                </div>
                                <form className='flex flex-col gap-6 ps-0 lg:ps-12 mt-6'>
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="relative w-full">
                                            <input type="text" id="name" name="name" className="block p-3 w-full font-sans tracking-wide text-sm text-white border-2 rounded-xl focus:outline-none focus:border-primary-100 bg-transparent" placeholder="Full Name" onChange={handleDataChange} />
                                            {errors.name && (
                                                <span className="text-[12px] block p-2 font-sans font-medium text-primary-100 absolute left-0 bottom-[-58%]">
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="relative w-full">
                                            <input type="tel" id="phone" name="phone" minLength="10" maxLength="13" className="block p-3 w-full font-sans tracking-wide text-sm text-white border-2 rounded-xl focus:outline-none focus:border-primary-100 bg-transparent" placeholder="Phone Number" onChange={handleDataChange} />
                                            {errors.phone && (
                                                <span className="text-[12px] block p-2 font-sans font-medium text-primary-100 absolute left-0 bottom-[-58%]">
                                                    {errors.phone}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" className="block p-3 w-full font-sans tracking-wide text-sm text-white border-2 rounded-xl focus:outline-none focus:border-primary-100 bg-transparent" placeholder="Email Address" onChange={handleDataChange} />
                                        {errors.email && (
                                            <span className="text-[12px] block p-2 font-sans font-medium text-primary-100 absolute left-0 bottom-[-58%]">
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <textarea id="message" name="message" rows="5" className="block p-3 w-full font-sans tracking-wide text-sm text-white border-2 rounded-xl focus:outline-none focus:border-primary-100 bg-transparent resize-none" placeholder="Comment" onChange={handleDataChange} />
                                    </div>
                                    <div className="w-max flex gap-2 bg-white p-1 rounded-[15px]">
                                        <button type="submit" className="bg-black text-white border-0 h-[40px] lg:h-[50px] px-3 2xl:px-6 rounded-[15px] flex items-center gap-x-2 focus:outline-none" onClick={handleFormSubmit} disabled={isDisabled}>
                                            <span className='text-[16px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] font-normal font-sans tracking-wide'>{formStatus}</span>
                                            <Image src={arrowCta} alt="Brand" className="flex items-center justify-center w-[20px] h-[20px] xl:w-[30px] xl:h-[30px] p-1 object-contain" />
                                        </button>
                                        <a href='tel:0123456789' className="bg-transparent text-black border-0 h-[40px] lg:h-[50px] px-3 2xl:px-6 rounded-[15px] flex items-center text-[16px] lg:text-[12px] xl:text-[16px] 2xl:text-[18px] font-normal font-sans tracking-wide cursor-pointer">Get To Know Us</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Contact;