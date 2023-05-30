import Image from "next/image";
import React from "react";
import passion from "../public/assets/images/about/passion.png";
import perseverance from "../public/assets/images/about/perseverance.png";
import teamwork from "../public/assets/images/about/teamwork.png";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation} from "swiper";

type Props = {};

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-60">
        <h3 className="mb-6 text-neutral-400 text-sm font-bold">OUR MISSION</h3>
        <p className="text-7xl font-bold text-fluid-headline ">
          Impact the youth to become the change she wants to see.
        </p>
      </section>
      <section id={"about-story"} className="text-center py-40">
        <h3 className="mb-6 text-neutral-400 text-sm font-bold">OUR STORY</h3>
        <Swiper
          effect={"cards"}
          slidesPerView={1}
          modules={[Navigation]}
          className="relative"
          navigation={true}
          speed={500}
          grabCursor={false}
          loop={true}
        >
          <SwiperSlide className={"w-full"}>
            <p className={"mx-auto text-center w-2/3 sm:w-2/3 text-2xl"}>
              Lorem ipsum <br />
              dolor sit amet, consectetur adipisicing elit. Asperiores beatae ea
              ex illo itaque iure magnam nam omnis recusandae veritatis! Aliquam
              consequatur cum distinctio doloremque quod vero voluptates? Earum,
              magni?
            </p>
          </SwiperSlide>
          <SwiperSlide className={"w-full"}>
            <p className={"mx-auto text-center w-1/3 sm:w-2/3 text-2xl"}>
              Lorem ipsum <br />
              dolor sit amet, consectetur adipisicing elit. Asperiores beatae ea
              ex illo itaque iure magnam nam omnis recusandae veritatis! Aliquam
              consequatur cum distinctio doloremque quod vero voluptates? Earum,
              magni?
            </p>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="text-center py-40">
        <h3 className="mb-12 text-neutral-400 text-sm font-bold">OUR VALUES</h3>

        <div className=" flex mx-auto gap-x-2 md:gap-x-4 px-6 w-full">
          <div className="aspect-[0.82] w-1/3 bg-slate-300 relative overflow-hidden">
            <Image src={teamwork} className="absolute" alt="passion'sd" />
            <div className="absolute w-full h-full flex items-end">
              <div className="w-full h-max pb-6 pl-6 z-10">
                <p className="font-futura text-4xl w-min text-white">
                  TEAMWORK
                </p>
              </div>

              <div className="bg-gradient-to-t transition ease-in-out delay-50 duration-300 hover:opacity-100 from-orange-600 to-transparent w-full h-full opacity-0 absolute flex items-end"></div>
            </div>
          </div>

          <div className="aspect-[0.82] w-1/3 bg-slate-300 relative overflow-hidden">
            <Image src={passion} className="absolute" alt="passion'sdw" />
            <div className="absolute w-full h-full flex items-end">
              <div className="w-full h-max pb-6 pl-6 z-10">
                <p className="font-futura text-4xl w-min text-white">PASSION</p>
              </div>

              <div className="bg-gradient-to-t transition ease-in-out delay-50 duration-300 hover:opacity-100 from-orange-600 to-transparent w-full h-full opacity-0 absolute flex items-end"></div>
            </div>
          </div>

          <div className="aspect-[0.82] w-1/3 bg-slate-300 relative overflow-hidden">
            <Image src={perseverance} className="absolute" alt="passion'swdf" />
            <div className="absolute w-full h-full flex items-end">
              <div className="w-full h-max pb-6 pl-6 z-10">
                <p className="font-futura text-4xl w-min text-white">
                  PERSEVERANCE
                </p>
              </div>

              <div className="bg-gradient-to-t transition ease-in-out delay-50 duration-300 hover:opacity-100 from-orange-600 to-transparent w-full h-full opacity-0 absolute flex items-end"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-60 px-4">
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
    </div>
  );
};

export default About;
