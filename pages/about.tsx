import Image from "next/image";
import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from "swiper";
import ReactFullpage from '@fullpage/react-fullpage';

type Props = {};

const About = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <ReactFullpage scrollingSpeed={1000} render={() => {
                return (
                    <ReactFullpage.Wrapper>
                        <section className="section text-center py-60">
                            <h3 className="mb-6 text-neutral-400 text-sm font-bold">OUR MISSION</h3>
                            <p className="text-7xl font-bold text-fluid-headline ">
                                Impact the youth to become the change she wants to see.
                            </p>
                        </section>
                        <section id={"about-story"} className="section text-center py-60">
                            <h3 className="mb-6 text-neutral-400 text-sm font-bold">OUR STORY</h3>
                            <Swiper effect={"cards"}
                                    slidesPerView={1}
                                    modules={[Navigation]}
                                    className="relative"
                                    navigation={true}
                                    speed={500}
                                    grabCursor={false}
                                    loop={true}
                            >
                                <SwiperSlide className={"w-full"}>
                                    <p className={"mx-auto text-center w-2/3 sm:w-1/2"}>
                                        Lorem ipsum <br/>
                                        dolor sit amet, consectetur adipisicing elit. Asperiores beatae ea ex illo
                                        itaque
                                        iure magnam nam omnis recusandae veritatis! Aliquam consequatur cum distinctio
                                        doloremque
                                        quod
                                        vero voluptates? Earum, magni?
                                    </p>
                                </SwiperSlide>
                                <SwiperSlide className={"w-full"}>
                                    <p className={"mx-auto text-center w-2/3 sm:w-1/2"}>
                                        Lorem ipsum <br/>
                                        dolor sit amet, consectetur adipisicing elit. Asperiores beatae ea ex illo
                                        itaque
                                        iure magnam nam omnis recusandae veritatis! Aliquam consequatur cum distinctio
                                        doloremque
                                        quod
                                        vero voluptates? Earum, magni?
                                    </p>
                                </SwiperSlide>
                            </Swiper>
                        </section>
                        <section className="section text-center py-36">
                            <h3 className="mb-12 text-neutral-400 text-sm font-bold">OUR VALUES</h3>
                            <div className=" flex mx-auto gap-4 w-full">
                                <div className="aspect-[0.82] w-1/3 bg-slate-300"></div>
                                <div className="aspect-[0.82] w-1/3 bg-slate-300"></div>
                                <div className="aspect-[0.82] w-1/3 bg-slate-300"></div>
                            </div>
                        </section>
                        <section className="section text-center py-60 px-5">
                            <h3 className="mb-6 text-neutral-400 text-sm font-bold">OUR VISION</h3>
                            <p className="text-2xl text-fluid-copy leading-fluid-copy">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
                                molestie consequat, vel illum dolore eu feugiat nulla facilisis at
                                vero eros et accumsan et iusto odio dignissim qui blandit praesent
                                luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                            </p>
                        </section>
                    </ReactFullpage.Wrapper>
                )
            }} credits={{
                enabled: false
            }}/>
        </div>
    );
};

export default About;
