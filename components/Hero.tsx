'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useEffect(() => {
        const start = isMobile ? 'top 20%' : 'top top'

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start,
                end: 'bottom center',
                scrub: 1,
                pin: true,
            },
        })

        // Step 1: Animate mask expansion
        tl.fromTo(
            '.masked-img',
            {
                scale: 1.2,
                webkitMaskSize: '30%',
                maskSize: '30%',
            },
            {
                scale: 1,
                webkitMaskSize: '300%',
                maskSize: '300%',
                ease: 'power2.inOut',
                duration: 3,
            }
        )

        tl.to('.masked-img', {
            webkitMaskImage: 'none',
            maskImage: 'none',
            duration: 2,
            ease: 'power2.inOut',
        })

        return () => tl.scrollTrigger?.kill()
    }, [isMobile])

    return (
        <section id="art" className="relative min-h-screen flex-center overflow-hidden">
            <div className="cocktail-img">
                <img
                    src="/images/lotr-hero-bg.jpg"
                    alt="LOTR Hero"
                    className="masked-img size-full object-cover"
                />
            </div>
        </section>
    )
}

export default Hero
