'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
import { SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useEffect(() => {
        const start = isMobile ? 'top 20%' : 'top top'

        // Split text first
        const titleSplit = new SplitText('#about h2', { type: 'words' })
        const paragraphSplits = Array.from(document.querySelectorAll('#about p')).map(p =>
            new SplitText(p, { type: 'lines' })
        )

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#art',
                start:start,
                end: 'bottom center',
                scrub: 1,
                pin: true,
            },
        })

        // Step 1: Animate mask expansion
        tl.fromTo(
            '.masked-img',
            {
                scale: 1.1,
                maskSize: '40%',
            },
            {
                scale: 1,
                maskSize: '300%',
                ease: 'power2.inOut',
                duration: 3,
            }
        )
        tl.to('.masked-img', {
            maskImage: 'none',
            duration: 2,
            ease: 'power2.inOut',
        })

        tl.from(titleSplit.words, {
            opacity: 0,
            yPercent: 100,
            duration: 2,
            ease: 'expo.out',
            stagger: 0.2,
        })

        paragraphSplits.forEach((split, i) => {
            tl.from(split.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 2,
                ease: 'expo.out',
                stagger: 0.15,
            }, i === 0 ? '-=1' : '>-0.5')
        })
        return () => {
            tl.scrollTrigger?.kill()
            titleSplit.revert()
            paragraphSplits.forEach(split => split.revert())
        }
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

            <div id="about" className="absolute text-center max-w-2xl px-6">
                <h2 className="text-white text-4xl font-bold mb-4">
                    The Journey of Middle-Earth
                </h2>
                <p className="text-white text-lg leading-relaxed ">
                    Through mist and shadow, across mountains and rivers, destiny awaits those who dare to walk beyond the Shire.
                </p>
                <p className="text-white text-lg leading-relaxed ">
                    asdasd
                </p>
            </div>
        </section>
    )
}

export default Hero
